'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { User, Save } from 'lucide-react';

import { useLang } from '@/context/LangContext';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { tr } = useLang();
  const [name, setName] = React.useState('');
  const [congregation, setCongregation] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setCongregation(user.congregation || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await updateUser({ name, congregation: congregation || null });
      setMessage({ type: 'success', text: tr('settings_updated') });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">{tr('settings_title')}</h1>
          <p className="text-muted-foreground mt-1">{tr('settings_desc')}</p>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {tr('settings_profile')}
            </CardTitle>
            <CardDescription>
              {tr('settings_profile_desc')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">{tr('auth_full_name')}</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{tr('settings_email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-accent/50"
                />
                <p className="text-xs text-muted-foreground">{tr('settings_email_note')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="congregation">{tr('auth_congregation')}</Label>
                <Input
                  id="congregation"
                  type="text"
                  placeholder={tr('auth_congregation_placeholder')}
                  value={congregation}
                  onChange={(e) => setCongregation(e.target.value)}
                />
              </div>
            </CardContent>

            <CardContent>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? tr('settings_saving') : tr('settings_save')}
              </Button>
            </CardContent>
          </form>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>{tr('settings_account')}</CardTitle>
            <CardDescription>{tr('settings_account_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">{tr('settings_member_since')}</span>
              <span className="text-sm font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">{tr('settings_user_id')}</span>
              <span className="text-sm font-mono text-xs">{user?.id?.slice(0, 8)}...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
