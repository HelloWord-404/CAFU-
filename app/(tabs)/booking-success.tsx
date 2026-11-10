import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function BookingSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    court?: string;
    name?: string;
    location?: string;
    rating?: string;
    date?: string;
    time?: string;
    price?: string;
    total?: string;
    image?: string;
    method?: string;
    services?: string;
  }>();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const courtName = String(params.court || "Cancha Verde");
  const courtLocation = String(params.location || "Envigado, Antioquia");
  const courtRating = String(params.rating || "4.8");
  const selectedDate = String(params.date || "Hoy");
  const selectedTime = String(params.time || "6:00 PM");

  const courtImage =
    typeof params.image === "string" && params.image.trim().length > 0
      ? params.image
      : "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80";

  const price = Number(String(params.price || "120000").replace(/[^\d]/g, ""));
  const total = Number(
    String(params.total || params.price || "120000").replace(/[^\d]/g, ""),
  );

  const formattedPrice = `$ ${price.toLocaleString("es-CO")}`;
  const formattedTotal = `$ ${total.toLocaleString("es-CO")}`;

  const paymentMethods: Record<string, string> = {
    card: "Tarjeta de crédito / débito",
    nequi: "Nequi",
    daviplata: "Daviplata",
    pse: "PSE",
  };

  const paymentMethod =
    paymentMethods[String(params.method || "")] || "No especificado";

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          `¡Reserva confirmada en CAFU!\n\n` +
          `Cancha: ${courtName}\n` +
          `Ubicación: ${courtLocation}\n` +
          `Fecha: ${selectedDate}\n` +
          `Hora: ${selectedTime}\n` +
          `Total: ${formattedTotal}\n` +
          `Método de pago: ${paymentMethod}`,
      });
    } catch {
      Alert.alert("Información", "No se pudo compartir la reserva.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07180E" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          isTablet && styles.contentTablet,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={48} color="#C8FF00" />
        </View>

        <Text style={styles.title}>¡Reserva confirmada!</Text>

        <Text style={styles.subtitle}>
          Tu cancha está lista,{"\n"}
          prepárate para el mejor partido.
        </Text>

        <View style={styles.card}>
          <Image
            source={{ uri: courtImage }}
            style={styles.cardImage}
            resizeMode="cover"
          />

          <View style={styles.cardInfo}>
            <Text style={styles.fieldName}>{courtName}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="star" size={14} color="#C8FF00" />
              <Text style={styles.infoText}>{courtRating}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color="#A3B899" />
              <Text style={styles.infoText}>{courtLocation}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={14} color="#A3B899" />
              <Text style={styles.infoText}>{selectedDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#A3B899" />
              <Text style={styles.infoText}>{selectedTime}</Text>
            </View>

            <Text style={styles.priceText}>{formattedTotal}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Detalle del pago</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Precio de la cancha</Text>
            <Text style={styles.detailValue}>{formattedPrice}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Método de pago</Text>
            <Text style={styles.detailValue}>{paymentMethod}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total pagado</Text>
            <Text style={styles.totalValue}>{formattedTotal}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => router.replace("/(tabs)/HomeScreen")}
        >
          <Text style={styles.outlineButtonText}>Volver a las canchas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.homeButtonText}>Ir al inicio</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Compartir reserva</Text>
          <Ionicons name="share-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07180E",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  contentTablet: {
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#C8FF00",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    color: "#A3B899",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 14,
    width: "100%",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cardImage: {
    width: 100,
    height: 125,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-around",
    gap: 7,
  },
  fieldName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    color: "#A3B899",
    fontSize: 12,
    flexShrink: 1,
  },
  priceText: {
    color: "#C8FF00",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
    marginBottom: 20,
  },
  detailsTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginVertical: 7,
  },
  detailLabel: {
    color: "#A3B899",
    fontSize: 13,
    flex: 1,
  },
  detailValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 10,
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  totalValue: {
    color: "#C8FF00",
    fontSize: 18,
    fontWeight: "800",
  },
  outlineButton: {
    width: "100%",
    minHeight: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  homeButton: {
    width: "100%",
    minHeight: 50,
    borderRadius: 25,
    backgroundColor: "#123321",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  homeButtonText: {
    color: "#C8FF00",
    fontSize: 15,
    fontWeight: "700",
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  shareButton: {
    backgroundColor: "#C8FF00",
    borderRadius: 30,
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  shareText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
});
