import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

/* =========================================================
   TIPO PARA LAS CARACTERÍSTICAS
========================================================= */

type Amenity = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

/* =========================================================
   DATOS POR DEFECTO DE LA CANCHA
   Estos valores se usan solamente si no llegan
   datos desde HomeScreen.
========================================================= */

const DEFAULT_COURT_DATA = {
  name: "Cancha Verde",

  location: "Envigado, Antioquia",

  rating: "4.8",

  opening: "6:00 AM",

  closing: "11:00 PM",

  price: "$120.000",

  priceUnit: "Total 1 hora",

  image:
    "https://bogota.gov.co/sites/default/files/2025-06/bogota-le-apuesta-al-deporte-gracias-a-mas-de-180-canchas-sinteticas.png",

  amenities: [
    {
      icon: "car-outline",
      label: "Parqueadero",
    },
    {
      icon: "shirt-outline",
      label: "Camerinos",
    },
    {
      icon: "water-outline",
      label: "Duchas",
    },
    {
      icon: "restaurant-outline",
      label: "Bar",
    },
    {
      icon: "wifi-outline",
      label: "WiFi",
    },
  ] as Amenity[],
};

/* =========================================================
   FECHAS
========================================================= */

const DATES = [
  {
    id: "today",
    day: "Hoy",
    number: "18",
  },
  {
    id: "tomorrow",
    day: "Mañ",
    number: "19",
  },
  {
    id: "sat",
    day: "Sáb",
    number: "20",
  },
  {
    id: "sun",
    day: "Dom",
    number: "21",
  },
  {
    id: "mon",
    day: "Lun",
    number: "22",
  },
];

/* =========================================================
   HORARIOS
========================================================= */

const TIMES = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

/* =========================================================
   HEADER
========================================================= */
const router = useRouter();
function Header() {
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.headerButton}
        onPress={() => router.back()}
        hitSlop={10}
      >
        <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
      </Pressable>

      <Text style={styles.headerTitle}>Detalle de la cancha</Text>

      <Pressable
        style={styles.headerButton}
        onPress={() => console.log("Favorito")}
        hitSlop={10}
      >
        <Ionicons name="heart-outline" size={23} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

/* =========================================================
   IMAGEN PRINCIPAL
========================================================= */

function HeroImage({ image }: { image: string }) {
  return (
    <View style={styles.heroContainer}>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.heroImage}
      />

      {/* Oscurece ligeramente la parte inferior */}
      <View style={styles.heroOverlay} />

      {/* Indicadores */}
      <View style={styles.heroPagination}>
        <View style={styles.heroDotActive} />
        <View style={styles.heroDot} />
        <View style={styles.heroDot} />
      </View>
    </View>
  );
}

/* =========================================================
   INFORMACIÓN DE LA CANCHA
========================================================= */

function CourtInfo({ court }: { court: typeof DEFAULT_COURT_DATA }) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoTopRow}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.courtName}>{court.name}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={13} color="#C8FF00" />

            <Text style={styles.locationText}>{court.location}</Text>
          </View>

          <View style={styles.scheduleRow}>
            <Ionicons name="time-outline" size={13} color="#C8FF00" />

            <Text style={styles.scheduleText}>
              {court.opening} - {court.closing}
            </Text>
          </View>
        </View>

        {/* CALIFICACIÓN */}

        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#C8FF00" />

          <Text style={styles.ratingText}>{court.rating}</Text>
        </View>
      </View>
    </View>
  );
}

/* =========================================================
   CARACTERÍSTICAS
========================================================= */

