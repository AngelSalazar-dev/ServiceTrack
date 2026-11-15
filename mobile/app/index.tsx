import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Clock, BookOpen, BarChart3, ChevronRight, ArrowRight } from 'lucide-react-native';

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ Official App</Text>
          </View>
          <Text style={styles.title}>
            Tu Actividad,{"\n"}
            <Text style={styles.highlight}>Simplificada</Text>
          </Text>
          <Text style={styles.subtitle}>
            Rastrea tus horas, seguimientos y sesiones en un solo lugar.
          </Text>

          <View style={styles.ctaGroup}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Empezar Ahora</Text>
            {/* @ts-ignore */}
            <ArrowRight size={20} color="white" style={styles.icon} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.features}>
          <View style={styles.featureCard}>
            <View style={styles.iconContainer}>
              {/* @ts-ignore */}
              <Clock size={24} color="#3b82f6" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Registro de Tiempo</Text>
              <Text style={styles.featureDesc}>Cronometra tu actividad automáticamente.</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#f0fdf4' }]}>
              {/* @ts-ignore */}
              <BookOpen size={24} color="#10b981" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Reporte Mensual</Text>
              <Text style={styles.featureDesc}>Genera tu tarjeta de registro mensual.</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#fdf2f8' }]}>
              {/* @ts-ignore */}
              <BarChart3 size={24} color="#ec4899" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Estadísticas</Text>
              <Text style={styles.featureDesc}>Visualiza tu progreso con gráficos.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginVertical: 40,
  },
  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginBottom: 20,
  },
  badgeText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1e293b',
    lineHeight: 48,
  },
  highlight: {
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  ctaGroup: {
    marginTop: 30,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  icon: {
    marginLeft: 8,
  },
  features: {
    marginTop: 40,
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  featureDesc: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});
