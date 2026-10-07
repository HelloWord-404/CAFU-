import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function LoginScreen() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [hora, setHora] = useState("");

  const { width, height } = useWindowDimensions();

  /*
   * BREAKPOINTS
   *
   * < 700  = celular
   * >= 700 = tablet / computador
   */
  const isDesktop = width >= 700;

  // ==============================
  // HORA
  // ==============================

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();

      const horas = ahora.getHours().toString().padStart(2, "0");

      const minutos = ahora.getMinutes().toString().padStart(2, "0");

      setHora(`${horas}:${minutos}`);
    };

    actualizarHora();

    const intervalo = setInterval(actualizarHora, 30000);

    return () => clearInterval(intervalo);
  }, []);

  // ==============================
  // LOGIN
  // ==============================

  const iniciarSesion = () => {
    console.log("Correo:", correo);
    console.log("Contraseña:", contrasena);
  };

  // =====================================================
  // DIMENSIONES RESPONSIVE
  // =====================================================

  const desktopHeroHeight = Math.min(Math.max(height * 0.7, 550), 650);

  const desktopPlayerWidth = Math.min(width * 0.34, 500);

  const desktopPlayerHeight = desktopHeroHeight * 0.78;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ================================================= 
            BARRA SUPERIOR 
        ================================================= */}

        <View style={styles.statusBar}>
          {/* BOTÓN VOLVER */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.statusTime}>{hora}</Text>

          <View style={styles.statusRight}>
            <Ionicons name="cellular" size={18} color="#FFFFFF" />

            <Ionicons name="wifi" size={18} color="#FFFFFF" />

            <Ionicons name="battery-full" size={21} color="#FFFFFF" />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            isDesktop && styles.scrollContentDesktop,
          ]}
        >
          {/* ================================================= 
              HERO 
          ================================================= */}

          <View
            style={[
              styles.hero,

              isDesktop
                ? {
                    height: desktopHeroHeight,
                  }
                : styles.heroMobile,
            ]}
          >
            {/* ================================================= 
                LOGO CAFU 
            ================================================= */}

            <View
              style={[
                styles.brandContainer,
                isDesktop ? styles.brandDesktop : styles.brandMobile,
              ]}
            >
              <View style={styles.brandCircle}>
                <Ionicons name="football" size={28} color="#071B12" />
              </View>

              <View style={styles.brandTextContainer}>
                <Text style={styles.brandText}>CAFU</Text>

                <Text style={styles.brandSubtitle}>TU CANCHA, TU MOMENTO</Text>
              </View>
            </View>

            {/* ================================================= 
                FUTBOLISTA 
            ================================================= */}

            <View
              pointerEvents="none"
              style={[
                styles.playerContainer,

                isDesktop
                  ? {
                      width: desktopPlayerWidth,
                      height: desktopPlayerHeight,

                      /*
                       * En computador lo llevamos
                       * claramente hacia la derecha.
                       */
                      right: width * 0.13,

                      top: desktopHeroHeight * 0.1,
                    }
                  : styles.playerMobile,
              ]}
            >
              <Image
                source={require("../../assets/images/logo 3 (1).png")}
                style={styles.playerImage}
                resizeMode="contain"
              />
            </View>

            {/* ================================================= 
                TEXTO PRINCIPAL 
            ================================================= */}

            <View
              style={[
                styles.heroText,

                isDesktop
                  ? {
                      top: desktopHeroHeight * 0.37,

                      /*
                       * El texto ocupa la zona izquierda.
                       */
                      width: Math.min(width * 0.36, 500),
                    }
                  : styles.heroTextMobile,
              ]}
            >
              <Text
                style={[
                  styles.welcomeText,
                  isDesktop && styles.welcomeTextDesktop,
                ]}
              >
                Bienvenido
              </Text>

              <Text
                style={[
                  styles.welcomeText,
                  isDesktop && styles.welcomeTextDesktop,
                ]}
              >
                a tu cancha,
              </Text>

              <Text
                style={[
                  styles.welcomeHighlight,
                  isDesktop && styles.welcomeHighlightDesktop,
                ]}
              >
                tu momento
              </Text>

              <Text
                style={[
                  styles.description,
                  isDesktop && styles.descriptionDesktop,
                ]}
              >
                {isDesktop
                  ? "Inicia sesión y reserva las mejores canchas al instante."
                  : "Inicia sesión y reserva las mejores canchas al instante."}
              </Text>
            </View>

            {/* ================================================= 
                PUNTOS 
            ================================================= */}

            <View
              style={[
                styles.dotsContainer,

                isDesktop ? styles.dotsDesktop : styles.dotsMobile,
              ]}
            >
              <View style={[styles.dot, styles.activeDot]} />

              <View style={styles.dot} />

              <View style={styles.dot} />

              <View style={styles.dot} />
            </View>
          </View>

          {/* ================================================= 
              FORMULARIO 
          ================================================= */}

          <View style={[styles.form, isDesktop && styles.formDesktop]}>
            {/* ================================================= 
                CORREO 
            ================================================= */}

            <View style={styles.inputSection}>
              <Text style={[styles.label, isDesktop && styles.labelDesktop]}>
                Correo electrónico
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  isDesktop && styles.inputContainerDesktop,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={21}
                  color="#8A9891"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#65736B"
                  value={correo}
                  onChangeText={setCorreo}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* ================================================= 
                CONTRASEÑA 
            ================================================= */}

            <View style={styles.inputSection}>
              <Text style={[styles.label, isDesktop && styles.labelDesktop]}>
                Contraseña
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  isDesktop && styles.inputContainerDesktop,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={21}
                  color="#8A9891"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#65736B"
                  value={contrasena}
                  onChangeText={setContrasena}
                  secureTextEntry={!mostrarContrasena}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  <Ionicons
                    name={mostrarContrasena ? "eye-outline" : "eye-off-outline"}
                    size={21}
                    color="#8A9891"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* ================================================= 
                OLVIDASTE CONTRASEÑA 
            ================================================= */}

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => {
                console.log("Olvidé mi contraseña");
              }}
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* ================================================= 
                BOTÓN 
            ================================================= */}

            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={iniciarSesion}
            >
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>

              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward" size={23} color="#071B12" />
              </View>
            </TouchableOpacity>

            {/* ================================================= 
                REGISTRO 
            ================================================= */}

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>

              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===================================================== 
   ESTILOS 