function Amenities({ court }: { court: typeof DEFAULT_COURT_DATA }) {
  return (
    <View style={styles.amenitiesContainer}>
      {court.amenities.map((item) => (
        <View key={item.label} style={styles.amenityItem}>
          <View style={styles.amenityIconContainer}>
            <Ionicons name={item.icon} size={18} color="#C8FF00" />
          </View>

          <Text style={styles.amenityLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   TITULO DE SECCIÓN
========================================================= */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

/* =========================================================
   SELECTOR DE FECHA
========================================================= */

function DateSelector({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  return (
    <View style={styles.dateRow}>
      {DATES.map((date) => {
        const isSelected = selectedDate === date.id;

        return (
          <Pressable
            key={date.id}
            onPress={() => onSelect(date.id)}
            style={[styles.dateCard, isSelected && styles.dateCardSelected]}
          >
            <Text
              style={[styles.dateDay, isSelected && styles.dateDaySelected]}
            >
              {date.day}
            </Text>

            <Text
              style={[
                styles.dateNumber,
                isSelected && styles.dateNumberSelected,
              ]}
            >
              {date.number}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* =========================================================
   SELECTOR DE HORARIO
========================================================= */

function TimeSelector({
  selectedTime,
  onSelect,
}: {
  selectedTime: string;
  onSelect: (time: string) => void;
}) {
  return (
    <View style={styles.timeGrid}>
      {TIMES.map((time) => {
        const isSelected = selectedTime === time;

        return (
          <Pressable
            key={time}
            onPress={() => onSelect(time)}
            style={[styles.timeButton, isSelected && styles.timeButtonSelected]}
          >
            <Text
              style={[styles.timeText, isSelected && styles.timeTextSelected]}
            >
              {time}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* =========================================================
   BARRA INFERIOR DE RESERVA
========================================================= */

function BookingBar({
  court,
  onContinue,
}: {
  court: typeof DEFAULT_COURT_DATA;
  onContinue: () => void;
}) {
  return (
    <View style={styles.bookingBar}>
      {/* Precio */}

      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{court.price}</Text>

        <Text style={styles.priceUnit}>{court.priceUnit}</Text>
      </View>

      {/* Continuar */}

      <Pressable
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push("/(tabs)/checkout")}
      >
        <Text style={styles.continueText}>Continuar</Text>

        <Ionicons name="arrow-forward" size={19} color="#071B12" />
      </Pressable>
    </View>
  );
}

/* =========================================================
   PANTALLA
========================================================= */

export default function CourtScreen() {
  const router = useRouter();

  const { width } = useWindowDimensions();

  /* =======================================================
     DATOS RECIBIDOS DESDE HOMESCREEN
  ======================================================= */

  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    location?: string;
    rating?: string;
    opening?: string;
    closing?: string;
    price?: string;
    priceUnit?: string;
    image?: string;
  }>();

  /* =======================================================
     ESTADOS
  ======================================================= */

  const [selectedDate, setSelectedDate] = useState("today");

  const [selectedTime, setSelectedTime] = useState("6:00 PM");

  /* =======================================================
     DATOS DINÁMICOS DE LA CANCHA
  ======================================================= */

  const COURT_DATA = useMemo(
    () => ({
      ...DEFAULT_COURT_DATA,

      name:
        typeof params.name === "string" ? params.name : DEFAULT_COURT_DATA.name,

      location:
        typeof params.location === "string"
          ? params.location
          : DEFAULT_COURT_DATA.location,

      rating:
        typeof params.rating === "string"
          ? params.rating
          : DEFAULT_COURT_DATA.rating,

      opening:
        typeof params.opening === "string"
          ? params.opening
          : DEFAULT_COURT_DATA.opening,

      closing:
        typeof params.closing === "string"
          ? params.closing
          : DEFAULT_COURT_DATA.closing,

      price:
        typeof params.price === "string"
          ? params.price
          : DEFAULT_COURT_DATA.price,

      priceUnit:
        typeof params.priceUnit === "string"
          ? params.priceUnit
          : DEFAULT_COURT_DATA.priceUnit,
      image:
        typeof params.image === "string"
          ? params.image
          : DEFAULT_COURT_DATA.image,
    }),
    [
      params.name,
      params.location,
      params.rating,
      params.opening,
      params.closing,
      params.price,
      params.priceUnit,
    ],
  );

  /* =======================================================
     PADDING RESPONSIVE
  ======================================================= */

  const horizontalPadding = Math.max(12, Math.min(width * 0.045, 18));

  /* =======================================================
     INFORMACIÓN DE LA RESERVA
  ======================================================= */

  const reservation = useMemo(
    () => ({
      court: COURT_DATA.name,
      date: selectedDate,
      time: selectedTime,
      price: COURT_DATA.price,
    }),
    [COURT_DATA.name, COURT_DATA.price, selectedDate, selectedTime],
  );

  /* =======================================================
     CONTINUAR
  ======================================================= */

  const handleContinue = () => {
    console.log("Reserva:", reservation);

    /*
     * Cuando tengas tu siguiente pantalla:
     *
     * router.push("/(tabs)/confirm");
     *
     * Por ahora solamente mostramos
     * la información en consola.
     */
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071B12" />

      <View style={styles.screen}>
        {/* ================================================
            HEADER
        ================================================= */}

        <Header />

        {/* ================================================
            CONTENIDO
        ================================================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          {/* ================================================
              IMAGEN
          ================================================= */}

          <HeroImage image={COURT_DATA.image} />

          {/* ================================================
              INFORMACIÓN
          ================================================= */}

          <CourtInfo court={COURT_DATA} />

          {/* ================================================
              CARACTERÍSTICAS
          ================================================= */}

          <Amenities court={COURT_DATA} />

          {/* ================================================
              FECHA
          ================================================= */}

          <View style={styles.section}>
            <SectionTitle>Selecciona fecha</SectionTitle>

            <View style={styles.calendarLabelRow}>
              <Ionicons name="calendar-outline" size={13} color="#AAB8B1" />

              <Text style={styles.calendarLabel}>
                Elige el día de tu reserva
              </Text>
            </View>

            <DateSelector
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />
          </View>

          {/* ================================================
              HORARIO
          ================================================= */}

          <View style={styles.section}>
            <SectionTitle>Selecciona horario</SectionTitle>

            <View style={styles.calendarLabelRow}>
              <Ionicons name="time-outline" size={13} color="#AAB8B1" />

              <Text style={styles.calendarLabel}>
                Selecciona una hora disponible
              </Text>
            </View>

            <TimeSelector
              selectedTime={selectedTime}
              onSelect={setSelectedTime}
            />
          </View>

          {/* Espacio para la barra inferior */}

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* ================================================
            RESERVAR
        ================================================= */}

        <BookingBar court={COURT_DATA} onContinue={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({
  /* =======================================================
     PANTALLA
  ======================================================= */

  safeArea: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  screen: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  scrollContent: {
    paddingTop: 4,
    paddingBottom: 20,
  },

  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    height: 54,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 8,

    backgroundColor: "#071B12",
  },

  headerButton: {
    width: 40,
    height: 40,

    alignItems: "center",

    justifyContent: "center",
  },

  headerTitle: {
    color: "#FFFFFF",

    fontSize: 12,

    fontWeight: "900",
  },

  /* =======================================================
     HERO
  ======================================================= */

  heroContainer: {
    width: "100%",

    height: 185,

    borderRadius: 14,

    overflow: "hidden",

    backgroundColor: "#12352A",

    position: "relative",
  },

  heroImage: {
    width: "100%",

    height: "100%",
  },

  heroOverlay: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: "35%",

    backgroundColor: "rgba(0,0,0,0.18)",
  },

  heroPagination: {
    position: "absolute",

    bottom: 9,

    left: 0,
    right: 0,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 5,
  },

  heroDotActive: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#FFFFFF",
  },

  heroDot: {
    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor: "rgba(255,255,255,0.60)",
  },

  /* =======================================================
     INFORMACIÓN
  ======================================================= */

  infoContainer: {
    marginTop: 14,
  },

  infoTopRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    justifyContent: "space-between",
  },

  infoTextContainer: {
    flex: 1,

    paddingRight: 10,
  },

  courtName: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "900",
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 6,
  },

  locationText: {
    color: "#B9C5BF",

    fontSize: 9,

    marginLeft: 4,
  },

  scheduleRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 6,
  },

  scheduleText: {
    color: "#B9C5BF",

    fontSize: 9,

    marginLeft: 4,
  },

  ratingBadge: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#11281D",

    paddingHorizontal: 9,

    paddingVertical: 6,

    borderRadius: 7,
  },

  ratingText: {
    color: "#FFFFFF",

    fontSize: 9,

    fontWeight: "900",

    marginLeft: 4,
  },

  /* =======================================================
     CARACTERÍSTICAS
  ======================================================= */

  amenitiesContainer: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",

    marginTop: 16,
  },

  amenityItem: {
    width: "19%",

    alignItems: "center",
  },

  amenityIconContainer: {
    width: 31,

    height: 31,

    borderRadius: 9,

    backgroundColor: "#0C2A1E",

    borderWidth: 1,

    borderColor: "#183F2F",

    justifyContent: "center",

    alignItems: "center",
  },

  amenityLabel: {
    color: "#B4C0BA",

    fontSize: 6.5,

    lineHeight: 8,

    textAlign: "center",

    marginTop: 5,
  },

  /* =======================================================
     SECCIONES
  ======================================================= */

  section: {
    marginTop: 19,
  },

  sectionTitle: {
    color: "#FFFFFF",

    fontSize: 10,

    fontWeight: "900",

    marginBottom: 5,
  },

  calendarLabelRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  calendarLabel: {
    color: "#9EADA5",

    fontSize: 7,

    marginLeft: 4,
  },

  /* =======================================================
     FECHAS
  ======================================================= */

  dateRow: {
    flexDirection: "row",

    gap: 6,
  },

  dateCard: {
    flex: 1,

    height: 52,

    backgroundColor: "#0B2A1E",

    borderWidth: 1,

    borderColor: "#153B2B",

    borderRadius: 8,

    justifyContent: "center",

    alignItems: "center",
  },

  dateCardSelected: {
    backgroundColor: "#C8FF00",

    borderColor: "#C8FF00",
  },

  dateDay: {
    color: "#9FAEA7",

    fontSize: 7,

    fontWeight: "700",
  },

  dateDaySelected: {
    color: "#071B12",
  },

  dateNumber: {
    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "900",

    marginTop: 2,
  },

  dateNumberSelected: {
    color: "#071B12",
  },

  /* =======================================================
     HORARIOS
  ======================================================= */

  timeGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    rowGap: 7,
  },

  timeButton: {
    width: "23.5%",

    height: 37,

    borderRadius: 7,

    backgroundColor: "#0B2A1E",

    borderWidth: 1,

    borderColor: "#153B2B",

    alignItems: "center",

    justifyContent: "center",
  },

  timeButtonSelected: {
    backgroundColor: "#C8FF00",

    borderColor: "#C8FF00",
  },

  timeText: {
    color: "#C8D1CC",

    fontSize: 7.5,

    fontWeight: "700",
  },

  timeTextSelected: {
    color: "#071B12",

    fontWeight: "900",
  },

  /* =======================================================
     ESPACIO INFERIOR
  ======================================================= */

  bottomSpace: {
    height: 90,
  },

  /* =======================================================
     BARRA DE RESERVA
  ======================================================= */

  bookingBar: {
    position: "absolute",

    left: 12,
    right: 12,
    bottom: 10,

    height: 58,

    borderRadius: 12,

    backgroundColor: "#C8FF00",

    flexDirection: "row",

    alignItems: "center",

    overflow: "hidden",

    elevation: 10,

    shadowColor: "#C8FF00",

    shadowOpacity: 0.25,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  priceContainer: {
    flex: 1,

    paddingHorizontal: 14,

    justifyContent: "center",
  },

  priceText: {
    color: "#071B12",

    fontSize: 13,

    fontWeight: "900",
  },

  priceUnit: {
    color: "#071B12",

    fontSize: 7,

    marginTop: 1,
  },

  continueButton: {
    height: "100%",

    minWidth: 128,

    paddingHorizontal: 15,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 12,

    backgroundColor: "#C8FF00",
  },

  continueText: {
    color: "#071B12",

    fontSize: 12,

    fontWeight: "900",
  },

  buttonPressed: {
    opacity: 0.78,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },
});
