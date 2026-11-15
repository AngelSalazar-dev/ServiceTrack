'use client';

import * as React from 'react';

type Lang = 'en' | 'es';

interface Translations {
  [key: string]: string;
}

const translations: Record<Lang, Translations> = {
  en: {
    // Landing
    landing_badge: 'Precision Activity Tracking',
    landing_title_part1: 'Track your activity with',
    landing_title_part2: 'clarity and simplicity',
    landing_subtitle: 'A beautiful activity tracker to manage your goals. Log hours, follow-ups, and sessions — all in one place.',
    landing_cta_start: 'Start Tracking',
    landing_cta_dashboard: 'Go to Dashboard',
    landing_sign_in: 'Sign In',
    landing_nav_features: 'Features',
    landing_nav_about: 'About',
    landing_feat_tracking: 'Track Hours Easily',
    landing_feat_tracking_desc: 'Log your service activity with a simple, clean interface. Track hours, follow-ups, and sessions in seconds.',
    landing_feat_reports: 'Monthly Reports',
    landing_feat_reports_desc: 'Get a clear overview of your monthly activity with visual charts and summaries. Perfect for your service report.',
    landing_feat_analytics: 'Visual Analytics',
    landing_feat_analytics_desc: 'Beautiful charts show your weekly and monthly trends. See your progress at a glance.',
    landing_feat_privacy: 'Private & Secure',
    landing_feat_privacy_desc: 'Your data is encrypted and only accessible to you. We respect your privacy.',
    landing_feat_ai: 'AI Assistant',
    landing_feat_ai_desc: 'Get tips and advice for your outreach from our built-in AI assistant.',
    landing_stat_free: 'Always Available',
    landing_stat_ads: 'Ads or Tracking',
    landing_stat_anywhere: 'Available Anywhere',
    landing_stat_unlimited: 'Unlimited Logs',
    landing_features_title: 'Everything you need, nothing you don\'t',
    landing_features_desc: 'ServiceTrack is designed specifically for active users. Simple, private, and built with love.',
    landing_s21_badge: 'Service Report Ready',
    landing_s21_title: 'Your monthly reports, simplified',
    landing_s21_desc: 'ServiceTrack automatically calculates your monthly totals for hours, follow-ups, and sessions. When it\'s time to submit your report, everything is ready.',
    landing_s21_feat1: 'Automatic monthly totals calculation',
    landing_s21_feat2: 'Weekly activity charts and trends',
    landing_s21_feat3: 'Calendar view of your service days',
    landing_s21_feat4: 'Export and print your summary',
    landing_cta_bottom_title: 'Start tracking your activity today',
    landing_cta_bottom_desc: 'Join those who use ServiceTrack to keep their records organized. No ads, no limits.',
    landing_cta_create: 'Create Account',
    landing_cta_go: 'Go to Dashboard',
    landing_footer_desc: 'Activity tracker for personal and professional use. Not affiliated with any organization.',

    // Auth
    auth_sign_in: 'Sign in',
    auth_sign_in_desc: 'Enter your email and password to access your account',
    auth_sign_in_btn: 'Sign in',
    auth_signing_in: 'Signing in...',
    auth_no_account: 'Don\'t have an account?',
    auth_sign_up_free: 'Sign up',
    auth_back_home: 'Back to home',
    auth_create_account: 'Create your account',
    auth_create_desc: 'Start tracking your activity',
    auth_full_name: 'Full Name',
    auth_email: 'Email',
    auth_congregation: 'Organization (optional)',
    auth_congregation_placeholder: 'Your organization name',
    auth_password: 'Password',
    auth_password_hint: 'At least 8 characters',
    auth_confirm_password: 'Confirm Password',
    auth_create_btn: 'Create account',
    auth_creating: 'Creating account...',
    auth_has_account: 'Already have an account?',

    // Dashboard
    dash_welcome: 'Welcome',
    dash_summary: 'Here\'s a summary of your activity',
    dash_add_log: 'Add Log Entry',
    dash_total_hours: 'Total Hours',
    dash_bible_studies: 'Sessions',
    dash_return_visits: 'Follow-ups',
    dash_days_field: 'Active Days',
    dash_weekly_chart: 'Weekly Activity',
    dash_no_data: 'No activity data yet',
    dash_no_data_desc: 'Start logging your activity to see charts',
    dash_recent: 'Recent Activity',
    dash_no_logs: 'No logs yet',
    dash_first_log: 'Add your first log',
    dash_action_add: 'Add Activity Log',
    dash_action_add_desc: 'Record your hours, follow-ups, and sessions',
    dash_action_reports: 'View Reports',
    dash_action_reports_desc: 'See your monthly totals and activity trends',
    dash_action_settings: 'Update Profile',
    dash_action_settings_desc: 'Manage your account and organization details',

    // Logs
    logs_title: 'Activity Logs',
    logs_desc: 'Track your hours, follow-ups, and sessions',
    logs_add_entry: 'Add Entry',
    logs_total_hours: 'Total Hours',
    logs_bible_studies: 'Sessions',
    logs_return_visits: 'Follow-ups',
    logs_activity_log: 'Activity Log',
    logs_date: 'Date',
    logs_hours: 'Hours',
    logs_notes: 'Notes',
    logs_actions: 'Actions',
    logs_no_logs: 'No logs yet',
    logs_no_logs_desc: 'Start tracking your activity by adding your first entry',
    logs_first: 'Add First Entry',
    logs_edit: 'Edit Log Entry',
    logs_add: 'Add Activity Log',
    logs_edit_desc: 'Update your activity record',
    logs_add_desc: 'Record your activity for the day',
    logs_notes_placeholder: 'Any notes about your activity today...',
    logs_cancel: 'Cancel',
    logs_save: 'Save',
    logs_update: 'Update',
    logs_delete: 'Delete Log Entry',
    logs_delete_desc: 'Are you sure you want to delete this log entry? This action cannot be undone.',
    logs_delete_btn: 'Delete',

    // Reports
    reports_title: 'Monthly Report',
    reports_desc: 'Your activity summary',
    reports_print: 'Print Report',
    reports_hours_by_week: 'Hours by Week',
    reports_activity_dist: 'Activity Distribution',
    reports_s21: 'Monthly Report Summary',
    reports_hours_in_ministry: 'Hours of Service',
    reports_bible_studies_conducted: 'Sessions Conducted',
    reports_log_entries: 'Number of Log Entries',
    reports_avg_hours: 'Average hours per log entry',
    reports_no_data: 'No data yet',

    // Settings
    settings_title: 'Settings',
    settings_desc: 'Manage your account details',
    settings_profile: 'Profile Information',
    settings_profile_desc: 'Update your name and organization details',
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
    nav_logs: 'Activity Logs',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    nav_chat: 'Assistant',
    nav_sign_out: 'Sign out',
    theme_dark: 'Dark',
    theme_light: 'Light',
    lang_en: 'EN',
    lang_es: 'ES',

    // Chat
    chat_title: 'Service Assistant',
    chat_subtitle: 'Get tips and advice for your activity',
    chat_welcome_title: 'Your Service AI Assistant',
    chat_welcome_subtitle: 'Ask questions about service, follow-ups, sessions, and more',
    chat_asistant_name: 'ServiceTrack AI',
    chat_input_placeholder: 'Ask about service, tips for outreach...',
    chat_conversations: 'History',
    chat_suggest_1: 'How to start conversations',
    chat_suggest_2: 'Tips for effective follow-ups',
    chat_suggest_3: 'How to conduct a session',
    chat_suggest_4: 'Ways to find interested people',
    chat_suggest_5: 'Using resources effectively',
    chat_suggest_6: 'How to overcome fear in public speaking',
    chat_error_message: 'Error processing your message',
    chat_api_error: 'AI service temporarily unavailable',
    chat_limit_unlimited: 'Unlimited',
  },
  es: {
    // Landing
    landing_badge: 'Seguimiento de Actividad Preciso',
    landing_title_part1: 'Rastrea tu actividad con',
    landing_title_part2: 'claridad y simplicidad',
    landing_subtitle: 'Un rastreador de actividad para gestionar tus metas. Registra horas, seguimientos y sesiones, todo en un solo lugar.',
    landing_cta_start: 'Empieza a Rastrear',
    landing_cta_dashboard: 'Ir al Panel',
    landing_sign_in: 'Iniciar Sesión',
    landing_nav_features: 'Funciones',
    landing_nav_about: 'Acerca de',
    landing_feat_tracking: 'Registra Horas Fácilmente',
    landing_feat_tracking_desc: 'Registra tu actividad de servicio con una interfaz simple y limpia. Registra horas, seguimientos y sesiones en segundos.',
    landing_feat_reports: 'Informes Mensuales',
    landing_feat_reports_desc: 'Obtén una visión clara de tu actividad mensual con gráficos visuales y resúmenes. Perfecto para tu informe de servicio.',
    landing_feat_analytics: 'Análisis Visuales',
    landing_feat_analytics_desc: 'Hermosos gráficos muestran tus tendencias semanales y mensuales. Ve tu progreso de un vistazo.',
    landing_feat_privacy: 'Privado y Seguro',
    landing_feat_privacy_desc: 'Tus datos están encriptados y solo accesibles para ti. Respetamos tu privacidad.',
    landing_feat_ai: 'Asistente IA',
    landing_feat_ai_desc: 'Obtén consejos y tips para tu alcance de nuestro asistente IA.',
    landing_stat_free: 'Siempre Disponible',
    landing_stat_ads: 'Anuncios o Rastreo',
    landing_stat_anywhere: 'Disponible en Todas Partes',
    landing_stat_unlimited: 'Registros Ilimitados',
    landing_features_title: 'Todo lo que necesitas, nada que no',
    landing_features_desc: 'ServiceTrack está diseñado específicamente para usuarios activos. Simple, privado y hecho con amor.',
    landing_s21_badge: 'Informe de Servicio Listo',
    landing_s21_title: 'Tus informes mensuales, simplificados',
    landing_s21_desc: 'ServiceTrack calcula automáticamente tus totales mensuales de horas, seguimientos y sesiones. Cuando sea momento de entregar tu informe, todo estará listo.',
    landing_s21_feat1: 'Cálculo automático de totales mensuales',
    landing_s21_feat2: 'Gráficos y tendencias de actividad semanal',
    landing_s21_feat3: 'Vista de calendario de tus días de servicio',
    landing_s21_feat4: 'Exporta e imprime tu resumen',
    landing_cta_bottom_title: 'Empieza a rastrear tu actividad hoy',
    landing_cta_bottom_desc: 'Únete a quienes usan ServiceTrack para mantener sus registros organizados. Sin anuncios, sin límites.',
    landing_cta_create: 'Crear Cuenta',
    landing_cta_go: 'Ir al Panel',
    landing_footer_desc: 'Rastreador de actividad para uso personal y profesional. No afiliado con ninguna organización.',

    // Auth
    auth_sign_in: 'Iniciar sesión',
    auth_sign_in_desc: 'Ingresa tu correo y contraseña para acceder a tu cuenta',
    auth_sign_in_btn: 'Iniciar sesión',
    auth_signing_in: 'Iniciando sesión...',
    auth_no_account: '¿No tienes cuenta?',
    auth_sign_up_free: 'Regístrate',
    auth_back_home: 'Volver al inicio',
    auth_create_account: 'Crea tu cuenta',
    auth_create_desc: 'Empieza a rastrear tu actividad',
    auth_full_name: 'Nombre Completo',
    auth_email: 'Correo Electrónico',
    auth_congregation: 'Organización (opcional)',
    auth_congregation_placeholder: 'Nombre de tu organización',
    auth_password: 'Contraseña',
    auth_password_hint: 'Al menos 8 caracteres',
    auth_confirm_password: 'Confirmar Contraseña',
    auth_create_btn: 'Crear cuenta',
    auth_creating: 'Creando cuenta...',
    auth_has_account: '¿Ya tienes cuenta?',

    // Dashboard
    dash_welcome: 'Bienvenido',
    dash_summary: 'Aquí tienes un resumen de tu actividad',
    dash_add_log: 'Agregar Registro',
    dash_total_hours: 'Horas Totales',
    dash_bible_studies: 'Sesiones',
    dash_return_visits: 'Seguimientos',
    dash_days_field: 'Días Activos',
    dash_weekly_chart: 'Actividad Semanal',
    dash_no_data: 'Sin datos de actividad aún',
    dash_no_data_desc: 'Empieza a registrar tu actividad para ver gráficos',
    dash_recent: 'Actividad Reciente',
    dash_no_logs: 'Sin registros aún',
    dash_first_log: 'Agrega tu primer registro',
    dash_action_add: 'Agregar Registro de Actividad',
    dash_action_add_desc: 'Registra tus horas, seguimientos y sesiones',
    dash_action_reports: 'Ver Informes',
    dash_action_reports_desc: 'Consulta tus totales mensuales y tendencias',
    dash_action_settings: 'Actualizar Perfil',
    dash_action_settings_desc: 'Administra tu cuenta y detalles de organización',

    // Logs
    logs_title: 'Registros de Actividad',
    logs_desc: 'Registra tus horas, seguimientos y sesiones',
    logs_add_entry: 'Agregar Entrada',
    logs_total_hours: 'Horas Totales',
    logs_bible_studies: 'Sesiones',
    logs_return_visits: 'Seguimientos',
    logs_activity_log: 'Registro de Actividad',
    logs_date: 'Fecha',
    logs_hours: 'Horas',
    logs_notes: 'Notas',
    logs_actions: 'Acciones',
    logs_no_logs: 'Sin registros aún',
    logs_no_logs_desc: 'Empieza a rastrear tu actividad agregando tu primera entrada',
    logs_first: 'Agregar Primera Entrada',
    logs_edit: 'Editar Registro',
    logs_add: 'Agregar Registro de Actividad',
    logs_edit_desc: 'Actualiza tu registro de actividad',
    logs_add_desc: 'Registra tu actividad del día',
    logs_notes_placeholder: 'Notas sobre tu actividad hoy...',
    logs_cancel: 'Cancelar',
    logs_save: 'Guardar',
    logs_update: 'Actualizar',
    logs_delete: 'Eliminar Registro',
    logs_delete_desc: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
    logs_delete_btn: 'Eliminar',

    // Reports
    reports_title: 'Informe Mensual',
    reports_desc: 'Tu resumen de actividad',
    reports_print: 'Imprimir Informe',
    reports_hours_by_week: 'Horas por Semana',
    reports_activity_dist: 'Distribución de Actividad',
    reports_s21: 'Resumen del Informe Mensual',
    reports_hours_in_ministry: 'Horas de Servicio',
    reports_bible_studies_conducted: 'Sesiones Dirigidas',
    reports_log_entries: 'Número de Registros',
    reports_avg_hours: 'Promedio de horas por registro',
    reports_no_data: 'Sin datos aún',

    // Settings
    settings_title: 'Configuración',
    settings_desc: 'Administra los detalles de tu cuenta',
    settings_profile: 'Información del Perfil',
    settings_profile_desc: 'Actualiza tu nombre y detalles de organización',
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
    nav_chat: 'Asistente',
    nav_sign_out: 'Cerrar sesión',
    theme_dark: 'Oscuro',
    theme_light: 'Claro',
    lang_en: 'EN',
    lang_es: 'ES',

    // Chat
    chat_title: 'Asistente de Servicio',
    chat_subtitle: 'Obtén consejos para tu actividad',
    chat_welcome_title: 'Tu Asistente IA de Servicio',
    chat_welcome_subtitle: 'Haz preguntas sobre el servicio, seguimientos, sesiones y más',
    chat_asistant_name: 'ServiceTrack IA',
    chat_input_placeholder: 'Pregunta sobre el servicio, consejos para el alcance...',
    chat_conversations: 'Historial',
    chat_suggest_1: 'Cómo iniciar conversaciones',
    chat_suggest_2: 'Consejos para seguimientos efectivos',
    chat_suggest_3: 'Cómo dirigir una sesión',
    chat_suggest_4: 'Formas de encontrar personas interesadas',
    chat_suggest_5: 'Usar recursos eficazmente',
    chat_suggest_6: 'Cómo superar el miedo al hablar en público',
    chat_error_message: 'Error al procesar tu mensaje',
    chat_api_error: 'Servicio de IA temporalmente no disponible',
    chat_limit_unlimited: 'Ilimitado',
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
