import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
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

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 700;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071B12" />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.container,
            isDesktop && styles.containerDesktop,
          ]}
        >
          {/* =========================
              HERO
          ========================= */}

          <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
            {/* Flecha */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
            </Pressable>

            {/* Logo */}
            <View style={[styles.brand, isDesktop && styles.brandDesktop]}>
              <View style={styles.brandCircle}>
                <Ionicons name="football" size={27} color="#071B12" />
              </View>

              <View style={styles.brandTextContainer}>
                <Text style={styles.brandTitle}>CAFU</Text>

                <Text style={styles.brandSubtitle}>TU CANCHA, TU MOMENTO</Text>
              </View>
            </View>

            {/* =========================
                BALÓN SIN FONDO
            ========================= */}

            <View
              pointerEvents="none"
              style={[
                styles.ballContainer,
                isDesktop && styles.ballContainerDesktop,
              ]}
            >
              <Image
                source={require("../../assets/images/balon sin fondo.png")}
                style={styles.ballImage}
                resizeMode="contain"
              />
            </View>

            {/* Texto */}
            <View
              style={[styles.heroText, isDesktop && styles.heroTextDesktop]}
            >
              <Text style={[styles.title, isDesktop && styles.titleDesktop]}>
                Crea <Text style={styles.greenText}>tu cuenta</Text>
              </Text>

              <Text style={[styles.title, isDesktop && styles.titleDesktop]}>
                y comienza a jugar
              </Text>

              <Text
                style={[
                  styles.description,
                  isDesktop && styles.descriptionDesktop,
                ]}
              >
                Regístrate y accede a las mejores
                {"\n"}
                canchas, promociones y más.
              </Text>
            </View>

            {/* Indicadores */}
            <View
              style={[styles.indicators, isDesktop && styles.indicatorsDesktop]}
            >
              <View style={[styles.indicator, styles.activeIndicator]} />

              <View style={styles.indicator} />
              <View style={styles.indicator} />
              <View style={styles.indicator} />
            </View>
          </View>

          {/* =========================
              FORMULARIO
          ========================= */}

          <View style={[styles.form, isDesktop && styles.formDesktop]}>
            {/* Nombre + Apellido */}
            <View style={styles.nameRow}>
              <View style={[styles.inputContainer, styles.nameInput]}>
                <Ionicons name="person-outline" size={19} color="#91A099" />

                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  placeholderTextColor="#91A099"
                  autoCapitalize="words"
                />
              </View>

              <View style={[styles.inputContainer, styles.nameInput]}>
                <Ionicons name="person-outline" size={19} color="#91A099" />

                <TextInput
                  style={styles.input}
                  placeholder="Apellido"
                  placeholderTextColor="#91A099"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Correo */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={19} color="#91A099" />

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#91A099"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Teléfono */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={19} color="#91A099" />

              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor="#91A099"
                keyboardType="phone-pad"
              />
            </View>

            {/* Contraseña */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#91A099" />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#91A099"
                secureTextEntry={!showPassword}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={21}
                  color="#91A099"
                />
              </Pressable>
            </View>

            {/* Confirmar contraseña */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#91A099" />

              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#91A099"
                secureTextEntry={!showConfirmPassword}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={21}
                  color="#91A099"
                />
              </Pressable>
            </View>

            {/* Términos */}
            <Pressable
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked,
                ]}
              >
                {acceptedTerms && (
                  <Ionicons name="checkmark" size={16} color="#071B12" />
                )}
              </View>

              <Text style={styles.termsText}>
                Acepto los{" "}
                <Text style={styles.termsLink}>Términos y Condiciones</Text>
                {"\n"}y la{" "}
                <Text style={styles.termsLink}>Política de Privacidad</Text>
              </Text>
            </Pressable>

            {/* Botón */}
            <Pressable
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => {
                console.log("Crear cuenta");
              }}
            >
              <Text style={styles.createButtonText}>Crear cuenta</Text>

              <View style={styles.arrowCircle}>
                <Ionicons name="arrow-forward" size={22} color="#071B12" />
              </View>
            </Pressable>

            {/* Login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>

              <Pressable onPress={() => router.back()}>
                <Text style={styles.loginLink}> Inicia sesión</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ============================================================
   ESTILOS
============================================================ */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  keyboard: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#071B12",

    paddingHorizontal: 23,
    paddingTop: 8,
    paddingBottom: 25,
  },

  containerDesktop: {
    paddingHorizontal: 45,
    paddingBottom: 60,
  },

  /* =========================
     HERO
  ========================= */

  hero: {
    width: "100%",

    /*
      Aumentamos un poco la altura
      para que todo quede más centrado
      y no quede tanto espacio abajo.
    */
    height: 315,

    position: "relative",
    overflow: "hidden",
  },

  heroDesktop: {
    height: 430,

    maxWidth: 1200,
    alignSelf: "center",
  },

  /* =========================
     FLECHA
  ========================= */

  backButton: {
    position: "absolute",

    left: 0,
    top: 4,

    width: 42,
    height: 42,

    justifyContent: "center",
    alignItems: "flex-start",

    zIndex: 50,
  },

  /* =========================
     LOGO
  ========================= */

  brand: {
    position: "absolute",

    top: 38,
    left: 0,

    flexDirection: "row",

    alignItems: "center",

    zIndex: 20,
  },

  brandDesktop: {
    left: 45,
    top: 28,
  },

  brandCircle: {
    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: "#C8FF00",

    justifyContent: "center",
    alignItems: "center",
  },

  brandTextContainer: {
    marginLeft: 10,
  },

  brandTitle: {
    color: "#FFFFFF",

    fontSize: 28,
    lineHeight: 29,

    fontWeight: "900",

    letterSpacing: -1,
  },

  brandSubtitle: {
    color: "#C8FF00",

    fontSize: 7.5,
    lineHeight: 10,

    fontWeight: "900",

    marginTop: 2,
  },

  /* =========================
     BALÓN
  ========================= */

  ballContainer: {
    position: "absolute",

    right: -55,
    top: 35,

    width: "72%",
    height: 220,

    zIndex: 2,
  },

  ballContainerDesktop: {
    right: 25,
    top: 45,

    width: "48%",
    height: 350,
  },

  ballImage: {
    width: "100%",
    height: "100%",
  },

  /* =========================
     TEXTO
  ========================= */

  heroText: {
    position: "absolute",

    left: 0,

    /*
      Bajamos un poco el título.
    */
    top: 112,

    width: "70%",

    zIndex: 15,
  },

  heroTextDesktop: {
    left: 45,
    top: 165,

    width: "45%",
    maxWidth: 520,
  },

  title: {
    color: "#FFFFFF",

    fontSize: 25,
    lineHeight: 29,

    fontWeight: "900",

    letterSpacing: -0.5,
  },

  titleDesktop: {
    fontSize: 40,
    lineHeight: 45,

    letterSpacing: -1,
  },

  greenText: {
    color: "#C8FF00",
  },

  description: {
    color: "#B6C0BA",

    fontSize: 12,
    lineHeight: 17,

    marginTop: 7,

    maxWidth: 250,
  },

  descriptionDesktop: {
    fontSize: 16,
    lineHeight: 23,

    marginTop: 12,

    maxWidth: 400,
  },

  /* =========================
     INDICADORES
  ========================= */

  indicators: {
    position: "absolute",

    left: 0,
    right: 0,

    /*
      Los bajamos un poquito.
    */
    bottom: 5,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 30,
  },

  indicatorsDesktop: {
    bottom: 18,
  },

  indicator: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#65756C",

    marginHorizontal: 4,
  },

  activeIndicator: {
    width: 25,

    backgroundColor: "#C8FF00",
  },

  /* =========================
     FORMULARIO
  ========================= */

  form: {
    width: "100%",

    /*
      Bajamos el formulario para
      aprovechar mejor el espacio.
    */
    marginTop: 25,
  },

  formDesktop: {
    width: "58%",

    maxWidth: 850,

    marginTop: 5,
  },

  /* =========================
     NOMBRE / APELLIDO
  ========================= */

  nameRow: {
    flexDirection: "row",

    gap: 8,

    width: "100%",
  },

  nameInput: {
    flex: 1,
  },

  /* =========================
     INPUTS
  ========================= */

  inputContainer: {
    height: 48,

    width: "100%",

    borderWidth: 1,

    borderColor: "#294A3C",

    borderRadius: 10,

    backgroundColor: "#0A2419",

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    marginBottom: 9,
  },

  input: {
    flex: 1,

    color: "#FFFFFF",

    fontSize: 12,

    marginLeft: 9,

    paddingVertical: 0,
  },

  eyeButton: {
    width: 35,
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  /* =========================
     TÉRMINOS
  ========================= */

  termsContainer: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 7,
    marginBottom: 17,
  },

  checkbox: {
    width: 21,
    height: 21,

    borderWidth: 2,

    borderColor: "#718078",

    borderRadius: 3,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 9,
  },

  checkboxChecked: {
    backgroundColor: "#C8FF00",

    borderColor: "#C8FF00",
  },

  termsText: {
    flex: 1,

    color: "#D1D7D3",

    fontSize: 11,

    lineHeight: 17,
  },

  termsLink: {
    color: "#C8FF00",

    fontWeight: "900",
  },

  /* =========================
     BOTÓN
  ========================= */

  createButton: {
    height: 53,

    width: "100%",

    borderRadius: 11,

    backgroundColor: "#C8FF00",

    justifyContent: "center",
    alignItems: "center",

    position: "relative",

    shadowColor: "#C8FF00",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.25,

    shadowRadius: 9,

    elevation: 5,
  },

  createButtonText: {
    color: "#071B12",

    fontSize: 14,

    fontWeight: "900",
  },

  arrowCircle: {
    position: "absolute",

    right: 13,

    width: 32,
    height: 32,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.8,

    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  /* =========================
     LOGIN
  ========================= */

  loginContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 18,
    marginBottom: 10,
  },

  loginText: {
    color: "#A8B2AD",

    fontSize: 10,
  },

  loginLink: {
    color: "#C8FF00",

    fontSize: 10,

    fontWeight: "900",
  },
});
