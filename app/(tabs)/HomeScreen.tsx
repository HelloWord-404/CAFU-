import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../src/lib/supabase";

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

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
  image: string;
};

type FilterType = "Hoy" | "Mañana" | "Fin de semana" | "Todas";

type NavigationTab = "Inicio" | "Reservas" | "Cancha" | "Favoritos" | "Perfil";

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
    image:
      "https://bogota.gov.co/sites/default/files/styles/1050px/public/canchas1.jpg",
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
    image:
      "https://www2.culturarecreacionydeporte.gov.co/sites/default/files/2015_articulos_2/cancha_.jpg",
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
    image:
      "https://bogota.gov.co/sites/default/files/inline-images/como-reservar-una-cancha-sintetica-en-parques-de-bogota-con-el-idrd-2.png",
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
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpBIyOVP-1xHkIKLY6shKsKiybHaoVOyOf-7FZPvIeASb0Nd9DHatyuQh&s=10",
  },
  ,
  {
    id: "5",
    name: "La Bombonera Sintética",
    location: "Bello, Antioquia",
    rating: "4.5",
    opening: "6:00 AM",
    closing: "11:00 PM",
    price: "$95.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeRdnhDIOXJgdlSiLTKZnFheebO7ChQaq7pUBXnVkU4g&s=10",
  },
  {
    id: "6",
    name: "Camp Nou Medellín",
    location: "Medellín, Antioquia",
    rating: "4.8",
    opening: "7:00 AM",
    closing: "12:00 AM",
    price: "$140.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlVucusnZO1LpLJ2OX1c1a2smTdFmV2wH9YvRMiCwkw&s=10",
  },
  {
    id: "7",
    name: "La Cancha de tu Barrio",
    location: "Itagüí, Antioquia",
    rating: "4.4",
    opening: "8:00 AM",
    closing: "10:00 PM",
    price: "$90.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqgEbp0kJiVJXKoEQKs6zShsf2RHYMh5eMreLsN0huOQ&s=10",
  },
  {
    id: "8",
    name: "San Siro Sintético",
    location: "Envigado, Antioquia",
    rating: "4.7",
    opening: "6:00 AM",
    closing: "11:00 PM",
    price: "$125.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1r4Elb4ipKQ-CnAqSi_SDYTNHU_DBXiEkRPpzP9V4rg&s=10",
  },
  {
    id: "9",
    name: "Estadio Cinco por Cinco",
    location: "Sabaneta, Antioquia",
    rating: "4.6",
    opening: "7:00 AM",
    closing: "11:00 PM",
    price: "$105.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFh9to23uEtvsxTuxXK8G_l3JrDUeb2Arr6wOLnp0CA&s=10",
  },
  {
    id: "10",
    name: "La Jaula del Gol",
    location: "Medellín, Antioquia",
    rating: "4.3",
    opening: "6:00 AM",
    closing: "10:00 PM",
    price: "$115.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRggrvaMpUN6QnD43Wv1xi1rACzLtlsMOokBY16sQbCQ&s=10",
  },
  {
    id: "11",
    name: "Maracaná Premium",
    location: "La Estrella, Antioquia",
    rating: "4.9",
    opening: "6:00 AM",
    closing: "12:00 AM",
    price: "$130.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabIBFPiMzMegav8sTKBGGO-Blf0qYRIN-mg82VSDi8Q&s=10",
  },
  {
    id: "12",
    name: "Cancha El Templo",
    location: "Copacabana, Antioquia",
    rating: "4.5",
    opening: "7:00 AM",
    closing: "11:00 PM",
    price: "$98.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_BuJLzsZCElPxRCluM22IYBjePCD0cOdLkBzHYkefA&s=10",
  },
  {
    id: "13",
    name: "Zona de Gol Centro",
    location: "Medellín, Antioquia",
    rating: "4.2",
    opening: "8:00 AM",
    closing: "10:00 PM",
    price: "$100.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8FSwCBSO4AgvJcjzFty9QXxQGuhM1Zct0RBNriEgQ3w&s=10",
  },
  {
    id: "14",
    name: "La Doce Sintética",
    location: "Envigado, Antioquia",
    rating: "4.7",
    opening: "6:00 AM",
    closing: "11:30 PM",
    price: "$120.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfNmzmYKmI8MzjtdqrAUGLLgBmxtbeZkk152kqWuP5qg&s=10",
  },
  {
    id: "15",
    name: "Pista y Gol",
    location: "Bello, Antioquia",
    rating: "4.4",
    opening: "6:30 AM",
    closing: "11:00 PM",
    price: "$92.000",
    priceUnit: "/hora",
    image:
      "https://bogota.gov.co/sites/default/files/styles/1050px/public/canchas1.jpg",
  },
  {
    id: "16",
    name: "Bernabéu Oriente",
    location: "Rionegro, Antioquia",
    rating: "4.8",
    opening: "6:00 AM",
    closing: "11:00 PM",
    price: "$135.000",
    priceUnit: "/hora",
    image:
      "https://bogota.gov.co/sites/default/files/inline-images/como-reservar-una-cancha-sintetica-en-parques-de-bogota-con-el-idrd-2.png",
  },
  {
    id: "17",
    name: "La Esquina del Fútbol",
    location: "Itagüí, Antioquia",
    rating: "4.5",
    opening: "7:00 AM",
    closing: "10:30 PM",
    price: "$96.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0qsWsdoY8YA2waGtjV0m3G7JgdN3J2AbaoQAWAXcnnA&s=10",
  },
  {
    id: "18",
    name: "Elite Sport Park",
    location: "Medellín, Antioquia",
    rating: "4.9",
    opening: "5:00 AM",
    closing: "11:30 PM",
    price: "$150.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5U9jvfZSP2ORubK60gx5SrRL1AewNI4SFNKAB0goQdw&s=10",
  },
  {
    id: "19",
    name: "Cancha Los Álamos",
    location: "Sabaneta, Antioquia",
    rating: "4.6",
    opening: "6:00 AM",
    closing: "11:00 PM",
    price: "$108.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFUwIgJ8xKZykITXcK9qnKq6GkLgUUM_O5xx_ycRX2g&s=10",
  },
  {
    id: "20",
    name: "Camp Nou del Sur",
    location: "Caldas, Antioquia",
    rating: "4.3",
    opening: "7:00 AM",
    closing: "10:00 PM",
    price: "$88.000",
    priceUnit: "/hora",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzwQQiONlQvFqDRN6pl_kcE88xvuTmDyWsbIKrNYR2MQ&s=10",
  },
];

