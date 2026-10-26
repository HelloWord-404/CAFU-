import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="canchas" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="HomeScreen" />
      <Tabs.Screen name="court" />
      <Tabs.Screen name="checkout" />
      <Tabs.Screen name="payment" />
      <Tabs.Screen name="booking-success" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="register" />
    </Tabs>
  );
}
