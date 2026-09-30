import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

export default function BookingSuccessScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07180E" />

      <View style={[styles.content, isTablet && styles.contentTablet]}>
        {/* Ícono de confirmación */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={48} color="#C8FF00" />
        </View>

        {/* Títulos */}
        <Text style={styles.title}>¡Reserva confirmada!</Text>
        <Text style={styles.subtitle}>
          Tu cancha está lista,{"\n"}prepárate para el mejor partido.
        </Text>

        {/* Tarjeta resumen */}
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80' }}
            style={styles.cardImage}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.fieldName}>Cancha Verde</Text>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color="#A3B899" />
              <Text style={styles.infoText}>Envigado, Antioquia</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#A3B899" />
              <Text style={styles.infoText}>Hoy, 18 de mayo</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#A3B899" />
              <Text style={styles.infoText}>6:00 PM - 7:00 PM</Text>
            </View>

            <Text style={styles.priceText}>$ 120.000</Text>
          </View>
        </View>

        {/* Botón Ver mis reservas */}
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.outlineButtonText}>Ver mis reservas</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Compartir */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton} onPress={() => alert('¡Reserva compartida!')}>
          <Text style={styles.shareText}>Compartir</Text>
          <Ionicons name="share-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07180E' },
  content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  contentTablet: { maxWidth: 500, alignSelf: 'center', width: '100%' },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#C8FF00',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  subtitle: { color: '#A3B899', fontSize: 16, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 14,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardImage: { width: 100, height: 110, borderRadius: 12 },
  cardInfo: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  fieldName: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { color: '#A3B899', fontSize: 13 },
  priceText: { color: '#C8FF00', fontSize: 16, fontWeight: '700', marginTop: 4 },
  outlineButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  bottomBar: { padding: 16 },
  shareButton: {
    backgroundColor: '#C8FF00',
    borderRadius: 30,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  shareText: { color: '#000000', fontSize: 16, fontWeight: '700' },
});