===================================================== */

const styles = StyleSheet.create({
  // =====================================================
  // FONDO
  // =====================================================

  safeArea: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  container: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  // =====================================================
  // BARRA SUPERIOR
  // =====================================================

  statusBar: {
    height: 34,

    paddingHorizontal: 20,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    zIndex: 100,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D2A1D",
  },

  statusTime: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  statusRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  // =====================================================
  // SCROLL
  // =====================================================

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 35,
  },

  scrollContentDesktop: {
    paddingHorizontal: 44,
    paddingBottom: 60,
  },

  // =====================================================
  // HERO
  // =====================================================

  hero: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },

  heroMobile: {
    height: 330,
  },

  // =====================================================
  // LOGO CAFU
  // =====================================================

  brandContainer: {
    position: "absolute",

    flexDirection: "row",

    alignItems: "center",

    zIndex: 20,
  },

  brandDesktop: {
    left: 84,
    top: 34,
  },

  brandMobile: {
    left: 8,
    top: 10,
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

  brandText: {
    color: "#FFFFFF",

    fontSize: 29,

    lineHeight: 29,

    fontWeight: "900",

    letterSpacing: -1,
  },

  brandSubtitle: {
    color: "#C8FF00",

    fontSize: 8,

    fontWeight: "900",

    marginTop: 2,

    letterSpacing: 0.15,
  },

  // =====================================================
  // FUTBOLISTA
  // =====================================================

  playerContainer: {
    position: "absolute",

    zIndex: 2,
  },

  playerMobile: {
    width: "72%",

    height: 275,

    right: -18,

    top: 25,
  },

  playerImage: {
    width: "100%",
    height: "100%",
  },

  // =====================================================
  // TEXTO HERO
  // =====================================================

  heroText: {
    position: "absolute",

    left: 0,

    zIndex: 10,
  },

  heroTextMobile: {
    top: 112,

    width: "60%",
  },

  welcomeText: {
    color: "#FFFFFF",

    fontSize: 28,

    lineHeight: 31,

    fontWeight: "900",

    letterSpacing: -0.6,
  },

  welcomeTextDesktop: {
    fontSize: 39,

    lineHeight: 43,

    letterSpacing: -1,
  },

  welcomeHighlight: {
    color: "#C8FF00",

    fontSize: 28,

    lineHeight: 31,

    fontWeight: "900",

    letterSpacing: -0.6,
  },

  welcomeHighlightDesktop: {
    fontSize: 39,

    lineHeight: 43,

    letterSpacing: -1,
  },

  description: {
    color: "#B7C2BC",

    fontSize: 12,

    lineHeight: 17,

    marginTop: 10,

    maxWidth: 230,
  },

  descriptionDesktop: {
    fontSize: 17,

    lineHeight: 25,

    marginTop: 15,

    maxWidth: 360,
  },

  // =====================================================
  // PUNTOS
  // =====================================================

  dotsContainer: {
    position: "absolute",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    zIndex: 20,
  },

  dotsMobile: {
    left: 0,
    right: 0,
    bottom: 13,
  },

  dotsDesktop: {
    left: 0,
    right: 0,
    bottom: 22,
  },

  dot: {
    width: 8,

    height: 8,

    borderRadius: 4,

    backgroundColor: "#65736B",

    marginHorizontal: 5,
  },

  activeDot: {
    width: 32,

    backgroundColor: "#C8FF00",
  },

  // =====================================================
  // FORMULARIO
  // =====================================================

  form: {
    width: "100%",
  },

  formDesktop: {
    width: "58%",

    maxWidth: 1050,

    alignSelf: "flex-start",

    marginTop: 5,
  },

  // =====================================================
  // INPUTS
  // =====================================================

  inputSection: {
    marginBottom: 15,
  },

  label: {
    color: "#FFFFFF",

    fontSize: 12,

    fontWeight: "800",

    marginBottom: 7,
  },

  labelDesktop: {
    fontSize: 16,

    marginBottom: 10,
  },

  inputContainer: {
    height: 51,

    borderWidth: 1,

    borderColor: "#274A38",

    borderRadius: 11,

    backgroundColor: "#0A2418",

    flexDirection: "row",

    alignItems: "center",
  },

  inputContainerDesktop: {
    height: 74,

    borderRadius: 15,
  },

  inputIcon: {
    marginLeft: 13,

    marginRight: 9,
  },

  input: {
    flex: 1,

    height: "100%",

    color: "#FFFFFF",

    fontSize: 12,

    paddingRight: 10,
  },

  eyeButton: {
    height: "100%",

    paddingHorizontal: 14,

    justifyContent: "center",

    alignItems: "center",
  },

  // =====================================================
  // OLVIDASTE
  // =====================================================

  forgotButton: {
    alignSelf: "flex-end",

    marginTop: -2,

    marginBottom: 18,
  },

  forgotText: {
    color: "#C8FF00",

    fontSize: 12,

    fontWeight: "800",
  },

  // =====================================================
  // BOTÓN
  // =====================================================

  loginButton: {
    height: 56,

    borderRadius: 13,

    backgroundColor: "#C8FF00",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    position: "relative",

    shadowColor: "#C8FF00",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.18,

    shadowRadius: 8,

    elevation: 4,
  },

  loginButtonText: {
    color: "#071B12",

    fontSize: 14,

    fontWeight: "900",

    textTransform: "none",
  },

  arrowContainer: {
    position: "absolute",

    right: 14,

    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    alignItems: "center",
  },

  // =====================================================
  // REGISTRO
  // =====================================================

  registerContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 24,

    marginBottom: 15,
  },

  registerText: {
    color: "#AEB9B3",

    fontSize: 11,
  },

  registerLink: {
    color: "#C8FF00",

    fontSize: 11,

    fontWeight: "900",

    marginLeft: 5,
  },
});
