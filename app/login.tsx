import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const iniciarSesion = () => {
    // Por ahora solo mostramos que el botón funciona.
    // Más adelante conectaremos esto con el backend.
    console.log('Correo:', correo);
    console.log('Contraseña:', contrasena);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* =========================
              ENCABEZADO / LOGO
          ========================== */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Ionicons name="football" size={34} color="#071B12" />
            </View>

            <View>
              <Text style={styles.logoText}>CAFU</Text>
              <Text style={styles.logoSubtitle}>
                TU CANCHA TU MOMENTO
              </Text>
            </View>
          </View>

          {/* =========================
              IMAGEN / ILUSTRACIÓN
          ========================== */}
          <View style={styles.imageContainer}>

            {/* Jugador decorativo */}
            <View style={styles.playerPlaceholder}>
              <Ionicons
                name="football-outline"
                size={90}
                color="#BFFF00"
              />
            </View>

            {/* Efecto verde */}
            <View style={styles.greenEffect1} />
            <View style={styles.greenEffect2} />

          </View>

          {/* =========================
              TEXTO PRINCIPAL
          ========================== */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Bienvenido
            </Text>

            <Text style={styles.welcomeText}>
              a tu cancha,
            </Text>

            <Text style={styles.welcomeHighlight}>
              tu momento
            </Text>

            <Text style={styles.description}>
              Inicia sesión y reserva{'\n'}
              las mejores canchas{'\n'}
              al instante.
            </Text>
          </View>

          {/* =========================
              INDICADORES
          ========================== */}
          <View style={styles.indicators}>
            <View style={styles.activeIndicator} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>

          {/* =========================
              CORREO
          ========================== */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>
              Correo electrónico
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={23}
                color="#7C8A82"
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="ejemplo@correo.com"
                placeholderTextColor="#7C8A82"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* =========================
              CONTRASEÑA
          ========================== */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>
              Contraseña
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={23}
                color="#7C8A82"
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#7C8A82"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry={!mostrarContrasena}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() =>
                  setMostrarContrasena(!mostrarContrasena)
                }
                style={styles.eyeButton}
              >
                <Ionicons
                  name={
                    mostrarContrasena
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={23}
                  color="#7C8A82"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* =========================
              OLVIDASTE CONTRASEÑA
          ========================== */}
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => {
              console.log('Olvidé mi contraseña');
            }}
          >
            <Text style={styles.forgotText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* =========================
              BOTÓN INICIAR SESIÓN
          ========================== */}
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={iniciarSesion}
          >
            <Text style={styles.loginButtonText}>
              Iniciar sesión
            </Text>

            <View style={styles.arrowContainer}>
              <Ionicons
                name="arrow-forward"
                size={25}
                color="#071B12"
              />
            </View>
          </TouchableOpacity>

          {/* =========================
              SEPARADOR
          ========================== */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              o continúa con
            </Text>

            <View style={styles.divider} />
          </View>

          {/* =========================
              REDES SOCIALES
          ========================== */}
          <View style={styles.socialContainer}>

            {/* Google */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => console.log('Google')}
            >
              <Text style={styles.googleText}>G</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => console.log('Apple')}
            >
              <Ionicons
                name="logo-apple"
                size={28}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => console.log('Facebook')}
            >
              <Ionicons
                name="logo-facebook"
                size={28}
                color="#FFFFFF"
              />
            </TouchableOpacity>

          </View>

          {/* =========================
              REGISTRO
          ========================== */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              ¿No tienes cuenta?
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerLink}>
                Regístrate
              </Text>
            </TouchableOpacity>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#071B12',
  },

  container: {
    flex: 1,
    backgroundColor: '#071B12',
  },

  scrollContent: {
    paddingHorizontal: 17,
    paddingBottom: 35,
  },

  /* LOGO */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },

  logoCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#C8FF00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: 1,
  },

  logoSubtitle: {
    color: '#C8FF00',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: -2,
  },

  /* IMAGEN */

  imageContainer: {
    height: 175,
    marginTop: 2,
    marginBottom: 2,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  playerPlaceholder: {
    width: 155,
    height: 155,
    borderRadius: 80,
    backgroundColor: '#102C1D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    zIndex: 3,
  },

  greenEffect1: {
    position: 'absolute',
    width: 230,
    height: 75,
    backgroundColor: '#BFFF00',
    opacity: 0.12,
    transform: [
      { rotate: '-28deg' },
    ],
    right: -50,
    bottom: 20,
  },

  greenEffect2: {
    position: 'absolute',
    width: 190,
    height: 55,
    backgroundColor: '#BFFF00',
    opacity: 0.09,
    transform: [
      { rotate: '-18deg' },
    ],
    right: -30,
    bottom: 45,
  },

  /* TEXTO */

  welcomeContainer: {
    marginTop: 2,
  },

  welcomeText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 31,
  },

  welcomeHighlight: {
    color: '#C8FF00',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 31,
  },

  description: {
    color: '#D0D7D3',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },

  /* INDICADORES */

  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 23,
    gap: 8,
  },

  activeIndicator: {
    width: 22,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#C8FF00',
  },

  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#65736B',
  },

  /* INPUTS */

  inputSection: {
    marginBottom: 15,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputContainer: {
    height: 51,
    borderWidth: 1.5,
    borderColor: '#274A38',
    borderRadius: 11,
    backgroundColor: '#0A2418',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputIcon: {
    marginLeft: 13,
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 14,
    paddingRight: 10,
  },

  eyeButton: {
    paddingHorizontal: 13,
    height: '100%',
    justifyContent: 'center',
  },

  /* OLVIDASTE CONTRASEÑA */

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -3,
    marginBottom: 17,
  },

  forgotText: {
    color: '#C8FF00',
    fontSize: 13,
    fontWeight: '700',
  },

  /* LOGIN */

  loginButton: {
    height: 52,
    borderRadius: 11,
    backgroundColor: '#C8FF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  loginButtonText: {
    color: '#071B12',
    fontSize: 16,
    fontWeight: '800',
  },

  arrowContainer: {
    position: 'absolute',
    right: 16,
  },

  /* SEPARADOR */

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#274A38',
  },

  dividerText: {
    color: '#AAB5AF',
    fontSize: 12,
    marginHorizontal: 12,
  },

  /* REDES */

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },

  socialButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0D2A1D',
    borderWidth: 1,
    borderColor: '#163B28',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  /* REGISTRO */

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#C6CEC9',
    fontSize: 13,
  },

  registerLink: {
    color: '#C8FF00',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 5,
  },
});