/* =========================================================
   HOME SCREEN
========================================================= */

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  /* =======================================================
     RESPONSIVE SOLO PARA MÓVIL
  ======================================================= */

  const horizontalPadding = width <= 360 ? 12 : width <= 390 ? 14 : 16;

  const contentWidth = width - horizontalPadding * 2;

  const scale = Math.min(Math.max(width / 390, 0.88), 1.08);

  /* =======================================================
     ESTADOS
  ======================================================= */

  const [activeFilter, setActiveFilter] = useState<FilterType>("Hoy");

  const [search, setSearch] = useState<string>("");

  const [activeTab, setActiveTab] = useState<NavigationTab>("Inicio");

  /* =======================================================
     NAVEGACIÓN
  ======================================================= */

  const handleNavigation = (tab: NavigationTab): void => {
    switch (tab) {
      case "Inicio":
        router.replace("/(tabs)/HomeScreen");
        break;

      case "Reservas":
        router.push("/(tabs)/booking-success");
        break;

      case "Cancha":
        router.push("/");
        break;

      case "Favoritos":
        router.push("/(tabs)/canchas");
        break;

      case "Perfil":
        router.push("/(tabs)/profile");
        break;
    }
  };

  /* =======================================================
     FILTRADO POR BÚSQUEDA
  ======================================================= */

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

  /* =======================================================
     RESERVAR
  ======================================================= */

  /* const handleReserve = (court: Court): void => {
    router.push({
      pathname: "/(tabs)/court",
      params: {
        id: court.id,
        name: court.name,
        location: court.location,
        rating: court.rating,
        opening: court.opening,
        closing: court.closing,
        price: court.price,
        priceUnit: court.priceUnit,
        image: court.image,
      },
    });
  };
  */

  /* =======================================================
     FILTROS
  ======================================================= */

  const handleSearchOptions = (): void => {
    console.log("Abrir filtros avanzados");
  };

  /* =======================================================
     NOTIFICACIONES
  ======================================================= */

  const handleNotification = (): void => {
    console.log("Abrir notificaciones");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  const handleReserve = async (court: Court) => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        Alert.alert(
          "Inicia sesión",
          "Debes iniciar sesión para reservar una cancha.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Iniciar sesión",
              onPress: () => router.push("/(tabs)/login"),
            },
          ],
        );
        return;
      }

      // El usuario está autenticado.
      // Continuar al detalle de la cancha.
      router.push({
        pathname: "/(tabs)/court",
        params: {
          id: court.id,
          name: court.name,
          location: court.location,
          rating: court.rating,
          opening: court.opening,
          closing: court.closing,
          price: court.price,
          priceUnit: court.priceUnit,
        },
      });
    } catch (error) {
      console.error("Error verificando la sesión:", error);

      Alert.alert(
        "Error",
        "No se pudo verificar tu sesión. Inténtalo nuevamente.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight: height,
              paddingHorizontal: horizontalPadding,
              paddingBottom: 95,
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View
            style={[
              styles.content,
              {
                width: contentWidth,
              },
            ]}
          >
            {/* =================================================
                HEADER
            ================================================== */}

            <Header onNotificationPress={handleNotification} />

            {/* =================================================
                HERO
            ================================================== */}

            <HeroBanner />

            {/* =================================================
                BUSCADOR
            ================================================== */}

            <SearchBar
              value={search}
              onChangeText={setSearch}
              onFilterPress={handleSearchOptions}
            />

            {/* =================================================
                HEADER CANCHAS
            ================================================== */}

            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontSize: 14 * scale,
                  },
                ]}
                numberOfLines={1}
              >
                Canchas Disponibles
              </Text>

              <Pressable
                onPress={() => router.push("/(tabs)/HomeScreen")}
                hitSlop={10}
              >
                <Text style={styles.seeAll}>Ver todas</Text>
              </Pressable>
            </View>

            {/* =================================================
                FILTROS
            ================================================== */}

            <FilterTabs
              activeFilter={activeFilter}
              onChange={setActiveFilter}
            />

            {/* =================================================
                CANCHAS
            ================================================== */}

            <CourtList courts={filteredCourts} onReserve={handleReserve} />

            {/* ESPACIO PARA LA BARRA INFERIOR */}

            <View style={{ height: 85 }} />
          </View>
        </ScrollView>

        {/* ===================================================
            NAVEGACIÓN INFERIOR
        ==================================================== */}

        <BottomNavigation
          activeTab={activeTab}
          onChange={setActiveTab}
          onNavigate={handleNavigation}
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

