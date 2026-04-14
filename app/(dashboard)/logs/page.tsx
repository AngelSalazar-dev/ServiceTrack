'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Clock,
  BookOpen,
  Users,
} from 'lucide-react';
import { formatHours, formatDate } from '@/lib/utils';
import type { Log } from '@/types';

export default function LogsPage() {
  const [logs, setLogs] = React.useState<Log[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingLog, setEditingLog] = React.useState<Log | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  // Form state
  const [date, setDate] = React.useState('');
  const [hours, setHours] = React.useState('');
  const [returnVisits, setReturnVisits] = React.useState('');
  const [bibleStudies, setBibleStudies] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const loadLogs = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/logs?limit=100', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs);
      }
    } catch (err) {
      console.error('Error loading logs:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setHours('');
    setReturnVisits('');
    setBibleStudies('');
    setNotes('');
    setEditingLog(null);
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (log: Log) => {
    setEditingLog(log);
    setDate(log.date);
    setHours(String(log.hours));
    setReturnVisits(String(log.returnVisits));
    setBibleStudies(String(log.bibleStudies));
    setNotes(log.notes || '');
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const logData = {
      date,
      hours: parseFloat(hours) || 0,
      returnVisits: parseInt(returnVisits) || 0,
      bibleStudies: parseInt(bibleStudies) || 0,
      notes: notes || null,
    };

    try {
      let res;
      if (editingLog) {
        res = await fetch(`/api/logs/${editingLog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData),
          credentials: 'include',
        });
      } else {
        res = await fetch('/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData),
          credentials: 'include',
        });
      }

      if (res.ok) {
        setDialogOpen(false);
        resetForm();
        loadLogs();
      }
    } catch (err) {
      console.error('Error saving log:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/logs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setDeleteId(null);
        loadLogs();
      }
    } catch (err) {
      console.error('Error deleting log:', err);
    }
  };

  // Calculate totals
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
  const totalReturnVisits = logs.reduce((sum, log) => sum + log.returnVisits, 0);
  const totalBibleStudies = logs.reduce((sum, log) => sum + log.bibleStudies, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight">Ministry Logs</h1>
            <p className="text-muted-foreground mt-1">Track your hours, return visits, and Bible studies</p>
          </div>
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold">{formatHours(totalHours)}</p>
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
                  <p className="text-sm text-muted-foreground">Bible Studies</p>
                  <p className="text-2xl font-bold">{totalBibleStudies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Return Visits</p>
                  <p className="text-2xl font-bold">{totalReturnVisits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-14 rounded-lg bg-accent animate-pulse" />
                ))}
              </div>
            ) : logs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Hours</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Return Visits</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bible Studies</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Notes</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-b border-border last:border-0 hover:bg-accent/50">
                        <td className="py-3 px-4 text-sm font-medium">{formatDate(log.date)}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="default">{formatHours(log.hours)}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{log.returnVisits}</td>
                        <td className="py-3 px-4 text-sm">{log.bibleStudies}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">
                          {log.notes ? (log.notes.length > 40 ? log.notes.substring(0, 40) + '...' : log.notes) : '—'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditDialog(log)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => setDeleteId(log.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No ministry logs yet</p>
                <p className="text-sm mt-1">Start tracking your activity by adding your first entry</p>
                <Button className="mt-4" onClick={openAddDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Entry
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingLog ? 'Edit Log Entry' : 'Add Ministry Log'}</DialogTitle>
                <DialogDescription>
                  {editingLog ? 'Update your ministry activity record' : 'Record your ministry activity for the day'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      step="0.25"
                      min="0"
                      placeholder="1.5"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="returnVisits">Return Visits</Label>
                    <Input
                      id="returnVisits"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={returnVisits}
                      onChange={(e) => setReturnVisits(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bibleStudies">Bible Studies</Label>
                  <Input
                    id="bibleStudies"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={bibleStudies}
                    onChange={(e) => setBibleStudies(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any notes about your ministry today..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingLog ? 'Update' : 'Save'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Log Entry</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this log entry? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
