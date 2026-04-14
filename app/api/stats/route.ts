import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'monthly';

    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    if (type === 'weekly') {
      // Start of current week (Sunday)
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
    } else {
      // Start of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get stats for the period
    const logs = await prisma.log.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });

    // Calculate totals
    const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
    const totalReturnVisits = logs.reduce((sum, log) => sum + log.returnVisits, 0);
    const totalBibleStudies = logs.reduce((sum, log) => sum + log.bibleStudies, 0);

    // Build weekly data for charts
    const weeklyData: { name: string; hours: number; returnVisits: number; bibleStudies: number }[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (type === 'weekly') {
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        const dayStr = day.toISOString().split('T')[0];
        const dayLogs = logs.filter(l => l.date.toISOString().split('T')[0] === dayStr);
        weeklyData.push({
          name: dayNames[i],
          hours: dayLogs.reduce((s, l) => s + l.hours, 0),
          returnVisits: dayLogs.reduce((s, l) => s + l.returnVisits, 0),
          bibleStudies: dayLogs.reduce((s, l) => s + l.bibleStudies, 0),
        });
      }
    } else {
      // Monthly: group by week
      const weeks = 4;
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const daysPerWeek = Math.ceil(daysInMonth / weeks);

      for (let w = 0; w < weeks; w++) {
        const weekStart = w * daysPerWeek + 1;
        const weekEnd = Math.min((w + 1) * daysPerWeek, daysInMonth);
        const weekLogs = logs.filter(l => {
          const day = l.date.getDate();
          return day >= weekStart && day <= weekEnd;
        });
        weeklyData.push({
          name: `Week ${w + 1}`,
          hours: weekLogs.reduce((s, l) => s + l.hours, 0),
          returnVisits: weekLogs.reduce((s, l) => s + l.returnVisits, 0),
          bibleStudies: weekLogs.reduce((s, l) => s + l.bibleStudies, 0),
        });
      }
    }

    // Recent logs (last 5)
    const recentLogs = logs.slice(-5).reverse().map(log => ({
      ...log,
      date: log.date.toISOString().split('T')[0],
      createdAt: log.createdAt.toISOString(),
    }));

    return NextResponse.json({
      stats: {
        totalHours,
        totalReturnVisits,
        totalBibleStudies,
        totalLogs: logs.length,
        averageHoursPerLog: logs.length > 0 ? totalHours / logs.length : 0,
      },
      weeklyData,
      recentLogs,
    });
  } catch (error) {
    console.error('[STATS] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
