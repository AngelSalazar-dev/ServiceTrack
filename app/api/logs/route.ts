import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - Fetch user's logs with optional date filtering
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = { userId: user.id };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where,
        orderBy: { date: 'desc' },
        take: limit,
        skip,
      }),
      prisma.log.count({ where }),
    ]);

    return NextResponse.json({
      logs: logs.map(log => ({
        ...log,
        date: log.date.toISOString().split('T')[0],
        createdAt: log.createdAt.toISOString(),
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('[LOGS GET] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new log entry
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { date, hours, returnVisits, bibleStudies, notes } = body;

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const log = await prisma.log.create({
      data: {
        userId: user.id,
        date: new Date(date),
        hours: hours || 0,
        returnVisits: returnVisits || 0,
        bibleStudies: bibleStudies || 0,
        notes: notes || null,
      },
    });

    return NextResponse.json({
      log: {
        ...log,
        date: log.date.toISOString().split('T')[0],
        createdAt: log.createdAt.toISOString(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error('[LOGS POST] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
