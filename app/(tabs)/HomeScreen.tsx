import React, { useState } from "react";
import {  Image,  ImageSourcePropType,  Pressable,  SafeAreaView,  ScrollView,  StatusBar,  StyleSheet,  Text,  TextInput,  useWindowDimensions,  View,} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   TIPOS
========================================================= */

type Court = {
  id: string;
  name: string;
  location: string;
  rating: string;
  opening: string;
  closing: string;
  price: string;
  priceUnit: string;
  image: ImageSourcePropType;
};

type FilterType = "Hoy" | "Mañana" | "Fin de semana" | "Todas";

type NavigationTab =
  | "Inicio"
  | "Reservas"
  | "Cancha"
  | "Favoritos"
  | "Perfil";

/* =========================================================
   COLORES
========================================================= */

const COLORS = {
  background: "#061B12",
  backgroundLight: "#0B2418",
  card: "#123321",
  cardLight: "#183D29",

  primary: "#C8FF00",
  primaryDark: "#AEE000",

  white: "#FFFFFF",
  gray: "#A5AEA9",
  darkGray: "#65736C",

  border: "#294737",
  green: "#159A52",

  black: "#07110D",
};

/* =========================================================
   DATOS DE LAS CANCHAS
========================================================= */

const COURTS: Court[] = [
  {
    id: "1",
    name: "Cancha Verde",
    location: "Envigado, Antioquia",
    rating: "4.8",
    opening: "6:00 AM",
    closing: "11:00 PM",
    price: "$120.000",
    priceUnit: "/hora",
    image: require("../../assets/images/cancha1.jpg"),
  },

  {
    id: "2",
    name: "Complejo Deportivo Oro Verde",
    location: "Medellín, Antioquia",
    rating: "4.6",
    opening: "7:00 AM",
    closing: "10:00 PM",
    price: "$110.000",
    priceUnit: "/hora",
    image: require("../../assets/images/cancha2.jpg"),
  },

  {
    id: "3",
    name: "Cancha Los Pinos",
    location: "Sabaneta, Antioquia",
    rating: "4.7",
    opening: "6:00 AM",
    closing: "10:00 PM",
    price: "$100.000",
    priceUnit: "/hora",
    image: require("../../assets/images/cancha3.jpg"),
  },

  {
    id: "4",
    name: "Arena Sport",
    location: "Medellín, Antioquia",
    rating: "4.9",
    opening: "5:30 AM",
    closing: "11:30 PM",
    price: "$135.000",
    priceUnit: "/hora",
    image: require("../../assets/images/cancha4.jpg"),
  },
];

/* =========================================================
   HOME SCREEN
========================================================= */

export default function HomeScreen(): React.JSX.Element {
  const { width, height } = useWindowDimensions();

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("Hoy");

  const [search, setSearch] = useState<string>("");

  const [activeTab, setActiveTab] =
    useState<NavigationTab>("Inicio");

  /*
   * Ancho máximo del contenido.
   */

  const contentWidth = Math.min(width - 28, 420);

  /*
   * Filtrado por búsqueda.
   */

  const filteredCourts = COURTS.filter((court: Court) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      court.name.toLowerCase().includes(query) ||
      court.location.toLowerCase().includes(query)
    );
  });

  /* =========================================================
     RESERVAR
  ========================================================= */

  const handleReserve = (court: Court): void => {
    console.log("Reservando:", court.name);
    /*
      navigation.navigate("Reservar", {
        courtId: court.id,
      });
    */
  };

  /* =========================================================
     FILTROS
  ========================================================= */

  const handleSearchOptions = (): void => {
    console.log("Abrir filtros avanzados");
  };

  /* =========================================================
     NOTIFICACIONES
  ========================================================= */

  const handleNotification = (): void => {
    console.log("Abrir notificaciones");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight: height,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.content,
              {
                width: contentWidth,
              },
            ]}
          >
            {/* HEADER */}

            <Header
              onNotificationPress={handleNotification}
            />

            {/* HERO */}

            <HeroBanner />

            {/* BUSCADOR */}

            <SearchBar
              value={search}
              onChangeText={setSearch}
              onFilterPress={handleSearchOptions}
            />

            {/* HEADER DE CANCHAS */}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Canchas Disponibles
              </Text>

              <Pressable
                onPress={() => console.log("Ver todas")}
                hitSlop={10}
              >
                <Text style={styles.seeAll}>
                  Ver todas
                </Text>
              </Pressable>
            </View>

            {/* FILTROS */}

            <FilterTabs
              activeFilter={activeFilter}
              onChange={setActiveFilter}
            />

            {/* CANCHAS */}

            <CourtList
              courts={filteredCourts}
              onReserve={handleReserve}
            />

            <View style={{ height: 90 }} />
          </View>
        </ScrollView>

        {/* NAVEGACIÓN */}

        <BottomNavigation
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </View>
    </SafeAreaView>
  );
}

