'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Clock,
  BookOpen,
  Users,
  CalendarDays,
  TrendingUp,
  Printer,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatHours } from '@/lib/utils';

import { useLang } from '@/context/LangContext';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(142, 76%, 47%)', 'hsl(38, 92%, 50%)'];

export default function ReportsPage() {
  const { tr } = useLang();
  const [monthlyData, setMonthlyData] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().toISOString().slice(0, 7));

  React.useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/stats?type=monthly', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setMonthlyData(data.weeklyData);
        }
      } catch (err) {
        console.error('Error loading reports:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 print:space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between print:hidden">
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight">{tr('reports_title')}</h1>
            <p className="text-muted-foreground mt-1">{tr('reports_desc')}</p>
          </div>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            {tr('reports_print')}
          </Button>
        </div>

        {/* Print Header (only visible when printing) */}
        <div className="hidden print:block text-center mb-6">
          <h1 className="text-2xl font-bold">{tr('reports_print_header')}</h1>
          <p className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tr('reports_total_hours')}</p>
                  <p className="text-xl font-bold">{isLoading ? '...' : formatHours(stats?.totalHours || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tr('reports_bible_studies')}</p>
                  <p className="text-xl font-bold">{isLoading ? '...' : stats?.totalBibleStudies || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tr('reports_return_visits')}</p>
                  <p className="text-xl font-bold">{isLoading ? '...' : stats?.totalReturnVisits || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <CalendarDays className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tr('reports_days_field')}</p>
                  <p className="text-xl font-bold">{isLoading ? '...' : stats?.totalLogs || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weekly Hours Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                {tr('reports_hours_weekly')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                {monthlyData.length > 0 && monthlyData.some(d => d.hours > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
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
                      <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">{tr('reports_no_data')}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-secondary" />
                {tr('reports_activity_dist')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] flex items-center justify-center">
                {stats && (stats.totalHours > 0 || stats.totalReturnVisits > 0 || stats.totalBibleStudies > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: tr('reports_pie_hours'), value: stats.totalHours },
                          { name: tr('reports_pie_visits'), value: stats.totalReturnVisits },
                          { name: tr('reports_pie_studies'), value: stats.totalBibleStudies },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">{tr('reports_no_data')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{tr('reports_summary_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{tr('reports_category')}</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{tr('reports_this_month')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">{tr('reports_hours_in_ministry')}</td>
                    <td className="py-3 px-4 text-right font-bold">{formatHours(stats?.totalHours || 0)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">{tr('reports_return_visits_conducted')}</td>
                    <td className="py-3 px-4 text-right">{stats?.totalReturnVisits || 0}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">{tr('reports_bible_studies_conducted')}</td>
                    <td className="py-3 px-4 text-right">{stats?.totalBibleStudies || 0}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">{tr('reports_log_count')}</td>
                    <td className="py-3 px-4 text-right">{stats?.totalLogs || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {stats && stats.averageHoursPerLog > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                {tr('reports_avg_per_log')} <strong>{stats.averageHoursPerLog.toFixed(2)}h</strong>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
