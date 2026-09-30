import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

export default function CheckoutScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [additionalServices, setAdditionalServices] = useState([
    { id: '1', name: 'Balón profesional #5', price: 10000, selected: false },
    { id: '2', name: 'Juego de petos (10 uds)', price: 15000, selected: false },
  ]);

  const basePrice = 120000;
  const extrasTotal = additionalServices
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + extrasTotal;

  const toggleService = (id: string) => {
    setAdditionalServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleConfirm = () => {
    // Navega a la vista de confirmación dentro del grupo (tabs)
    router.push('/(tabs)/booking-success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07180E" />

      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resumen de reserva</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}>
        {/* Tarjeta con imagen de cancha */}
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80' }}
            style={styles.cardImage}
          />
          <View style={styles.cardInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.fieldName}>Cancha Verde</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#000000" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#A3B899" />
              <Text style={styles.locationText}>Envigado, Antioquia</Text>
            </View>
          </View>
        </View>

        {/* Desglose de información */}
        <View style={styles.detailsContainer}>
          <DetailRow label="Fecha" value="Hoy, 18 de mayo" />
          <DetailRow label="Horario" value="6:00 PM - 7:00 PM" />
          <DetailRow label="Duración" value="1 hora" />
          <DetailRow label="Precio por hora" value={`$ ${basePrice.toLocaleString()}`} />
          <View style={styles.divider} />
          <DetailRow
            label="Total a pagar"
            value={`$ ${totalPrice.toLocaleString()}`}
            isTotal
          />
        </View>

        {/* Servicios adicionales opcionales */}
        <Text style={styles.sectionTitle}>Servicios adicionales</Text>
        <View style={styles.servicesContainer}>
          {additionalServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, service.selected && styles.serviceCardSelected]}
              onPress={() => toggleService(service.id)}
            >
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>+$ {service.price.toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botón inferior de acción */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueButton} onPress={handleConfirm}>
          <Text style={styles.continueText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, isTotal }: { label: string; value: string; isTotal?: boolean }) {
  return (
    <View style={styles.detailRow}>
      <Text style={[styles.detailLabel, isTotal && styles.totalText]}>{label}</Text>
      <Text style={[styles.detailValue, isTotal && styles.totalText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07180E' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  content: { padding: 16 },
  contentTablet: { maxWidth: 600, alignSelf: 'center', width: '100%' },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  cardImage: { width: 90, height: 90, borderRadius: 12 },
  cardInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fieldName: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8FF00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: { color: '#000000', fontSize: 12, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
  locationText: { color: '#A3B899', fontSize: 14 },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  detailLabel: { color: '#A3B899', fontSize: 15 },
  detailValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginVertical: 12 },
  totalText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  sectionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  servicesContainer: { gap: 10, marginBottom: 24 },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  serviceCardSelected: { borderColor: '#C8FF00', backgroundColor: 'rgba(200, 255, 0, 0.1)' },
  serviceName: { color: '#FFFFFF', fontSize: 14 },
  servicePrice: { color: '#C8FF00', fontSize: 14, fontWeight: '600' },
  bottomBar: { padding: 16, backgroundColor: '#07180E' },
  continueButton: {
    backgroundColor: '#C8FF00',
    borderRadius: 30,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  continueText: { color: '#000000', fontSize: 16, fontWeight: '700' },
});