/* ============================================================
   HEADER
============================================================ */

type HeaderProps = {
  onNotificationPress: () => void;
};

function Header({
  onNotificationPress,
}: HeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <View style={styles.logoCircle}>
          <Ionicons
            name="football"
            size={21}
            color={COLORS.black}
          />
        </View>

        <Text style={styles.logoText}>
          CAFU
        </Text>
      </View>

      <Pressable
        style={styles.notificationButton}
        onPress={onNotificationPress}
        hitSlop={10}
      >
        <Ionicons
          name="notifications-outline"
          size={23}
          color={COLORS.white}
        />

        <View style={styles.notificationDot} />
      </Pressable>
    </View>
  );
}

/* ============================================================
   HERO
============================================================ */

function HeroBanner(): React.JSX.Element {
  return (
    <View style={styles.hero}>
      <View style={styles.heroCircleOne} />

      <View style={styles.heroCircleTwo} />

      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>
          Reserva tu
        </Text>

        <Text
          style={[
            styles.heroTitle,
            {
              color: COLORS.primary,
            },
          ]}
        >
          mejor partido
        </Text>

        <Text style={styles.heroSubtitle}>
          Canchas sintéticas disponibles
        </Text>

        <Text style={styles.heroSubtitle}>
          cuando quieras jugar.
        </Text>
      </View>

      <View style={styles.heroBall}>
        <Ionicons
          name="football"
          size={32}
          color={COLORS.white}
        />
      </View>

      <View style={styles.heroPlayer}>
        <Ionicons
          name="body-outline"
          size={105}
          color="#071B12"
        />
      </View>
    </View>
  );
}

/* ============================================================
   SEARCH BAR
============================================================ */

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  onFilterPress: () => void;
};

function SearchBar({
  value,
  onChangeText,
  onFilterPress,
}: SearchBarProps): React.JSX.Element {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color={COLORS.gray}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar cancha o ubicación"
        placeholderTextColor={COLORS.gray}
        style={styles.searchInput}
        returnKeyType="search"
      />

      <Pressable
        onPress={onFilterPress}
        hitSlop={10}
        style={styles.searchFilterButton}
      >
        <Ionicons
          name="options-outline"
          size={21}
          color={COLORS.gray}
        />
      </Pressable>
    </View>
  );
}

/* ============================================================
   FILTROS
============================================================ */

type FilterTabsProps = {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
};

