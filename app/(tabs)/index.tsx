import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  // Ancho máximo del contenido.
  // En celulares ocupa casi todo el ancho.
  // En pantallas grandes no se estira demasiado.
  const contentWidth = Math.min(width - 24, 390);

  // Escala relativa para diferentes celulares
  const scale = Math.min(Math.max(width / 390, 0.88), 1.08);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071B12" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.container,
          {
            minHeight: height,
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
          {/* =========================
              HEADER
          ========================== */}

          <View style={styles.topBar}>
            <Text style={styles.time}>9:41</Text>

            <View style={styles.statusIcons}>
              <Ionicons name="cellular" size={13} color="#FFFFFF" />

              <Ionicons name="wifi" size={13} color="#FFFFFF" />

              <Ionicons name="battery-full" size={17} color="#FFFFFF" />
            </View>
          </View>

          {/* =========================
              TITULO
          ========================== */}

          <Text style={styles.welcome}>BIENVENIDO A CAFU</Text>

          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: 23 * scale,
                  lineHeight: 24 * scale,
                },
              ]}
            >
              ¡Tu Cancha a un
            </Text>

            <Text
              style={[
                styles.title,
                {
                  fontSize: 23 * scale,
                  lineHeight: 24 * scale,
                },
              ]}
            >
              Clic de Distancia!
            </Text>
          </View>

          <Text style={styles.subtitle}>
            Gestiona, reserva y vive tu pasión de
          </Text>

          <Text style={styles.subtitle}>forma inteligente.</Text>

          {/* =========================
              LOGO / JUGADOR
          ========================== */}

          <View style={styles.logoArea}>
            {/* LOGO CAFU - ATRÁS */}
            <View style={styles.logoWrapper}>
              <View style={styles.outerCircle}>
                <View style={styles.logoGlow}>
                  <Image
                    source={require("../../assets/images/logo 2.png")}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />

                  <Text style={styles.subtitleLogos}>PASIÓN Y GESTIÓN</Text>
                </View>
              </View>
            </View>

            {/* JUGADOR - ADELANTE */}
            <Image
              source={require("../../assets/images/logo(1).png")}
              style={styles.playerImage}
              resizeMode="contain"
            />
          </View>

          {/* =========================
              REGISTRARSE
          ========================== */}

          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log("Registro")}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonTitleRow}>
                <Ionicons name="person" size={15} color="#071B12" />

                <Text style={styles.registerText}>REGÍSTRATE GRATIS</Text>
              </View>

              <Text style={styles.registerSubtext}>
                Crea tu cuenta para reservar canchas
              </Text>
            </View>
          </Pressable>

          {/* =========================
              INICIAR SESIÓN
          ========================== */}

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log("Iniciar sesión")}
          >
            <View style={styles.buttonTitleRow}>
              <Ionicons name="mail-outline" size={16} color="#FFFFFF" />

              <Text style={styles.loginText}>INICIAR SESIÓN</Text>

              <Ionicons name="lock-closed-outline" size={14} color="#777777" />
            </View>

            <Text style={styles.loginSubtext}>¿Ya tienes cuenta? Ingresa</Text>
          </Pressable>

          {/* =========================
              INVITADO
          ========================== */}

          <Pressable
            style={({ pressed }) => [
              styles.guestButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log("Acceder sin cuenta")}
          >
            <View style={styles.buttonTitleRow}>
              <Ionicons name="globe-outline" size={16} color="#FFFFFF" />

              <Text style={styles.guestText}>ACCEDER SIN CUENTA</Text>
            </View>

            <Text style={styles.guestSubtext}>
              Explora canchas como invitado
            </Text>

            <Text style={styles.guestSubtext}>(funcionalidad limitada)</Text>
          </Pressable>

          {/* =========================
              EXPLORAR
          ========================== */}

          <Pressable
            style={({ pressed }) => [
              styles.exploreButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log("Explorar")}
          >
            <View style={styles.exploreIcon}>
              <Ionicons name="map-outline" size={20} color="#FFFFFF" />
            </View>

            <View style={styles.exploreTextContainer}>
              <Text style={styles.exploreTitle}>EXPLORAR CANCHAS Y MAPA</Text>

              <Text style={styles.exploreSubtext}>
                Conoce las canchas de tu área
              </Text>
            </View>
          </Pressable>

          {/* =========================
              INFORMACIÓN
          ========================== */}

          <View style={styles.bottomInfo}>
            <Text style={styles.question}>
              ¿Eres dueño de una cancha?{" "}
              <Text style={styles.link}>Regístrate como administrador</Text>
            </Text>

            <Text style={styles.terms}>
              Al continuar, aceptas nuestros{" "}
              <Text style={styles.termsLink}>Términos de Servicio</Text> y
            </Text>

            <Text style={styles.terms}>
              <Text style={styles.termsLink}>Política de Privacidad.</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* =========================
     PANTALLA
  ========================== */

  safeArea: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  scroll: {
    flex: 1,
    backgroundColor: "#071B12",
  },

  container: {
    alignItems: "center",
    backgroundColor: "#071B12",
    paddingBottom: 20,
  },

  content: {
    alignItems: "stretch",
    paddingHorizontal: 0,
  },

  /* =========================
     HEADER
  ========================== */

  topBar: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  time: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  /* =========================
     TITULOS
  ========================== */

  welcome: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },

  titleContainer: {
    alignItems: "center",
    marginTop: 8,
  },

  title: {
    color: "#C8FF00",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 20,
    textAlign: "center",
  },

  subtitleLogo: {
    color: "#0b1f14",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 11,
    verticalAlign: "top",
    textAlign: "center",
  },
  /* =========================
   LOGO
========================== */

  logoArea: {
    width: "100%",
    height: "80%",

    position: "relative",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 0,
    marginBottom: 0,

    overflow: "visible",
  },

  /* =========================
   JUGADOR - DELANTE
========================== */

  playerImage: {
    position: "absolute",

    width: 215,
    height: 200,

    /*
     * Mueve el jugador hacia la derecha
     * para que se superponga al círculo.
     */
    transform: [
      {
        translateX: 100,
      },
    ],

    opacity: 1,

    zIndex: 20,
    elevation: 20,
  },

  /* =========================
   LOGO CAFU - ATRÁS
========================== */

  logoWrapper: {
    position: "absolute",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 5,
    elevation: 5,
  },

  logoGlow: {
    width: 170,
    height: 170,

    borderRadius: 100,

    backgroundColor: "#C8FF00",

    borderWidth: 2,
    borderColor: "#C8FF00",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#C8FF00",
    shadowOpacity: 0.95,
    shadowRadius: 22,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 18,
  },
  outerCircle: {
    width: 200,
    height: 200,

    borderRadius: 100,

    borderWidth: 2,
    borderColor: "#C8FF00",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "transparent",

    shadowColor: "#C8FF00",
    shadowOpacity: 0.75,
    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 15,

    zIndex: 5,
  },

  logoImage: {
    width: "100%",
    height: "100%",
    marginTop: -30,

    borderWidth: 0,
    borderColor: "#C8FF00",

    borderRadius: 56,
  },

  /* =========================
   TEXTO DEL LOGO
========================== */

  subtitleLogos: {
    position: "absolute",

    bottom: 25,

    color: "#071B12",

    fontSize: 13,
    fontWeight: "800",

    textAlign: "center",
  },

  /* =========================
     BOTONES
  ========================== */

  registerButton: {
    width: "100%",
    minHeight: 49,

    backgroundColor: "#C8FF00",

    borderRadius: 7,

    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 6,
    paddingHorizontal: 10,

    marginTop: 2,
  },

  loginButton: {
    width: "100%",
    minHeight: 49,

    backgroundColor: "#171717",

    borderWidth: 1,
    borderColor: "#35453D",

    borderRadius: 7,

    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 5,
    paddingHorizontal: 10,

    marginTop: 7,
  },

  guestButton: {
    width: "100%",
    minHeight: 53,

    backgroundColor: "#159A52",

    borderRadius: 7,

    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 6,
    paddingHorizontal: 10,

    marginTop: 7,
  },

  exploreButton: {
    width: "100%",
    minHeight: 51,

    backgroundColor: "#071B12",

    borderWidth: 1,
    borderColor: "#273E34",

    borderRadius: 7,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,

    marginTop: 7,
  },

  buttonTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  registerText: {
    color: "#071B12",
    fontSize: 11,
    fontWeight: "900",
  },

  registerSubtext: {
    color: "#071B12",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  loginSubtext: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "bold",
    marginTop: 2,
  },

  guestText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  guestSubtext: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "bold",
    marginTop: 1,
  },

  buttonPressed: {
    opacity: 0.78,
    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  /* =========================
     EXPLORAR
  ========================== */

  exploreIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,

    backgroundColor: "#1B2D25",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  exploreTextContainer: {
    flex: 1,
    alignItems: "flex-start",
  },

  exploreTitle: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  exploreSubtext: {
    color: "#FFFFFF",
    fontSize: 7,
    marginTop: 1,
  },

  /* =========================
     INFORMACIÓN
  ========================== */

  bottomInfo: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 5,
  },

  question: {
    color: "#FFFFFF",
    fontSize: 7,
    lineHeight: 10,
    textAlign: "center",
  },

  link: {
    color: "#C8FF00",
    fontWeight: "700",
  },

  terms: {
    color: "#AAAAAA",
    fontSize: 6,
    lineHeight: 9,
    textAlign: "center",
    marginTop: 3,
  },

  termsLink: {
    color: "#C8FF00",
  },
});
