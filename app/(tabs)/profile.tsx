import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
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
   TIPOS
========================================================= */

type NavigationTab = "Inicio" | "Reservas" | "Cancha" | "Favoritos" | "Perfil";

/* =========================================================
   COLORES (Exactamente los mismos de HomeScreen)
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
  red: "#FF5252",
};

/* =========================================================
   PROFILE SCREEN
========================================================= */

export default function ProfileScreen(): React.JSX.Element {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<NavigationTab>("Perfil");

  const contentWidth = Math.min(width - 28, 420);

  /* Manejo del cambio de pestaña con Expo Router */
  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab === "Inicio") {
      router.push("/");
    } else if (tab === "Reservas") {
      router.push("/bookings" as any);
    } else if (tab === "Favoritos") {
      router.push("/favorites" as any);
    } else if (tab === "Perfil") {
      router.push("/profile" as any);
    } else if (tab === "Cancha") {
      router.push("/court" as any);
    }
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: () => console.log("Sesión cerrada") },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { minHeight: height },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, { width: contentWidth }]}>
            {/* HEADER PERFIL */}
            <View style={styles.header}>
              <View style={{ width: 24 }} />
              <Text style={styles.headerTitle}>Perfil</Text>
              <Pressable
                style={styles.settingsButton}
                onPress={() => console.log("Ajustes")}
                hitSlop={10}
              >
                <Ionicons name="settings-outline" size={22} color={COLORS.white} />
              </Pressable>
            </View>

            {/* INFORMACIÓN DEL USUARIO */}
            <View style={styles.profileCard}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Juan Pérez</Text>
                <Text style={styles.userEmail}>juanperez@email.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
            </View>

            {/* BLOQUE 1 DE OPCIONES */}
            <View style={styles.menuGroup}>
              <MenuItem
                icon="person-outline"
                title="Mis datos"
                onPress={() => console.log("Mis datos")}
              />
              <View style={styles.divider} />
              <MenuItem
                icon="wallet-outline"
                title="Métodos de pago"
                onPress={() => console.log("Métodos de pago")}
              />
              <View style={styles.divider} />
              <MenuItem
                icon="document-text-outline"
                title="Mis facturas"
                onPress={() => console.log("Mis facturas")}
              />
              <View style={styles.divider} />
              <MenuItem
                icon="notifications-outline"
                title="Notificaciones"
                onPress={() => console.log("Notificaciones")}
              />
            </View>

            {/* BLOQUE 2 DE OPCIONES */}
            <View style={styles.menuGroup}>
              <MenuItem
                icon="help-circle-outline"
                title="Ayuda y soporte"
                onPress={() => console.log("Ayuda y soporte")}
              />
              <View style={styles.divider} />
              <MenuItem
                icon="log-out-outline"
                title="Cerrar sesión"
                isDestructive
                onPress={handleLogout}
              />
            </View>

            <View style={{ height: 90 }} />
          </View>
        </ScrollView>

        {/* NAVEGACIÓN INFERIOR OFICIAL */}
        <BottomNavigation activeTab={activeTab} onChange={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}

/* ============================================================
   ITEM DE MENÚ
============================================================ */

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  isDestructive?: boolean;
  onPress: () => void;
};

function MenuItem({ icon, title, isDestructive, onPress }: MenuItemProps) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={isDestructive ? COLORS.red : COLORS.white}
        />
        <Text style={[styles.menuTitle, isDestructive && styles.destructiveText]}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
    </Pressable>
  );
}

/* ============================================================
   BOTTOM NAVIGATION (Exactamente el mismo de HomeScreen)
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
        const active = activeTab === item.id;

        if (item.main) {
          return (
            <Pressable
              key={item.id}
              onPress={() => onChange(item.id)}
              style={styles.mainNavButton}
            >
              <View style={styles.mainNavCircle}>
                <Ionicons name={item.icon} size={25} color={COLORS.black} />
              </View>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={styles.navItem}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={active ? COLORS.primary : COLORS.gray}
            />

            <Text style={[styles.navText, active && styles.navTextActive]}>
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

  /* HEADER */
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },
  settingsButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  /* PROFILE CARD */
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 2,
  },
  userEmail: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
  },

  /* MENU GROUPS */
  menuGroup: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
  },
  destructiveText: {
    color: COLORS.red,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },

  /* BOTTOM NAV */
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