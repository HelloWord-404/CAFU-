import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

/* =========================================================
   COLORES
========================================================= */

const COLORS = {
  background: "#061B12",
  card: "#0C291A",
  cardLight: "#123321",
  primary: "#C8FF00",
  primaryDark: "#AEE000",
  white: "#FFFFFF",
  gray: "#A5AEA9",
  darkGray: "#65736C",
  border: "#1C392B",
  black: "#07110D",
};

type PaymentMethodType = "card" | "nequi" | "daviplata" | "pse";

/* =========================================================
   PANTALLA MÉTODO DE PAGO
========================================================= */

export default function PaymentScreen(): React.JSX.Element {
  const router = useRouter();

  // Estados de la pantalla
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("card");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("Juan Pérez");

  const totalAmount = "$ 120.000";

  const handlePay = () => {
    console.log("Procesando pago con método:", selectedMethod);
    router.push("/(tabs)/booking-success");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* HEADER SUPERIOR */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={10}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </Pressable>

        <Text style={styles.headerTitle}>Método de pago</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOTAL A PAGAR */}
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total a pagar</Text>
          <Text style={styles.amountValue}>{totalAmount}</Text>
        </View>

        {/* LISTA DE MÉTODOS DE PAGO */}
        <View style={styles.methodsCard}>
          {/* Tarjeta de crédito / débito */}
          <Pressable
            style={styles.methodRow}
            onPress={() => setSelectedMethod("card")}
          >
            <View style={styles.methodLeft}>
              <View
                style={[
                  styles.methodIconBox,
                  { backgroundColor: COLORS.cardLight },
                ]}
              >
                <Ionicons name="card" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.methodText}>Tarjeta de crédito / débito</Text>
            </View>
            {selectedMethod === "card" && (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.primary}
              />
            )}
          </Pressable>

          <View style={styles.divider} />

          {/* Nequi */}
          <Pressable
            style={styles.methodRow}
            onPress={() => setSelectedMethod("nequi")}
          >
            <View style={styles.methodLeft}>
              <View
                style={[styles.methodIconBox, { backgroundColor: "#230A2E" }]}
              >
                <Ionicons name="wallet-outline" size={20} color="#E23378" />
              </View>
              <Text style={styles.methodText}>Nequi</Text>
            </View>
            {selectedMethod === "nequi" ? (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.primary}
              />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.darkGray}
              />
            )}
          </Pressable>

          <View style={styles.divider} />

          {/* Daviplata */}
          <Pressable
            style={styles.methodRow}
            onPress={() => setSelectedMethod("daviplata")}
          >
            <View style={styles.methodLeft}>
              <View
                style={[styles.methodIconBox, { backgroundColor: "#3B0A0A" }]}
              >
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color="#ED1C24"
                />
              </View>
              <Text style={styles.methodText}>Daviplata</Text>
            </View>
            {selectedMethod === "daviplata" ? (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.primary}
              />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.darkGray}
              />
            )}
          </Pressable>

          <View style={styles.divider} />

          {/* PSE */}
          <Pressable
            style={styles.methodRow}
            onPress={() => setSelectedMethod("pse")}
          >
            <View style={styles.methodLeft}>
              <View
                style={[styles.methodIconBox, { backgroundColor: "#0A1F3B" }]}
              >
                <Ionicons name="globe-outline" size={20} color="#2196F3" />
              </View>
              <Text style={styles.methodText}>PSE</Text>
            </View>
            {selectedMethod === "pse" ? (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.primary}
              />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.darkGray}
              />
            )}
          </Pressable>
        </View>

        {/* DATOS DE LA TARJETA (SI ESTÁ SELECCIONADA) */}
        {selectedMethod === "card" && (
          <View style={styles.cardFormSection}>
            <Text style={styles.sectionTitle}>Datos de la tarjeta</Text>

            <View style={styles.formCard}>
              {/* Número de tarjeta */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Número de tarjeta</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  style={styles.textInput}
                />
              </View>

              <View style={styles.divider} />

              {/* Expiración y CVV */}
              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Fecha de expiración</Text>
                  <TextInput
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="MM / AA"
                    placeholderTextColor={COLORS.gray}
                    keyboardType="numeric"
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.verticalDivider} />

                <View style={[styles.inputGroup, { flex: 0.8 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    placeholderTextColor={COLORS.gray}
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={4}
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              {/* Nombre en la tarjeta */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre en la tarjeta</Text>
                <TextInput
                  value={cardHolder}
                  onChangeText={setCardHolder}
                  placeholder="Nombre Apellido"
                  placeholderTextColor={COLORS.gray}
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* BOTÓN INFERIOR DE PAGO */}
      <View style={styles.footerContainer}>
        <Pressable
          onPress={handlePay}
          style={({ pressed }) => [
            styles.payButton,
            pressed && styles.payButtonPressed,
          ]}
        >
          <Text style={styles.payButtonText}>Pagar {totalAmount}</Text>
          <Ionicons name="lock-closed" size={18} color={COLORS.black} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* HEADER */
  header: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  /* CONTENIDO SCROLL */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* TOTAL */
  amountContainer: {
    marginBottom: 20,
  },
  amountLabel: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  amountValue: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "900",
  },

  /* TARJETA DE MÉTODOS */
  methodsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 22,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodIconBox: {
    width: 40,
    height: 30,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  methodText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
  },

  /* DIVISORES */
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },

  /* FORMULARIO DE TARJETA */
  cardFormSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  inputGroup: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  inputLabel: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 4,
  },
  textInput: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 2,
  },
  rowInputs: {
    flexDirection: "row",
  },

  /* FOOTER Y BOTÓN */
  footerContainer: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
  },
  payButton: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  payButtonPressed: {
    backgroundColor: COLORS.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  payButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "900",
  },
});
