'use client';

import * as React from 'react';

type Lang = 'en' | 'es';

interface Translations {
  [key: string]: string;
}

const translations: Record<Lang, Translations> = {
  en: {
    // Landing
    landing_badge: '100% Free for all Jehovah\'s Witnesses publishers',
    landing_title_part1: 'Track your ministry with',
    landing_title_part2: 'clarity and simplicity',
    landing_subtitle: 'A beautiful, free ministry activity tracker for Jehovah\'s Witnesses publishers and pioneers. Log hours, return visits, and Bible studies — all in one place.',
    landing_cta_start: 'Start Tracking Free',
    landing_cta_dashboard: 'Go to Dashboard',
    landing_sign_in: 'Sign In',
    landing_nav_features: 'Features',
    landing_nav_about: 'About',
    landing_feat_tracking: 'Track Hours Easily',
    landing_feat_tracking_desc: 'Log your ministry activity with a simple, clean interface. Track hours, return visits, and Bible studies in seconds.',
    landing_feat_reports: 'Monthly Reports',
    landing_feat_reports_desc: 'Get a clear overview of your monthly activity with visual charts and summaries. Perfect for your S-21 report.',
    landing_feat_analytics: 'Visual Analytics',
    landing_feat_analytics_desc: 'Beautiful charts show your weekly and monthly trends. See your ministry growth at a glance.',
    landing_feat_privacy: 'Private & Secure',
    landing_feat_privacy_desc: 'Your data is encrypted and only accessible to you. We respect your privacy.',
    landing_feat_free: '100% Free',
    landing_feat_free_desc: 'No subscriptions, no hidden fees. ServiceTrack is completely free for all publishers and pioneers.',
    landing_feat_ai: 'AI-Ready',
    landing_feat_ai_desc: 'Built with future AI features in mind. Smart insights and suggestions coming soon.',
    landing_stat_free: 'Free Forever',
    landing_stat_ads: 'Ads or Tracking',
    landing_stat_anywhere: 'Available Anywhere',
    landing_stat_unlimited: 'Unlimited Logs',
    landing_features_title: 'Everything you need, nothing you don\'t',
    landing_features_desc: 'ServiceTrack is designed specifically for Jehovah\'s Witnesses publishers. Simple, private, and completely free.',
    landing_s21_badge: 'S-21 Report Ready',
    landing_s21_title: 'Your monthly reports, simplified',
    landing_s21_desc: 'ServiceTrack automatically calculates your monthly totals for hours, return visits, and Bible studies. When it\'s time to submit your S-21 card, everything is ready.',
    landing_s21_feat1: 'Automatic monthly totals calculation',
    landing_s21_feat2: 'Weekly activity charts and trends',
    landing_s21_feat3: 'Calendar view of your ministry days',
    landing_s21_feat4: 'Export and print your summary',
    landing_cta_bottom_title: 'Start tracking your ministry today',
    landing_cta_bottom_desc: 'Join publishers and pioneers who use ServiceTrack to keep their ministry records organized. No cost, no ads, no limits.',
    landing_cta_create: 'Create Free Account',
    landing_cta_go: 'Go to Dashboard',
    landing_footer_desc: 'Free ministry activity tracker for Jehovah\'s Witnesses publishers. Not affiliated with any organization.',

    // Auth
    auth_sign_in: 'Sign in',
    auth_sign_in_desc: 'Enter your email and password to access your account',
    auth_sign_in_btn: 'Sign in',
    auth_signing_in: 'Signing in...',
    auth_no_account: 'Don\'t have an account?',
    auth_sign_up_free: 'Sign up free',
    auth_back_home: 'Back to home',
    auth_create_account: 'Create your account',
    auth_create_desc: 'Start tracking your ministry activity for free',
    auth_full_name: 'Full Name',
    auth_email: 'Email',
    auth_congregation: 'Congregation (optional)',
    auth_congregation_placeholder: 'Your congregation name',
    auth_password: 'Password',
    auth_password_hint: 'At least 8 characters',
    auth_confirm_password: 'Confirm Password',
    auth_create_btn: 'Create free account',
    auth_creating: 'Creating account...',
    auth_has_account: 'Already have an account?',

    // Dashboard
    dash_welcome: 'Welcome',
    dash_summary: 'Here\'s a summary of your ministry activity',
    dash_add_log: 'Add Log Entry',
    dash_total_hours: 'Total Hours',
    dash_bible_studies: 'Bible Studies',
    dash_return_visits: 'Return Visits',
    dash_days_field: 'Days in Field',
    dash_weekly_chart: 'Weekly Activity',
    dash_no_data: 'No activity data yet',
    dash_no_data_desc: 'Start logging your ministry to see charts',
    dash_recent: 'Recent Activity',
    dash_no_logs: 'No logs yet',
    dash_first_log: 'Add your first log',
    dash_action_add: 'Add Ministry Log',
    dash_action_add_desc: 'Record your hours, return visits, and Bible studies',
    dash_action_reports: 'View Reports',
    dash_action_reports_desc: 'See your monthly totals and activity trends',
    dash_action_settings: 'Update Profile',
    dash_action_settings_desc: 'Manage your account and congregation details',

    // Logs
    logs_title: 'Ministry Logs',
    logs_desc: 'Track your hours, return visits, and Bible studies',
    logs_add_entry: 'Add Entry',
    logs_total_hours: 'Total Hours',
    logs_bible_studies: 'Bible Studies',
    logs_return_visits: 'Return Visits',
    logs_activity_log: 'Activity Log',
    logs_date: 'Date',
    logs_hours: 'Hours',
    logs_notes: 'Notes',
    logs_actions: 'Actions',
    logs_no_logs: 'No ministry logs yet',
    logs_no_logs_desc: 'Start tracking your activity by adding your first entry',
    logs_first: 'Add First Entry',
    logs_edit: 'Edit Log Entry',
    logs_add: 'Add Ministry Log',
    logs_edit_desc: 'Update your ministry activity record',
    logs_add_desc: 'Record your ministry activity for the day',
    logs_notes_placeholder: 'Any notes about your ministry today...',
    logs_cancel: 'Cancel',
    logs_save: 'Save',
    logs_update: 'Update',
    logs_delete: 'Delete Log Entry',
    logs_delete_desc: 'Are you sure you want to delete this log entry? This action cannot be undone.',
    logs_delete_btn: 'Delete',

    // Reports
    reports_title: 'Monthly Report',
    reports_desc: 'Your ministry activity summary',
    reports_print: 'Print Report',
    reports_hours_by_week: 'Hours by Week',
    reports_activity_dist: 'Activity Distribution',
    reports_s21: 'S-21 Report Summary',
    reports_hours_in_ministry: 'Hours in Ministry',
    reports_bible_studies_conducted: 'Bible Studies Conducted',
    reports_log_entries: 'Number of Log Entries',
    reports_avg_hours: 'Average hours per log entry',
    reports_no_data: 'No data yet',

    // Settings
    settings_title: 'Settings',
    settings_desc: 'Manage your account details',
    settings_profile: 'Profile Information',
    settings_profile_desc: 'Update your name and congregation details',
    settings_email: 'Email',
    settings_email_note: 'Email cannot be changed',
    settings_save: 'Save Changes',
    settings_saving: 'Saving...',
    settings_updated: 'Profile updated successfully',
    settings_account: 'Account Details',
    settings_account_desc: 'Your account information',
    settings_account_type: 'Account Type',
    settings_member_since: 'Member Since',
    settings_user_id: 'User ID',

    // Common
    nav_dashboard: 'Dashboard',
    nav_logs: 'Ministry Logs',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    nav_sign_out: 'Sign out',
    theme_dark: 'Dark',
    theme_light: 'Light',
    lang_en: 'EN',
    lang_es: 'ES',
  },
  es: {
    // Landing
    landing_badge: '100% Gratis para todos los publicadores de Jehová',
    landing_title_part1: 'Rastrea tu ministerio con',
    landing_title_part2: 'claridad y simplicidad',
    landing_subtitle: 'Un rastreador de actividad ministerial hermoso y gratuito para publicadores y precursores de los Testigos de Jehová. Registra horas, revisitas y estudios bíblicos, todo en un solo lugar.',
    landing_cta_start: 'Empieza a Rastrear Gratis',
    landing_cta_dashboard: 'Ir al Panel',
    landing_sign_in: 'Iniciar Sesión',
    landing_nav_features: 'Funciones',
    landing_nav_about: 'Acerca de',
    landing_feat_tracking: 'Registra Horas Fácilmente',
    landing_feat_tracking_desc: 'Registra tu actividad ministerial con una interfaz simple y limpia. Registra horas, revisitas y estudios bíblicos en segundos.',
    landing_feat_reports: 'Informes Mensuales',
    landing_feat_reports_desc: 'Obtén una visión clara de tu actividad mensual con gráficos visuales y resúmenes. Perfecto para tu informe S-21.',
    landing_feat_analytics: 'Análisis Visuales',
    landing_feat_analytics_desc: 'Hermosos gráficos muestran tus tendencias semanales y mensuales. Ve el crecimiento de tu ministerio de un vistazo.',
    landing_feat_privacy: 'Privado y Seguro',
    landing_feat_privacy_desc: 'Tus datos están encriptados y solo accesibles para ti. Respetamos tu privacidad.',
    landing_feat_free: '100% Gratis',
    landing_feat_free_desc: 'Sin suscripciones, sin cargos ocultos. ServiceTrack es completamente gratuito para todos los publicadores y precursores.',
    landing_feat_ai: 'Listo para IA',
    landing_feat_ai_desc: 'Construido con futuras funciones de IA en mente. Ideas inteligentes y sugerencias próximamente.',
    landing_stat_free: 'Gratis Para Siempre',
    landing_stat_ads: 'Anuncios o Rastreo',
    landing_stat_anywhere: 'Disponible en Todas Partes',
    landing_stat_unlimited: 'Registros Ilimitados',
    landing_features_title: 'Todo lo que necesitas, nada que no',
    landing_features_desc: 'ServiceTrack está diseñado específicamente para publicadores de los Testigos de Jehová. Simple, privado y completamente gratuito.',
    landing_s21_badge: 'Informe S-21 Listo',
    landing_s21_title: 'Tus informes mensuales, simplificados',
    landing_s21_desc: 'ServiceTrack calcula automáticamente tus totales mensuales de horas, revisitas y estudios bíblicos. Cuando sea momento de entregar tu tarjeta S-21, todo estará listo.',
    landing_s21_feat1: 'Cálculo automático de totales mensuales',
    landing_s21_feat2: 'Gráficos y tendencias de actividad semanal',
    landing_s21_feat3: 'Vista de calendario de tus días de ministerio',
    landing_s21_feat4: 'Exporta e imprime tu resumen',
    landing_cta_bottom_title: 'Empieza a rastrear tu ministerio hoy',
    landing_cta_bottom_desc: 'Únete a publicadores y precursores que usan ServiceTrack para mantener sus registros ministeriales organizados. Sin costo, sin anuncios, sin límites.',
    landing_cta_create: 'Crear Cuenta Gratis',
    landing_cta_go: 'Ir al Panel',
    landing_footer_desc: 'Rastreador de actividad ministerial gratuito para publicadores de los Testigos de Jehová. No afiliado con ninguna organización.',

    // Auth
    auth_sign_in: 'Iniciar sesión',
    auth_sign_in_desc: 'Ingresa tu correo y contraseña para acceder a tu cuenta',
    auth_sign_in_btn: 'Iniciar sesión',
    auth_signing_in: 'Iniciando sesión...',
    auth_no_account: '¿No tienes cuenta?',
    auth_sign_up_free: 'Regístrate gratis',
    auth_back_home: 'Volver al inicio',
    auth_create_account: 'Crea tu cuenta',
    auth_create_desc: 'Empieza a rastrear tu actividad ministerial gratis',
    auth_full_name: 'Nombre Completo',
    auth_email: 'Correo Electrónico',
    auth_congregation: 'Congregación (opcional)',
    auth_congregation_placeholder: 'Nombre de tu congregación',
    auth_password: 'Contraseña',
    auth_password_hint: 'Al menos 8 caracteres',
    auth_confirm_password: 'Confirmar Contraseña',
    auth_create_btn: 'Crear cuenta gratis',
    auth_creating: 'Creando cuenta...',
    auth_has_account: '¿Ya tienes cuenta?',

    // Dashboard
    dash_welcome: 'Bienvenido',
    dash_summary: 'Aquí tienes un resumen de tu actividad ministerial',
    dash_add_log: 'Agregar Registro',
    dash_total_hours: 'Horas Totales',
    dash_bible_studies: 'Estudios Bíblicos',
    dash_return_visits: 'Revisitas',
    dash_days_field: 'Días en el Campo',
    dash_weekly_chart: 'Actividad Semanal',
    dash_no_data: 'Sin datos de actividad aún',
    dash_no_data_desc: 'Empieza a registrar tu ministerio para ver gráficos',
    dash_recent: 'Actividad Reciente',
    dash_no_logs: 'Sin registros aún',
    dash_first_log: 'Agrega tu primer registro',
    dash_action_add: 'Agregar Registro Ministerial',
    dash_action_add_desc: 'Registra tus horas, revisitas y estudios bíblicos',
    dash_action_reports: 'Ver Informes',
    dash_action_reports_desc: 'Consulta tus totales mensuales y tendencias',
    dash_action_settings: 'Actualizar Perfil',
    dash_action_settings_desc: 'Administra tu cuenta y detalles de congregación',

    // Logs
    logs_title: 'Registros Ministeriales',
    logs_desc: 'Registra tus horas, revisitas y estudios bíblicos',
    logs_add_entry: 'Agregar Entrada',
    logs_total_hours: 'Horas Totales',
    logs_bible_studies: 'Estudios Bíblicos',
    logs_return_visits: 'Revisitas',
    logs_activity_log: 'Registro de Actividad',
    logs_date: 'Fecha',
    logs_hours: 'Horas',
    logs_notes: 'Notas',
    logs_actions: 'Acciones',
    logs_no_logs: 'Sin registros ministeriales aún',
    logs_no_logs_desc: 'Empieza a rastrear tu actividad agregando tu primera entrada',
    logs_first: 'Agregar Primera Entrada',
    logs_edit: 'Editar Registro',
    logs_add: 'Agregar Registro Ministerial',
    logs_edit_desc: 'Actualiza tu registro de actividad ministerial',
    logs_add_desc: 'Registra tu actividad ministerial del día',
    logs_notes_placeholder: 'Notas sobre tu ministerio hoy...',
    logs_cancel: 'Cancelar',
    logs_save: 'Guardar',
    logs_update: 'Actualizar',
    logs_delete: 'Eliminar Registro',
    logs_delete_desc: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
    logs_delete_btn: 'Eliminar',

    // Reports
    reports_title: 'Informe Mensual',
    reports_desc: 'Tu resumen de actividad ministerial',
    reports_print: 'Imprimir Informe',
    reports_hours_by_week: 'Horas por Semana',
    reports_activity_dist: 'Distribución de Actividad',
    reports_s21: 'Resumen del Informe S-21',
    reports_hours_in_ministry: 'Horas en el Ministerio',
    reports_bible_studies_conducted: 'Estudios Bíblicos Dirigidos',
    reports_log_entries: 'Número de Registros',
    reports_avg_hours: 'Promedio de horas por registro',
    reports_no_data: 'Sin datos aún',

    // Settings
    settings_title: 'Configuración',
    settings_desc: 'Administra los detalles de tu cuenta',
    settings_profile: 'Información del Perfil',
    settings_profile_desc: 'Actualiza tu nombre y detalles de congregación',
    settings_email: 'Correo Electrónico',
    settings_email_note: 'El correo no se puede cambiar',
    settings_save: 'Guardar Cambios',
    settings_saving: 'Guardando...',
    settings_updated: 'Perfil actualizado exitosamente',
    settings_account: 'Detalles de la Cuenta',
    settings_account_desc: 'Tu información de cuenta',
    settings_account_type: 'Tipo de Cuenta',
    settings_member_since: 'Miembro Desde',
    settings_user_id: 'ID de Usuario',

    // Common
    nav_dashboard: 'Panel',
    nav_logs: 'Registros',
    nav_reports: 'Informes',
    nav_settings: 'Configuración',
    nav_sign_out: 'Cerrar sesión',
    theme_dark: 'Oscuro',
    theme_light: 'Claro',
    lang_en: 'EN',
    lang_es: 'ES',
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: (key: string) => string;
}

const LangContext = React.createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>('en');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('lang') as Lang;
    if (stored && (stored === 'en' || stored === 'es')) {
      setLangState(stored);
    }
  }, []);

  const setLang = React.useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  const tr = React.useCallback((key: string): string => {
    return translations[lang]?.[key] || key;
  }, [lang]);

  if (!mounted) {
    return (
      <LangContext.Provider value={{ lang: 'en', setLang: () => {}, tr }}>
        {children}
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = React.useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within LangProvider');
  }
  return context;
}
