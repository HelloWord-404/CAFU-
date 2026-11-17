import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";

import {
    ActivityIndicator,
    Image,
    Pressable,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { supabase } from "../../src/lib/supabase";

type Reservation = {
  id: string;
  court_id: string;
  court_name: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
};

const COLORS = {
  background: "#071B12",
  card: "#0B2A1E",
  lime: "#C8FF00",
  white: "#FFFFFF",
  muted: "#AAB8B1",
  border: "#183F2F",
  green: "#153B2B",
};

const FALLBACK_IMAGE =
  "https://bogota.gov.co/sites/default/files/2025-06/bogota-le-apuesta-al-deporte-gracias-a-mas-de-180-canchas-sinteticas.png";

function formatDate(value: string) {
  // Interpretar la fecha como fecha local, evitando cambios por zona horaria.
  const parts = value.split("-").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return value;
  }

  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  return date.toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})/);

  if (!match) return value;

  const hours = Number(match[1]);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minutes} ${period}`;
}

function formatPrice(value: number) {
  return `$${value.toLocaleString("es-CO")}`;
}

function ReservationCard({ reservation }: { reservation: Reservation }) {
  const router = useRouter();

  const status = reservation.status || "confirmed";
  const normalizedStatus = status.toLowerCase();

  const statusLabel =
    normalizedStatus === "confirmed" || normalizedStatus === "confirmada"
      ? "Confirmada"
      : normalizedStatus === "pending" || normalizedStatus === "pendiente"
        ? "Pendiente"
        : normalizedStatus === "cancelled" ||
            normalizedStatus === "canceled" ||
            normalizedStatus === "cancelada"
          ? "Cancelada"
          : status;

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Image
          source={{ uri: FALLBACK_IMAGE }}
          style={styles.courtImage}
          resizeMode="cover"
        />

        <View style={styles.cardInfo}>
          <Text style={styles.courtName} numberOfLines={2}>
            {reservation.court_name || "Cancha CAFU"}
          </Text>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={15} color={COLORS.lime} />
            <Text style={styles.detailText}>
              {formatDate(reservation.reservation_date)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={15} color={COLORS.lime} />
            <Text style={styles.detailText}>
              {formatTime(reservation.start_time)} -{" "}
              {formatTime(reservation.end_time)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="receipt-outline" size={15} color={COLORS.lime} />
            <Text style={styles.detailText}>
              Reserva #{reservation.id.slice(0, 8)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.cardBottom}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              normalizedStatus === "cancelled" ||
              normalizedStatus === "canceled" ||
              normalizedStatus === "cancelada"
                ? styles.cancelledDot
                : null,
            ]}
          />
          <Text
            style={[
              styles.statusText,
              normalizedStatus === "cancelled" ||
              normalizedStatus === "canceled" ||
              normalizedStatus === "cancelada"
                ? styles.cancelledText
                : null,
            ]}
          >
            {statusLabel}
          </Text>
        </View>

        <Pressable
          style={styles.detailButton}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/booking-success",
              params: {
                id: reservation.id,
                court: reservation.court_name,
                date: reservation.reservation_date,
                reservationDate: reservation.reservation_date,
                time: reservation.start_time,
              },
            })
          }
        >
          <Text style={styles.detailButtonText}>Ver detalles</Text>
          <Ionicons name="arrow-forward" size={15} color={COLORS.lime} />
        </Pressable>
      </View>
    </View>
  );
}

export default function ReservationsScreen() {
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadReservations = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        setReservations([]);
        setError("Inicia sesión para consultar tus reservas.");
        return;
      }

      const { data, error: queryError } = await supabase
        .from("court_reservations")
        .select(
          "id, court_id, court_name, reservation_date, start_time, end_time, status, created_at",
        )
        .eq("user_id", user.id)
        .order("reservation_date", { ascending: false })
        .order("start_time", { ascending: false });

      if (queryError) throw queryError;

      setReservations((data ?? []) as Reservation[]);
    } catch (e) {
      console.error("Error consultando reservas:", e);
      setError("No pudimos cargar tus reservas. Intenta nuevamente.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadReservations();
    }, [loadReservations]),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.replace("/(tabs)/HomeScreen")}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </Pressable>

          <Text style={styles.headerTitle}>MIS RESERVAS</Text>

          <Pressable
            style={styles.headerButton}
            onPress={() => void loadReservations(true)}
          >
            <Ionicons name="refresh-outline" size={22} color={COLORS.white} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => void loadReservations(true)}
              tintColor={COLORS.lime}
              colors={[COLORS.lime]}
            />
          }
        >
          <View style={styles.heading}>
            <Text style={styles.eyebrow}>CAFU+ / TU ACTIVIDAD</Text>
            <Text style={styles.title}>Mis reservas</Text>
            <Text style={styles.subtitle}>
              Consulta tus canchas y horarios reservados.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons name="calendar" size={25} color={COLORS.background} />
            </View>

            <View style={styles.summaryText}>
              <Text style={styles.summaryNumber}>{reservations.length}</Text>
              <Text style={styles.summaryLabel}>
                {reservations.length === 1
                  ? "Reserva registrada"
                  : "Reservas registradas"}
              </Text>
            </View>

            <Ionicons name="football-outline" size={35} color={COLORS.lime} />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tu historial</Text>
            <Text style={styles.sectionCount}>
              {reservations.length} en total
            </Text>
          </View>

          {loading ? (
            <View style={styles.messageBox}>
              <ActivityIndicator size="large" color={COLORS.lime} />
              <Text style={styles.messageText}>Cargando tus reservas...</Text>
            </View>
          ) : error ? (
            <View style={styles.messageBox}>
              <Ionicons
                name="alert-circle-outline"
                size={38}
                color={COLORS.lime}
              />
              <Text style={styles.messageText}>{error}</Text>

              <Pressable
                style={styles.primaryButton}
                onPress={() => void loadReservations()}
              >
                <Text style={styles.primaryButtonText}>Reintentar</Text>
              </Pressable>
            </View>
          ) : reservations.length === 0 ? (
            <View style={styles.messageBox}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={36}
                  color={COLORS.lime}
                />
              </View>

              <Text style={styles.emptyTitle}>Aún no tienes reservas</Text>

              <Text style={styles.messageText}>
                Cuando reserves una cancha, aparecerá aquí con su fecha y
                horario.
              </Text>

              <Pressable
                style={styles.primaryButton}
                onPress={() => router.replace("/(tabs)/HomeScreen")}
              >
                <Text style={styles.primaryButtonText}>Explorar canchas</Text>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={COLORS.background}
                />
              </Pressable>
            </View>
          ) : (
            reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          )}

          <View style={{ height: 28 }} />
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable
            style={styles.navItem}
            onPress={() => router.replace("/(tabs)/HomeScreen")}
          >
            <Ionicons name="home-outline" size={22} color={COLORS.muted} />
            <Text style={styles.navLabel}>Inicio</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <Ionicons name="calendar" size={22} color={COLORS.lime} />
            <Text style={[styles.navLabel, styles.navLabelActive]}>
              Reservas
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => router.push("/(tabs)/HomeScreen")}
          >
            <Ionicons name="heart-outline" size={22} color={COLORS.muted} />
            <Text style={styles.navLabel}>Favoritos</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 54,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  heading: {
    marginBottom: 20,
  },
  eyebrow: {
    color: COLORS.lime,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  title: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 7,
    lineHeight: 18,
  },
  summaryCard: {
    minHeight: 90,
    backgroundColor: COLORS.green,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: COLORS.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    flex: 1,
    marginLeft: 13,
  },
  summaryNumber: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },
  sectionCount: {
    color: COLORS.muted,
    fontSize: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 13,
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  courtImage: {
    width: 100,
    height: 112,
    borderRadius: 11,
    backgroundColor: COLORS.green,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 13,
    gap: 9,
  },
  courtName: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  detailText: {
    color: COLORS.muted,
    fontSize: 11,
    flexShrink: 1,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.lime,
  },
  statusText: {
    color: COLORS.lime,
    fontSize: 10,
    fontWeight: "800",
  },
  cancelledDot: {
    backgroundColor: "#FF7777",
  },
  cancelledText: {
    color: "#FF9999",
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  detailButtonText: {
    color: COLORS.lime,
    fontSize: 11,
    fontWeight: "800",
  },
  messageBox: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    minHeight: 200,
  },
  messageText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
  },
  emptyIcon: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.green,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
  primaryButton: {
    minHeight: 45,
    backgroundColor: COLORS.lime,
    borderRadius: 11,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 5,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: "900",
  },
  bottomNav: {
    height: 67,
    backgroundColor: "#091F15",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  navLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "600",
  },
  navLabelActive: {
    color: COLORS.lime,
    fontWeight: "900",
  },
});
