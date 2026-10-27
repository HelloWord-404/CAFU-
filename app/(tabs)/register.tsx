import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
import { registerUser } from "../../src/services/authService";

//import { probarConexion } from "../../src/lib/supabase";
export default function RegisterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 700;
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const handleRegister = async () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      Alert.alert(
        "Contraseña insegura",
        "La contraseña debe tener al menos 8 caracteres.",
      );
      return;
    }
    if (!acceptedTerms) {
      Alert.alert(
        "Términos y condiciones",
        "Debes aceptar los términos y la política de privacidad.",
      );
      return;
    }
    try {
      setLoading(true);
      const result = await registerUser({
        nombre,
        apellido,
        correo,
        telefono,
        password,
      });
      if (result.session) {
        Alert.alert(
          "¡Registro exitoso!",
          "Tu cuenta ha sido creada correctamente.",
          [
            {
              text: "Continuar",
              onPress: () => router.replace("/(tabs)/profile"),
            },
          ],
        );
      } else {
        Alert.alert(
          "Revisa tu correo",
          "Tu solicitud de registro fue enviada. Si Supabase requiere confirmar tu correo, revisa tu bandeja de entrada.",
        );
      }
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "No fue posible crear la cuenta.";
      Alert.alert("No se pudo registrar", mensaje);
    } finally {
      setLoading(false);
    }
  };
  const handleTestConnection = async () => {
    try {
      setTestingConnection(true);
      //await probarConexion();
      Alert.alert(
        "Prueba finalizada",
        "Se ejecutó la prueba. Revisa la terminal de VS Code para ver el resultado de Supabase.",
      );
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "No se pudo probar la conexión.";
      Alert.alert("Error de conexión", mensaje);
    } finally {
      setTestingConnection(false);
    }
  };
  const renderInput = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (value: string) => void,
    icon: keyof typeof Ionicons.glyphMap,
    options?: {
      keyboardType?: "default" | "email-address" | "phone-pad";
      secureTextEntry?: boolean;
      autoCapitalize?: "none" | "sentences" | "words" | "characters";
      rightAction?: () => void;
      rightIcon?: keyof typeof Ionicons.glyphMap;
    },
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name={icon}
          size={20}
          color="#91A49A"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#77877E"
          value={value}
          onChangeText={onChangeText}
          keyboardType={options?.keyboardType ?? "default"}
          secureTextEntry={options?.secureTextEntry ?? false}
          autoCapitalize={options?.autoCapitalize ?? "words"}
          autoCorrect={false}
        />
        {options?.rightAction && options?.rightIcon && (
          <Pressable
            onPress={options.rightAction}
            style={styles.passwordToggle}
            accessibilityRole="button"
            accessibilityLabel="Mostrar u ocultar contraseña"
          >
            <Ionicons name={options.rightIcon} size={20} color="#91A49A" />
          </Pressable>
        )}
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071B12" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isDesktop && styles.desktopScrollContent,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.mainContainer,
              isDesktop && styles.desktopMainContainer,
            ]}
          >
            {isDesktop && (
              <View style={styles.heroPanel}>
                <View style={styles.logoContainer}>
                  <View style={styles.logoIcon}>
                    <Ionicons name="football" size={30} color="#071B12" />
                  </View>
                  <Text style={styles.logoText}>CAFU</Text>
                </View>
                <Text style={styles.heroTitle}>
                  EL JUEGO{"\n"}
                  <Text style={styles.heroTitleAccent}>COMIENZA</Text>
                  {"\n"}AQUÍ
                </Text>
                <Text style={styles.heroDescription}>
                  Encuentra tu cancha, reúne a tu equipo y vive la pasión por el
                  fútbol.
                </Text>
                <View style={styles.heroImageContainer}>
                  <Image
                    source={require("../../assets/images/balon sin fondo.png")}
                    style={styles.heroImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.heroBottom}>
                  <Ionicons name="checkmark-circle" size={20} color="#C8FF00" />
                  <Text style={styles.heroBottomText}>
                    Tu próximo partido empieza con CAFU
                  </Text>
                </View>
              </View>
            )}
            <View
              style={[styles.formPanel, isDesktop && styles.desktopFormPanel]}
            >
              {!isDesktop && (
                <View style={styles.mobileLogoContainer}>
                  <View style={styles.logoIcon}>
                    <Ionicons name="football" size={26} color="#071B12" />
                  </View>
                  <Text style={styles.logoText}>CAFU</Text>
                </View>
              )}
              <View style={styles.formHeader}>
                <Text style={styles.eyebrow}>ÚNETE A LA COMUNIDAD</Text>
                <Text style={styles.title}>Crea tu cuenta</Text>
                <Text style={styles.subtitle}>
                  Regístrate y prepárate para tu próximo partido.
                </Text>
              </View>
              <View style={styles.fieldsContainer}>
                <View style={styles.twoColumns}>
                  <View
                    style={[
                      styles.columnField,
                      !isDesktop && styles.mobileColumnField,
                    ]}
                  >
                    {renderInput(
                      "Nombre",
                      "Tu nombre",
                      nombre,
                      setNombre,
                      "person-outline",
                    )}
                  </View>
                  <View
                    style={[
                      styles.columnField,
                      !isDesktop && styles.mobileColumnField,
                    ]}
                  >
                    {renderInput(
                      "Apellido",
                      "Tu apellido",
                      apellido,
                      setApellido,
                      "person-outline",
                    )}
                  </View>
                </View>
                {renderInput(
                  "Correo electrónico",
                  "ejemplo@correo.com",
                  correo,
                  setCorreo,
                  "mail-outline",
                  {
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                  },
                )}
                {renderInput(
                  "Teléfono",
                  "Tu número de contacto",
                  telefono,
                  setTelefono,
                  "call-outline",
                  { keyboardType: "phone-pad" },
                )}
                {renderInput(
                  "Contraseña",
                  "Mínimo 8 caracteres",
                  password,
                  setPassword,
                  "lock-closed-outline",
                  {
                    autoCapitalize: "none",
                    secureTextEntry: !showPassword,
                    rightAction: () => setShowPassword(!showPassword),
                    rightIcon: showPassword ? "eye-off-outline" : "eye-outline",
                  },
                )}
                {renderInput(
                  "Confirmar contraseña",
                  "Repite tu contraseña",
                  confirmPassword,
                  setConfirmPassword,
                  "shield-checkmark-outline",
                  {
                    autoCapitalize: "none",
                    secureTextEntry: !showConfirmPassword,
                    rightAction: () =>
                      setShowConfirmPassword(!showConfirmPassword),
                    rightIcon: showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline",
                  },
                )}
              </View>
              <Pressable
                style={styles.termsRow}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: acceptedTerms }}
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
                  Acepto los términos y condiciones y la política de privacidad.
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.createButton,
                  pressed && !loading && styles.buttonPressed,
                  loading && styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={loading}
                accessibilityRole="button"
              >
                <Text style={styles.createButtonText}>
                  {loading ? "Creando cuenta..." : "Crear cuenta"}
                </Text>
                {loading ? (
                  <Ionicons
                    name="hourglass-outline"
                    size={21}
                    color="#071B12"
                  />
                ) : (
                  <View style={styles.arrowCircle}>
                    <Ionicons name="arrow-forward" size={21} color="#071B12" />
                  </View>
                )}
              </Pressable>
              <View style={styles.loginRow}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.loginLink}> Inicia sesión</Text>
                </Pressable>
              </View>
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>CAFU</Text>
                <View style={styles.dividerLine} />
              </View>
              <Pressable
                style={styles.testButton}
                onPress={handleTestConnection}
                disabled={testingConnection}
              >
                <Ionicons name="cloud-done-outline" size={18} color="#C8FF00" />
                <Text style={styles.testButtonText}>
                  {testingConnection
                    ? "Probando conexión..."
                    : "Probar conexión con Supabase"}
                </Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.footerText}>
            CAFU · Juega, comparte y disfruta.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071B12",
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  desktopScrollContent: {
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  mainContainer: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#0D2419",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#213D2D",
    overflow: "hidden",
  },
  desktopMainContainer: {
    maxWidth: 1120,
    flexDirection: "row",
    alignItems: "stretch",
  },
  heroPanel: {
    flex: 1,
    minHeight: 700,
    backgroundColor: "#102D1E",
    paddingHorizontal: 38,
    paddingVertical: 38,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mobileLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#C8FF00",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: 3,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 43,
    lineHeight: 51,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 45,
  },
  heroTitleAccent: {
    color: "#C8FF00",
  },
  heroDescription: {
    color: "#C0CEC4",
    fontSize: 16,
    lineHeight: 25,
    marginTop: 18,
    maxWidth: 330,
  },
  heroImageContainer: {
    flex: 1,
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
  },
  heroImage: {
    width: "100%",
    height: 280,
  },
  heroBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 20,
  },
  heroBottomText: {
    color: "#D7E1D9",
    fontSize: 13,
    flexShrink: 1,
  },
  formPanel: {
    paddingHorizontal: 26,
    paddingVertical: 30,
    backgroundColor: "#0D2419",
  },
  desktopFormPanel: {
    width: 520,
    paddingHorizontal: 42,
    paddingVertical: 42,
    justifyContent: "center",
  },
  formHeader: {
    marginBottom: 25,
  },
  eyebrow: {
    color: "#C8FF00",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "800",
    marginBottom: 9,
  },
  subtitle: {
    color: "#A6B8AC",
    fontSize: 14,
    lineHeight: 21,
  },
  fieldsContainer: {
    gap: 15,
  },
  twoColumns: {
    flexDirection: "row",
    gap: 12,
  },
  columnField: {
    flex: 1,
    minWidth: 0,
  },
  mobileColumnField: {
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 1,
  },
  inputLabel: {
    color: "#E5EEE7",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 51,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#294635",
    backgroundColor: "#091B12",
    paddingHorizontal: 13,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 13,
    outlineStyle: "none",
  } as any,
  passwordToggle: {
    padding: 5,
    marginLeft: 4,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 22,
    gap: 10,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#66816F",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#C8FF00",
    borderColor: "#C8FF00",
  },
  termsText: {
    flex: 1,
    color: "#A6B8AC",
    fontSize: 12,
    lineHeight: 19,
  },
  createButton: {
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: "#C8FF00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 22,
    paddingRight: 8,
  },
  createButtonText: {
    color: "#071B12",
    fontSize: 16,
    fontWeight: "800",
  },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#E3FF80",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 23,
  },
  loginText: {
    color: "#A6B8AC",
    fontSize: 13,
  },
  loginLink: {
    color: "#C8FF00",
    fontSize: 13,
    fontWeight: "800",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 27,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#294635",
  },
  dividerText: {
    color: "#758A7B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },
  testButton: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: "#294635",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 12,
  },
  testButtonText: {
    color: "#C8FF00",
    fontSize: 12,
    fontWeight: "600",
  },
  footerText: {
    color: "#718578",
    fontSize: 11,
    textAlign: "center",
    marginTop: 20,
  },
});
