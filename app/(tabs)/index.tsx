import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#071B12"
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* Hora / encabezado */}
        <View style={styles.topBar}>
          <Text style={styles.time}>9:41</Text>

          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={14} color="#FFFFFF" />
            <Ionicons name="wifi" size={14} color="#FFFFFF" />
            <Ionicons name="battery-full" size={18} color="#FFFFFF" />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.welcome}>
          BIENVENIDO A CAFU
        </Text>

        {/* Frase principal */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            ¡Tu Cancha a un
          </Text>

          <Text style={styles.title}>
            Clic de Distancia!
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Gestiona, reserva y vive tu pasión de
        </Text>

        <Text style={styles.subtitle}>
          forma inteligente.
        </Text>

        {/* Logo CAFU */}
        <View style={styles.logoSection}>

          <View style={styles.logoGlow}>
            <View style={styles.logoCircle}>

              <Text style={styles.logoBall}>⚽</Text>

              <Text style={styles.logoText}>
                CAFU
              </Text>

              <Text style={styles.logoSubtitle}>
                PASIÓN Y GESTIÓN
              </Text>

            </View>
          </View>

          {/* Silueta decorativa */}
          <View style={styles.playerContainer}>
            <Ionicons
              name="football"
              size={28}
              color="#C8FF00"
            />

            <View style={styles.playerLine} />
          </View>

        </View>

        {/* REGISTRO */}
        <Pressable
          style={({ pressed }) => [
            styles.registerButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerText}>
            【 👤 REGÍSTRATE GRATIS 】
          </Text>

          <Text style={styles.registerSubtext}>
            Crea tu cuenta para reservar canchas
          </Text>
        </Pressable>

        {/* INICIAR SESIÓN */}
        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => console.log('Iniciar sesión')}
        >
          <View style={styles.buttonRow}>
            <Ionicons
              name="log-in-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.loginText}>
              INICIAR SESIÓN
            </Text>

            <Ionicons
              name="lock-closed-outline"
              size={16}
              color="#666666"
            />
          </View>

          <Text style={styles.loginSubtext}>
            ¿Ya tienes cuenta? Ingresa
          </Text>
        </Pressable>

        {/* ACCEDER SIN CUENTA */}
        <Pressable
          style={({ pressed }) => [
            styles.guestButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => console.log('Acceder sin cuenta')}
        >
          <View style={styles.buttonRow}>
            <Ionicons
              name="globe-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.guestText}>
              ACCEDER SIN CUENTA
            </Text>
          </View>

          <Text style={styles.guestSubtext}>
            Explora canchas como invitado
          </Text>

          <Text style={styles.guestSubtext}>
            (funcionalidad limitada)
          </Text>
        </Pressable>

        {/* Información inferior */}
        <View style={styles.bottomInfo}>

          <Text style={styles.question}>
            ¿Eres dueño de una cancha?{' '}
            <Text style={styles.link}>
              Regístrate como administrador
            </Text>
          </Text>

          <Text style={styles.terms}>
            Al continuar, aceptas nuestros{' '}
            <Text style={styles.termsLink}>
              Términos de Servicio
            </Text>
            {' '}y
          </Text>

          <Text style={styles.terms}>
            <Text style={styles.termsLink}>
              Política de Privacidad.
            </Text>
          </Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#071B12',
  },

  container: {
    flexGrow: 1,
    minHeight: '100%',
    paddingHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: '#071B12',
  },

  /* -------------------------
     BARRA SUPERIOR
  ------------------------- */

  topBar: {
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  time: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  /* -------------------------
     TITULOS
  ------------------------- */

  welcome: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
    letterSpacing: 0.2,
  },

  titleContainer: {
    alignItems: 'center',
    marginTop: 7,
  },

  title: {
    color: '#C8FF00',
    fontSize: 20,
    lineHeight: 21,
    fontWeight: '900',
    textAlign: 'center',
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 11,
  },

  /* -------------------------
     LOGO
  ------------------------- */

  logoSection: {
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  logoGlow: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: '#C8FF00',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#C8FF00',
    shadowOpacity: 0.9,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 15,
  },

  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#C8FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoBall: {
    fontSize: 25,
    position: 'absolute',
    top: 3,
  },

  logoText: {
    color: '#071B12',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 20,
  },

  logoSubtitle: {
    color: '#071B12',
    fontSize: 5,
    fontWeight: '800',
    marginTop: -2,
  },

  playerContainer: {
    position: 'absolute',
    right: 55,
    top: 42,
    width: 50,
    height: 50,
    alignItems: 'center',
  },

  playerLine: {
    width: 30,
    height: 3,
    backgroundColor: '#C8FF00',
    marginTop: 5,
    borderRadius: 5,
  },

  /* -------------------------
     BOTONES
  ------------------------- */

  registerButton: {
    backgroundColor: '#C8FF00',
    borderRadius: 6,
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    marginHorizontal: 0,
    paddingVertical: 5,
  },

  registerText: {
    color: '#071B12',
    fontSize: 11,
    fontWeight: '900',
  },

  registerSubtext: {
    color: '#071B12',
    fontSize: 8,
    marginTop: 1,
  },

  loginButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#34453D',
    borderRadius: 6,
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    paddingVertical: 4,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  loginSubtext: {
    color: '#FFFFFF',
    fontSize: 7,
    marginTop: 2,
  },

  guestButton: {
    backgroundColor: '#14914E',
    borderRadius: 6,
    minHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    paddingVertical: 5,
  },

  guestText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  guestSubtext: {
    color: '#FFFFFF',
    fontSize: 7,
    marginTop: 1,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  /* -------------------------
     INFORMACIÓN INFERIOR
  ------------------------- */

  bottomInfo: {
    marginTop: 12,
    alignItems: 'center',
  },

  question: {
    color: '#FFFFFF',
    fontSize: 7,
    textAlign: 'center',
  },

  link: {
    color: '#C8FF00',
    fontWeight: '700',
  },

  terms: {
    color: '#AAAAAA',
    fontSize: 6,
    textAlign: 'center',
    marginTop: 3,
  },

  termsLink: {
    color: '#C8FF00',
  },
});