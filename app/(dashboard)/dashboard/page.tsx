'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Users,
  BookOpen,
  CalendarDays,
  TrendingUp,
  ChevronRight,
  Plus,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatHours, formatDate } from '@/lib/utils';
import type { WeeklyData, Log, MonthlyStats } from '@/types';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = React.useState<MonthlyStats | null>(null);
  const [weeklyData, setWeeklyData] = React.useState<WeeklyData[]>([]);
  const [recentLogs, setRecentLogs] = React.useState<Log[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/stats?type=monthly', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setWeeklyData(data.weeklyData);
          setRecentLogs(data.recentLogs);
        }
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight">
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s a summary of your ministry activity
            </p>
          </div>
          <Button onClick={() => router.push('/logs')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Log Entry
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            title="Total Hours"
            value={isLoading ? '...' : formatHours(stats?.totalHours || 0)}
            color="primary"
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Bible Studies"
            value={isLoading ? '...' : String(stats?.totalBibleStudies || 0)}
            color="secondary"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            title="Return Visits"
            value={isLoading ? '...' : String(stats?.totalReturnVisits || 0)}
            color="emerald"
          />
          <StatCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="Days in Field"
            value={isLoading ? '...' : String(stats?.totalLogs || 0)}
            color="amber"
          />
        </motion.div>

        {/* Chart + Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  {weeklyData.length > 0 && weeklyData.some(d => d.hours > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '12px',
                            border: '1px solid hsl(var(--border))',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backgroundColor: 'hsl(var(--card))',
                            color: 'hsl(var(--foreground))',
                          }}
                        />
                        <defs>
                          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="hours"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorHours)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm font-medium">No activity data yet</p>
                        <p className="text-xs mt-1">Start logging your ministry to see charts</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Logs */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-14 rounded-lg bg-accent animate-pulse" />
                    ))}
                  </div>
                ) : recentLogs.length > 0 ? (
                  <div className="space-y-3">
                    {recentLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium">{formatDate(log.date)}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatHours(log.hours)} · {log.bibleStudies} studies
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No logs yet</p>
                    <Button variant="link" className="mt-2" onClick={() => router.push('/logs')}>
                      Add your first log
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4">
          <QuickActionCard
            title="Add Ministry Log"
            description="Record your hours, return visits, and Bible studies"
            icon={<Plus className="h-5 w-5" />}
            href="/logs"
          />
          <QuickActionCard
            title="View Reports"
            description="See your monthly totals and activity trends"
            icon={<BarChart3 className="h-5 w-5" />}
            href="/reports"
          />
          <QuickActionCard
            title="Update Profile"
            description="Manage your account and congregation details"
            icon={<CalendarDays className="h-5 w-5" />}
            href="/settings"
          />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
            {icon}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-heading font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({ title, description, icon, href }: { title: string; description: string; icon: React.ReactNode; href: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="p-2.5 rounded-xl bg-accent">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