function Header({ onNotificationPress }: HeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <View style={styles.logoCircle}>
          <Ionicons name="football" size={21} color={COLORS.black} />
        </View>

        <Text style={styles.logoText}>CAFU</Text>
      </View>

      <Pressable
        style={styles.notificationButton}
        onPress={onNotificationPress}
        hitSlop={10}
      >
        <Ionicons name="notifications-outline" size={23} color={COLORS.white} />

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
        <Text style={styles.heroTitle}>Reserva tu</Text>

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

        <Text style={styles.heroSubtitle}>Canchas sintéticas disponibles</Text>

        <Text style={styles.heroSubtitle}>cuando quieras jugar.</Text>
      </View>

      <Image
        source={require("../../assets/images/logo 3 (1).png")}
        style={styles.playerImage}
        resizeMode="contain"
      />
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
      <Ionicons name="search-outline" size={20} color={COLORS.gray} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar cancha o ubicación"
        placeholderTextColor={COLORS.gray}
        style={styles.searchInput}
        returnKeyType="search"
        numberOfLines={1}
      />

      <Pressable
        onPress={onFilterPress}
        hitSlop={10}
        style={styles.searchFilterButton}
      >
        <Ionicons name="options-outline" size={21} color={COLORS.gray} />
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
  const filters: FilterType[] = ["Hoy", "Mañana", "Fin de semana", "Todas"];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.filtersContainer}
    >
      {filters.map((filter: FilterType) => {
        const active = activeFilter === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            style={[styles.filterButton, active && styles.filterButtonActive]}
          >
            <Text
              style={[styles.filterText, active && styles.filterTextActive]}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/* ============================================================
   LISTA DE CANCHAS
============================================================ */

type CourtListProps = {
  courts: Court[];
  onReserve: (court: Court) => void;
};

function CourtList({ courts, onReserve }: CourtListProps): React.JSX.Element {
  if (courts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={40} color={COLORS.darkGray} />

        <Text style={styles.emptyTitle}>No encontramos canchas</Text>

        <Text style={styles.emptyText}>
          Intenta buscar por otro nombre o ubicación.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.courtList}>
      {courts.map((court: Court) => (
        <CourtCard key={court.id} court={court} onReserve={onReserve} />
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

function CourtCard({ court, onReserve }: CourtCardProps): React.JSX.Element {
  return (
    <View style={styles.courtCard}>
      {/* IMAGEN */}

      <CourtImage image={court.image} rating={court.rating} />

      {/* INFORMACIÓN */}

      <View style={styles.courtInfo}>
        <Text style={styles.courtName} numberOfLines={2}>
          {court.name}
        </Text>

        <CourtLocation location={court.location} />

        <CourtSchedule opening={court.opening} closing={court.closing} />

        <CourtPrice price={court.price} unit={court.priceUnit} />

        <ReserveButton onPress={() => onReserve(court)} />
      </View>
    </View>
  );
}

/* ============================================================
   COURT IMAGE
============================================================ */

type CourtImageProps = {
  image: string;
  rating: string;
};

function CourtImage({ image, rating }: CourtImageProps): React.JSX.Element {
  return (
    <View style={styles.courtImageContainer}>
      <Image
        source={{ uri: image }}
        style={styles.courtImage}
        resizeMode="cover"
      />

      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={10} color={COLORS.primary} />
        <Text style={styles.ratingText}>{rating}</Text>
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

function CourtLocation({ location }: CourtLocationProps): React.JSX.Element {
  return (
    <View style={styles.infoRow}>
      <Ionicons name="location" size={11} color={COLORS.primary} />

      <Text style={styles.infoText} numberOfLines={1}>
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
      <Ionicons name="time-outline" size={11} color={COLORS.primary} />

      <Text style={styles.infoText} numberOfLines={1}>
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

function CourtPrice({ price, unit }: CourtPriceProps): React.JSX.Element {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.price}>{price}</Text>

      <Text style={styles.priceUnit}>{unit}</Text>
    </View>
  );
}

/* ============================================================
   RESERVE BUTTON
============================================================ */

type ReserveButtonProps = {
  onPress: () => void;
};

function ReserveButton({ onPress }: ReserveButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.reserveButton,
        pressed && styles.reserveButtonPressed,
      ]}
    >
      <Text style={styles.reserveButtonText}>Reservar</Text>
    </Pressable>
  );
}

/* ============================================================
   BOTTOM NAVIGATION
============================================================ */

type BottomNavigationProps = {
  activeTab: NavigationTab;
  onChange: (tab: NavigationTab) => void;
  onNavigate: (tab: NavigationTab) => void;
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
  onNavigate,
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
        const active = activeTab === item.id;

        /* =============================================
           BOTÓN CENTRAL
        ============================================= */

        if (item.main) {
          return (
            <Pressable
              key={item.id}
              onPress={() => {
                onChange(item.id);
                onNavigate(item.id);
              }}
              style={styles.mainNavButton}
            >
              <View style={styles.mainNavCircle}>
                <Ionicons name={item.icon} size={25} color={COLORS.black} />
              </View>
            </Pressable>
          );
        }

        /* =============================================
           BOTONES NORMALES
        ============================================= */

        return (
          <Pressable
            key={item.id}
            onPress={() => {
              onChange(item.id);
              onNavigate(item.id);
            }}
            style={styles.navItem}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={active ? COLORS.primary : COLORS.gray}
            />

            <Text
              style={[styles.navText, active && styles.navTextActive]}
              numberOfLines={1}
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
  },

  content: {
    alignItems: "stretch",
  },

  /* ========================================================
     HEADER
  ======================================================== */

  header: {
    minHeight: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 2,
  },

  headerLogo: {
    flexDirection: "row",
    alignItems: "center",

    minWidth: 0,
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
    height: 165,

    borderRadius: 16,

    backgroundColor: "#102E1E",

    overflow: "hidden",

    position: "relative",

    marginBottom: 12,

    width: "100%",
  },

  heroTextContainer: {
    position: "absolute",

    left: 18,
    top: 23,

    zIndex: 5,

    maxWidth: "67%",
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

  playerImage: {
    position: "absolute",

    width: 215,
    height: 200,

    right: "5%",
    bottom: -15,

    opacity: 1,

    zIndex: 20,
    elevation: 20,
  },

  /* ========================================================
     SEARCH
  ======================================================== */

  searchContainer: {
    width: "100%",

    height: 46,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#0C291A",

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    paddingHorizontal: 12,

    marginBottom: 16,
  },

  searchInput: {
    flex: 1,

    minWidth: 0,

    color: COLORS.white,

    fontSize: 11,

    marginHorizontal: 8,

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
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 10,
  },

  sectionTitle: {
    color: COLORS.white,

    fontSize: 14,

    fontWeight: "900",

    flexShrink: 1,
  },

  seeAll: {
    color: COLORS.primary,

    fontSize: 10,

    fontWeight: "700",

    marginLeft: 10,
  },

  /* ========================================================
     FILTERS
  ======================================================== */

  filtersContainer: {
    flexDirection: "row",

    alignItems: "center",

    paddingBottom: 1,

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

    minHeight: 145,

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
    width: "34%",

    height: 132,

    borderRadius: 9,

    overflow: "hidden",

    position: "relative",

    backgroundColor: "#183A27",

    flexShrink: 0,
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

    backgroundColor: "rgba(5, 20, 12, 0.85)",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },

  ratingText: {
    color: COLORS.white,

    fontSize: 9,

    fontWeight: "800",

    marginLeft: 3,
  },

  /* ========================================================
     COURT INFO
  ======================================================== */

  courtInfo: {
    flex: 1,

    minWidth: 0,

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

    flexShrink: 1,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    minHeight: 17,

    minWidth: 0,
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

    flexWrap: "wrap",

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

    minHeight: 29,

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
     BOTTOM NAVIGATION
  ======================================================== */

  bottomNavigation: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: 68,

    backgroundColor: "#071D13",

    borderTopWidth: 1,
    borderTopColor: "#1C392B",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 4,
  },

  navItem: {
    flex: 1,

    minWidth: 0,

    height: 54,

    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: COLORS.gray,

    fontSize: 7,

    fontWeight: "700",

    marginTop: 3,

    maxWidth: "100%",
  },

  navTextActive: {
    color: COLORS.primary,
  },

  /* ========================================================
     BOTÓN CENTRAL
  ======================================================== */

  mainNavButton: {
    width: 60,
    height: 60,

    alignItems: "center",
    justifyContent: "center",

    marginTop: -20,
  },

  mainNavCircle: {
    width: 54,
    height: 54,

    borderRadius: 27,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 4,
    borderColor: COLORS.background,
  },
});