function FilterTabs({
  activeFilter,
  onChange,
}: FilterTabsProps): React.JSX.Element {
  const filters: FilterType[] = [
    "Hoy",
    "Mañana",
    "Fin de semana",
    "Todas",
  ];

  return (
    <View style={styles.filtersContainer}>
      {filters.map((filter: FilterType) => {
        const active =
          activeFilter === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            style={[
              styles.filterButton,
              active &&
                styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                active &&
                  styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ============================================================
   LISTA DE CANCHAS
============================================================ */

type CourtListProps = {
  courts: Court[];
  onReserve: (court: Court) => void;
};

function CourtList({
  courts,
  onReserve,
}: CourtListProps): React.JSX.Element {
  if (courts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="search-outline"
          size={40}
          color={COLORS.darkGray}
        />

        <Text style={styles.emptyTitle}>
          No encontramos canchas
        </Text>

        <Text style={styles.emptyText}>
          Intenta buscar por otro nombre o ubicación.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.courtList}>
      {courts.map((court: Court) => (
        <CourtCard
          key={court.id}
          court={court}
          onReserve={onReserve}
        />
      ))}
    </View>
  );
}

/* ============================================================
   COURT CARD
============================================================ */

type CourtCardProps = {
  court: Court;
  onReserve: (court: Court) => void;
};

function CourtCard({
  court,
  onReserve,
}: CourtCardProps): React.JSX.Element {
  return (
    <View style={styles.courtCard}>
      {/* IMAGEN */}

      <CourtImage
        image={court.image}
        rating={court.rating}
      />

      {/* INFORMACIÓN */}

      <View style={styles.courtInfo}>
        <Text
          style={styles.courtName}
          numberOfLines={2}
        >
          {court.name}
        </Text>

        <CourtLocation
          location={court.location}
        />

        <CourtSchedule
          opening={court.opening}
          closing={court.closing}
        />

        <CourtPrice
          price={court.price}
          unit={court.priceUnit}
        />

        {/* BOTÓN */}

        <ReserveButton
          onPress={() => onReserve(court)}
        />
      </View>
    </View>
  );
}

/* ============================================================
   COURT IMAGE
============================================================ */

type CourtImageProps = {
  image: ImageSourcePropType;
  rating: string;
};

function CourtImage({
  image,
  rating,
}: CourtImageProps): React.JSX.Element {
  return (
    <View style={styles.courtImageContainer}>
      <Image
        source={image}
        style={styles.courtImage}
        resizeMode="cover"
      />

      <View style={styles.ratingBadge}>
        <Ionicons
          name="star"
          size={10}
          color={COLORS.primary}
        />

        <Text style={styles.ratingText}>
          {rating}
        </Text>
      </View>
    </View>
  );
}

/* ============================================================
   COURT LOCATION
============================================================ */

type CourtLocationProps = {
  location: string;
};

function CourtLocation({
  location,
}: CourtLocationProps): React.JSX.Element {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name="location"
        size={11}
        color={COLORS.primary}
      />

      <Text
        style={styles.infoText}
        numberOfLines={1}
      >
        {location}
      </Text>
    </View>
  );
}

/* ============================================================
   COURT SCHEDULE
============================================================ */

type CourtScheduleProps = {
  opening: string;
  closing: string;
};

function CourtSchedule({
  opening,
  closing,
}: CourtScheduleProps): React.JSX.Element {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name="time-outline"
        size={11}
        color={COLORS.primary}
      />

      <Text style={styles.infoText}>
        {opening} - {closing}
      </Text>
    </View>
  );
}

/* ============================================================
   COURT PRICE
============================================================ */

type CourtPriceProps = {
  price: string;
  unit: string;
};

function CourtPrice({
  price,
  unit,
}: CourtPriceProps): React.JSX.Element {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.price}>
        {price}
      </Text>

      <Text style={styles.priceUnit}>
        {unit}
      </Text>
    </View>
  );
}

/* ============================================================
   RESERVE BUTTON
============================================================ */

type ReserveButtonProps = {
  onPress: () => void;
};

function ReserveButton({
  onPress,
}: ReserveButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.reserveButton,
        pressed &&
          styles.reserveButtonPressed,
      ]}
    >
      <Text style={styles.reserveButtonText}>
        Reservar
      </Text>
    </Pressable>
  );
}

/* ============================================================
   BOTTOM NAVIGATION
============================================================ */

type BottomNavigationProps = {
  activeTab: NavigationTab;
  onChange: (tab: NavigationTab) => void;
};

type NavigationItem = {
  id: NavigationTab;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  main?: boolean;
};

