'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LangContext';
import { Button } from '@/components/ui/button';
import { ThemeLangToggle } from '@/components/ui/ThemeLangToggle';
import {
  Clock,
  BookOpen,
  Users,
  BarChart3,
  Heart,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  CalendarDays,
  TrendingUp,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { tr, lang } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const FEATURES = [
    { icon: Clock, title: tr('landing_feat_tracking'), description: tr('landing_feat_tracking_desc') },
    { icon: CalendarDays, title: tr('landing_feat_reports'), description: tr('landing_feat_reports_desc') },
    { icon: BarChart3, title: tr('landing_feat_analytics'), description: tr('landing_feat_analytics_desc') },
    { icon: Shield, title: tr('landing_feat_privacy'), description: tr('landing_feat_privacy_desc') },
    { icon: Heart, title: tr('landing_feat_free'), description: tr('landing_feat_free_desc') },
    { icon: Sparkles, title: tr('landing_feat_ai'), description: tr('landing_feat_ai_desc') },
  ];

  const STATS = [
    { value: '100%', label: tr('landing_stat_free'), icon: Heart },
    { value: '0', label: tr('landing_stat_ads'), icon: Shield },
    { value: '24/7', label: tr('landing_stat_anywhere'), icon: Clock },
    { value: '∞', label: tr('landing_stat_unlimited'), icon: CalendarDays },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/95 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-background/70 backdrop-blur-lg'
      }`}>
        <div className="container-servicetrack flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:scale-105 transition-transform">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">ServiceTrack</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {tr('landing_nav_features')}
            </Link>
            <Link href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {tr('landing_nav_about')}
            </Link>
            <ThemeLangToggle />
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="ghost">{tr('nav_dashboard')}</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{tr('landing_sign_in')}</Button>
                </Link>
                <Link href="/register">
                  <Button>
                    {tr('landing_cta_start')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-2">
            <ThemeLangToggle />
            <Link href="#features" className="block py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              {tr('landing_nav_features')}
            </Link>
            <Link href="#stats" className="block py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              {tr('landing_nav_about')}
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">{tr('nav_dashboard')}</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">{tr('landing_sign_in')}</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">{tr('landing_cta_start')}</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container-servicetrack relative z-10 py-16 md:py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                {tr('landing_badge')}
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.05]">
              {tr('landing_title_part1')}{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {tr('landing_title_part2')}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {tr('landing_subtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-base">
                    {tr('landing_cta_dashboard')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="h-14 px-8 text-base">
                      {tr('landing_cta_start')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="h-14 px-8 text-base">
                      {tr('landing_sign_in')}
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-2.5 rounded-xl bg-accent mb-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-2xl md:text-3xl font-heading font-extrabold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 bg-accent/30">
        <div className="container-servicetrack">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">{tr('landing_features_title')}</h2>
            <p className="text-lg text-muted-foreground">
              {tr('landing_features_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* S-21 Card Preview */}
      <section className="py-20 md:py-24">
        <div className="container-servicetrack">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-sm font-medium text-secondary">
                <BookOpen className="h-4 w-4" />
                {tr('landing_s21_badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                {tr('landing_s21_title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tr('landing_s21_desc')}
              </p>
              <ul className="space-y-3">
                {[tr('landing_s21_feat1'), tr('landing_s21_feat2'), tr('landing_s21_feat3'), tr('landing_s21_feat4')].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock Dashboard Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl bg-primary/10 p-4">
                    <div className="text-sm text-muted-foreground">{tr('dash_total_hours')}</div>
                    <div className="text-3xl font-bold font-heading">42.5h</div>
                  </div>
                  <div className="rounded-xl bg-secondary/10 p-4">
                    <div className="text-sm text-muted-foreground">{tr('dash_bible_studies')}</div>
                    <div className="text-3xl font-bold font-heading">8</div>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4">
                    <div className="text-sm text-muted-foreground">{tr('dash_return_visits')}</div>
                    <div className="text-3xl font-bold font-heading">24</div>
                  </div>
                  <div className="rounded-xl bg-amber-500/10 p-4">
                    <div className="text-sm text-muted-foreground">{tr('dash_days_field')}</div>
                    <div className="text-3xl font-bold font-heading">18</div>
                  </div>
                </div>
                <div className="h-40 rounded-xl bg-accent/50 flex items-center justify-center text-muted-foreground text-sm">
                  <TrendingUp className="h-8 w-8 mr-2" />
                  Weekly activity chart
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="stats" className="py-20 md:py-32 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container-servicetrack relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight">
              {tr('landing_cta_bottom_title')}
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {tr('landing_cta_bottom_desc')}
            </p>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base bg-white text-primary hover:bg-white/90">
                  {tr('landing_cta_go')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base bg-white text-primary hover:bg-white/90">
                  {tr('landing_cta_create')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container-servicetrack">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading font-bold">ServiceTrack</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {tr('landing_footer_desc')}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
