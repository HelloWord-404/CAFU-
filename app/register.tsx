import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#071B12"
      />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* BOTÓN REGRESAR */}
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={27}
              color="#FFFFFF"
            />
          </Pressable>

          {/* LOGO */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoBall}>⚽</Text>

              <Text style={styles.logoText}>
                CAFU
              </Text>
            </View>

            <View style={styles.logoWords}>
              <Text style={styles.logoTitle}>
                CAFU
              </Text>

              <Text style={styles.logoSubtitle}>
                TU CANCHA, TU MOMENTO
              </Text>
            </View>
          </View>

          {/* TITULO */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Crea <Text style={styles.titleGreen}>tu cuenta</Text>
            </Text>

            <Text style={styles.title}>
              y comienza a jugar
            </Text>

            <Text style={styles.description}>
              Regístrate y accede a las mejores
            </Text>

            <Text style={styles.description}>
              canchas, promociones y más.
            </Text>
          </View>

          {/* INDICADORES */}
          <View style={styles.indicators}>
            <View style={styles.activeIndicator} />

            <View style={styles.indicator} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>

          {/* NOMBRE Y APELLIDO */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Ionicons
                name="person-outline"
                size={21}
                color="#A8B2AD"
              />

              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#A8B2AD"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <Ionicons
                name="person-outline"
                size={21}
                color="#A8B2AD"
              />

              <TextInput
                style={styles.input}
                placeholder="Apellido"
                placeholderTextColor="#A8B2AD"
              />
            </View>
          </View>

          {/* CORREO */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={21}
              color="#A8B2AD"
            />

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#A8B2AD"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* TELÉFONO */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={21}
              color="#A8B2AD"
            />

            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#A8B2AD"
              keyboardType="phone-pad"
            />
          </View>

          {/* CONTRASEÑA */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={21}
              color="#A8B2AD"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#A8B2AD"
              secureTextEntry={!showPassword}
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={21}
                color="#A8B2AD"
              />
            </Pressable>
          </View>

          {/* CONFIRMAR CONTRASEÑA */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={21}
              color="#A8B2AD"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#A8B2AD"
              secureTextEntry={!showConfirmPassword}
            />

            <Pressable
              onPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? 'eye-outline'
                    : 'eye-off-outline'
                }
                size={21}
                color="#A8B2AD"
              />
            </Pressable>
          </View>

          {/* TÉRMINOS */}
          <Pressable
            style={styles.termsContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[
                styles.checkbox,
                acceptedTerms && styles.checkboxActive,
              ]}
            >
              {acceptedTerms && (
                <Ionicons
                  name="checkmark"
                  size={17}
                  color="#071B12"
                />
              )}
            </View>

            <Text style={styles.termsText}>
              Acepto los{' '}
              <Text style={styles.termsLink}>
                Términos y Condiciones
              </Text>
              {'\n'}y la{' '}
              <Text style={styles.termsLink}>
                Política de Privacidad
              </Text>
            </Text>
          </Pressable>

          {/* CREAR CUENTA */}
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log('Crear cuenta')}
          >
            <Text style={styles.createButtonText}>
              Crear cuenta
            </Text>

            <Ionicons
              name="arrow-forward"
              size={25}
              color="#071B12"
            />
          </Pressable>

          {/* LOGIN */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              ¿Ya tienes una cuenta?{' '}
            </Text>

            <Pressable
              onPress={() => router.back()}
            >
              <Text style={styles.loginLink}>
                Inicia sesión
              </Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#071B12',
  },

  keyboard: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 10,
    paddingBottom: 35,
    backgroundColor: '#071B12',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 3,
  },

  /* LOGO */

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#C8FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoBall: {
    fontSize: 20,
    position: 'absolute',
    top: 1,
  },

  logoText: {
    color: '#071B12',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 18,
  },

  logoWords: {
    marginLeft: 10,
  },

  logoTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 1,
  },

  logoSubtitle: {
    color: '#C8FF00',
    fontSize: 8,
    fontWeight: '800',
    marginTop: -2,
  },

  /* TITULO */

  header: {
    marginBottom: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 29,
    lineHeight: 33,
    fontWeight: '800',
  },

  titleGreen: {
    color: '#C8FF00',
  },

  description: {
    color: '#B8C0BC',
    fontSize: 14,
    lineHeight: 20,
  },

  /* INDICADORES */

  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginBottom: 20,
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
    backgroundColor: '#9AA19D',
  },

  /* INPUTS */

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  inputContainer: {
    height: 55,
    borderWidth: 1,
    borderColor: '#29483B',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#0A2118',
  },

  halfInput: {
    flex: 1,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
    paddingVertical: 0,
  },

  /* TÉRMINOS */

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 20,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#738078',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: '#C8FF00',
    borderColor: '#C8FF00',
  },

  termsText: {
    flex: 1,
    color: '#D4D8D5',
    fontSize: 13,
    lineHeight: 20,
  },

  termsLink: {
    color: '#C8FF00',
    fontWeight: '800',
  },

  /* BOTÓN */

  createButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#C8FF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  createButtonText: {
    color: '#071B12',
    fontSize: 17,
    fontWeight: '900',
    marginRight: 20,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  /* LOGIN */

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#A8B2AD',
    fontSize: 13,
  },

  loginLink: {
    color: '#C8FF00',
    fontSize: 13,
    fontWeight: '800',
  },
});