function BottomNavigation({
  activeTab,
  onChange,
}: BottomNavigationProps): React.JSX.Element {
  const items: NavigationItem[] = [
    {
      id: "Inicio",
      label: "Inicio",
      icon: "home",
    },
    {
      id: "Reservas",
      label: "Reservas",
      icon: "calendar-outline",
    },
    {
      id: "Cancha",
      label: "",
      icon: "football",
      main: true,
    },
    {
      id: "Favoritos",
      label: "Favoritos",
      icon: "heart-outline",
    },
    {
      id: "Perfil",
      label: "Perfil",
      icon: "person-outline",
    },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {items.map((item: NavigationItem) => {
        const active =
          activeTab === item.id;

        if (item.main) {
          return (
            <Pressable
              key={item.id}
              onPress={() =>
                onChange(item.id)
              }
              style={styles.mainNavButton}
            >
              <View style={styles.mainNavCircle}>
                <Ionicons
                  name={item.icon}
                  size={25}
                  color={COLORS.black}
                />
              </View>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={item.id}
            onPress={() =>
              onChange(item.id)
            }
            style={styles.navItem}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={
                active
                  ? COLORS.primary
                  : COLORS.gray
              }
            />

            <Text
              style={[
                styles.navText,
                active &&
                  styles.navTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  /* ========================================================
     SCREEN
  ======================================================== */

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 20,
  },

  content: {
    alignItems: "stretch",
  },

  /* ========================================================
     HEADER
  ======================================================== */

  header: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 4,
  },

  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoCircle: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: COLORS.white,

    fontSize: 18,

    fontWeight: "900",

    marginLeft: 7,

    letterSpacing: 1,
  },

  notificationButton: {
    width: 38,
    height: 38,

    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  notificationDot: {
    position: "absolute",

    top: 7,
    right: 7,

    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: COLORS.primary,

    borderWidth: 1,
    borderColor: COLORS.background,
  },

  /* ========================================================
     HERO
  ======================================================== */

  hero: {
    height: 170,

    borderRadius: 16,

    backgroundColor: "#102E1E",

    overflow: "hidden",

    position: "relative",

    marginBottom: 12,
  },

  heroTextContainer: {
    position: "absolute",

    left: 18,
    top: 24,

    zIndex: 5,
  },

  heroTitle: {
    color: COLORS.white,

    fontSize: 25,
    lineHeight: 27,

    fontWeight: "900",

    letterSpacing: -0.5,
  },

  heroSubtitle: {
    color: COLORS.white,

    fontSize: 10,
    lineHeight: 14,

    fontWeight: "600",

    opacity: 0.9,
  },

  heroBall: {
    position: "absolute",

    bottom: 15,
    left: 155,

    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",

    zIndex: 4,
  },

  heroPlayer: {
    position: "absolute",

    right: -5,
    bottom: 8,

    width: 150,
    height: 145,

    alignItems: "center",
    justifyContent: "center",

    transform: [
      {
        rotate: "-12deg",
      },
    ],

    opacity: 0.8,
  },

  heroCircleOne: {
    position: "absolute",

    width: 190,
    height: 190,

    borderRadius: 100,

    right: -65,
    top: 30,

    backgroundColor: "#0F4D2C",

    transform: [
      {
        rotate: "25deg",
      },
    ],
  },

  heroCircleTwo: {
    position: "absolute",

    width: 120,
    height: 120,

    borderRadius: 60,

    right: 70,
    bottom: -70,

    backgroundColor: "#1C6739",
  },

  /* ========================================================
     SEARCH
  ======================================================== */

  searchContainer: {
    height: 48,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#0C291A",

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    paddingHorizontal: 14,

    marginBottom: 18,
  },

  searchInput: {
    flex: 1,

    color: COLORS.white,

    fontSize: 12,

    marginHorizontal: 9,

    paddingVertical: 0,
  },

  searchFilterButton: {
    width: 30,
    height: 30,

    alignItems: "center",
    justifyContent: "center",
  },

  /* ========================================================
     SECTION
  ======================================================== */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 10,
  },

  sectionTitle: {
    color: COLORS.white,

    fontSize: 14,

    fontWeight: "900",
  },

  seeAll: {
    color: COLORS.primary,

    fontSize: 10,

    fontWeight: "700",
  },

  /* ========================================================
     FILTERS
  ======================================================== */

  filtersContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 13,
  },

  filterButton: {
    height: 31,

    paddingHorizontal: 13,

    borderRadius: 18,

    backgroundColor: "#123020",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 7,
  },

  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.gray,

    fontSize: 9,

    fontWeight: "700",
  },

  filterTextActive: {
    color: COLORS.black,

    fontWeight: "900",
  },

  /* ========================================================
     COURT LIST
  ======================================================== */

  courtList: {
    width: "100%",
  },

  /* ========================================================
     COURT CARD
  ======================================================== */

  courtCard: {
    width: "100%",

    minHeight: 151,

    backgroundColor: COLORS.card,

    borderRadius: 14,

    padding: 8,

    flexDirection: "row",

    marginBottom: 11,

    borderWidth: 1,
    borderColor: "#1C422D",
  },

  /* ========================================================
     COURT IMAGE
  ======================================================== */

  courtImageContainer: {
    width: 132,

    height: 135,

    borderRadius: 9,

    overflow: "hidden",

    position: "relative",

    backgroundColor: "#183A27",
  },

  courtImage: {
    width: "100%",
    height: "100%",
  },

  ratingBadge: {
    position: "absolute",

    top: 7,
    left: 7,

    minWidth: 38,
    height: 21,

    paddingHorizontal: 6,

    borderRadius: 11,

    backgroundColor:
      "rgba(5, 20, 12, 0.85)",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 3,
  },

  ratingText: {
    color: COLORS.white,

    fontSize: 9,

    fontWeight: "800",
  },

  /* ========================================================
     COURT INFO
  ======================================================== */

  courtInfo: {
    flex: 1,

    paddingLeft: 10,

    paddingVertical: 3,

    justifyContent: "space-between",
  },

  courtName: {
    color: COLORS.white,

    fontSize: 12,

    lineHeight: 15,

    fontWeight: "900",

    marginBottom: 2,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    minHeight: 17,
  },

  infoText: {
    color: COLORS.gray,

    fontSize: 8,

    fontWeight: "600",

    marginLeft: 4,

    flexShrink: 1,
  },

  /* ========================================================
     PRICE
  ======================================================== */

  priceRow: {
    flexDirection: "row",

    alignItems: "baseline",

    marginTop: 2,
  },

  price: {
    color: COLORS.primary,

    fontSize: 13,

    fontWeight: "900",
  },

  priceUnit: {
    color: COLORS.gray,

    fontSize: 8,

    fontWeight: "600",

    marginLeft: 3,
  },

  /* ========================================================
     RESERVE
  ======================================================== */

  reserveButton: {
    width: "100%",

    height: 29,

    backgroundColor: COLORS.primary,

    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 3,
  },

  reserveButtonPressed: {
    backgroundColor: COLORS.primaryDark,

    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  reserveButtonText: {
    color: COLORS.black,

    fontSize: 10,

    fontWeight: "900",

    textTransform: "uppercase",
  },

  /* ========================================================
     EMPTY
  ======================================================== */

  emptyContainer: {
    minHeight: 190,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: COLORS.white,

    fontSize: 14,

    fontWeight: "800",

    marginTop: 12,
  },

  emptyText: {
    color: COLORS.gray,

    fontSize: 10,

    textAlign: "center",

    marginTop: 5,
  },

  /* ========================================================
     BOTTOM NAV
  ======================================================== */

  bottomNavigation: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: 69,

    backgroundColor: "#071D13",

    borderTopWidth: 1,
    borderTopColor: "#1C392B",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-around",

    paddingHorizontal: 8,
  },

  navItem: {
    flex: 1,

    height: 55,

    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: COLORS.gray,

    fontSize: 7,

    fontWeight: "700",

    marginTop: 3,
  },

  navTextActive: {
    color: COLORS.primary,
  },

  /* ========================================================
     MAIN NAV BUTTON
  ======================================================== */

  mainNavButton: {
    width: 64,
    height: 64,

    alignItems: "center",
    justifyContent: "center",

    marginTop: -22,
  },

  mainNavCircle: {
    width: 57,
    height: 57,

    borderRadius: 29,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 4,
    borderColor: COLORS.background,
  },
});
