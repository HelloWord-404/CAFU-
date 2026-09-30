/*import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

// Paleta de colores oficial extraída de HomeScreen
const COLORS = {
  background: "#061B12",
  primary: "#C8FF00",
  gray: "#A5AEA9",
  border: "#1C392B",
  black: "#07110D",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: "#071D13",
          borderTopColor: COLORS.border,
          height: 69,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
      }}
    >
     }
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {}
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Reservas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {# 3. Botón Central Flotante (Cancha / Pelota de Fútbol) }
      <Tabs.Screen
        name="court"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.mainNavCircle}>
              <Ionicons name="football" size={26} color={COLORS.black} />
            </View>
          ),
        }}
      />

      { 4. Favoritos }
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      { 5. Perfil }
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      { --- PANTALLAS DE FLUJO SECUNDARIAS (Sin barra inferior) --- }
      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="booking-success"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  mainNavCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Eleva el botón por encima del menú
    borderWidth: 4,
    borderColor: COLORS.background,
  },
});
*/
