import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Cancha = {
  id: number;
  nombre: string;
  ubicacion: string;
  horario: string;
  precio: string;
  calificacion: string;
  imagen: string;
};

const canchas: Cancha[] = [
  {
    id: 1,
    nombre: 'Cancha Verde',
    ubicacion: 'Bogotá',
    horario: '6:00 AM - 11:00 PM',
    precio: '$120.000 / hora',
    calificacion: '4.8',
    imagen:
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    nombre: 'Complejo Deportivo Oro Verde',
    ubicacion: 'Bogotá',
    horario: '7:00 AM - 10:00 PM',
    precio: '$100.000 / hora',
    calificacion: '4.6',
    imagen:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    nombre: 'Cancha Los Campeones',
    ubicacion: 'Bogotá' ,
    horario: '5:00 AM - 11:00 PM',
    precio: '$95.000 / hora',
    calificacion: '4.7',
    imagen:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CanchasScreen() {
  const router = useRouter();

  const [filtroActivo, setFiltroActivo] = useState('Hoy');
  const [busqueda, setBusqueda] = useState('');

  const canchasFiltradas = canchas.filter((cancha) =>
    `${cancha.nombre} ${cancha.ubicacion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* =====================================
            ENCABEZADO
        ====================================== */}

        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=85',
            }}
            style={styles.heroImage}
          />

          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Reserva tu
            </Text>

            <Text style={styles.heroTitleGreen}>
              mejor partido
            </Text>

            <Text style={styles.heroDescription}>
              Canchas sintéticas disponibles{'\n'}
              cuando quieras jugar.
            </Text>
          </View>
        </View>

        {/* =====================================
            BUSCADOR
        ====================================== */}

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={23}
            color="#A0AAA4"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cancha o ubicación"
            placeholderTextColor="#7D8982"
            value={busqueda}
            onChangeText={setBusqueda}
          />

          <Pressable
            style={styles.filterButton}
            onPress={() => console.log('Abrir filtros')}
          >
            <Ionicons
              name="options-outline"
              size={22}
              color="#AAB5AF"
            />
          </Pressable>
        </View>

        {/* =====================================
            TÍTULO DE CANCHAS
        ====================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Canchas Disponibles
          </Text>

          <Pressable
            onPress={() => setFiltroActivo('Todas')}
          >
            <Text style={styles.seeAll}>
              Ver todas
            </Text>
          </Pressable>
        </View>

        {/* =====================================
            FILTROS
        ====================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {['Hoy', 'Mañana', 'Fin de semana', 'Todas'].map(
            (filtro) => {
              const activo = filtroActivo === filtro;

              return (
                <Pressable
                  key={filtro}
                  style={[
                    styles.filterChip,
                    activo && styles.filterChipActive,
                  ]}
                  onPress={() => setFiltroActivo(filtro)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      activo && styles.filterTextActive,
                    ]}
                  >
                    {filtro}
                  </Text>
                </Pressable>
              );
            }
          )}
        </ScrollView>

        {/* =====================================
            LISTADO DE CANCHAS
        ====================================== */}

        <View style={styles.cardsContainer}>
          {canchasFiltradas.map((cancha) => (
            <Pressable
              key={cancha.id}
              style={({ pressed }) => [
                styles.courtCard,
                pressed && styles.cardPressed,
              ]}
              onPress={() =>
                console.log(`Seleccionaste ${cancha.nombre}`)
              }
            >
              {/* IMAGEN */}

              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: cancha.imagen }}
                  style={styles.courtImage}
                />

                <View style={styles.ratingBadge}>
                  <Ionicons
                    name="star"
                    size={12}
                    color="#C8FF00"
                  />

                  <Text style={styles.ratingText}>
                    {cancha.calificacion}
                  </Text>
                </View>
              </View>

              {/* INFORMACIÓN */}

              <View style={styles.cardInfo}>
                <Text
                  style={styles.courtName}
                  numberOfLines={2}
                >
                  {cancha.nombre}
                </Text>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="location"
                    size={14}
                    color="#C8FF00"
                  />

                  <Text
                    style={styles.infoText}
                    numberOfLines={1}
                  >
                    {cancha.ubicacion}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#C8FF00"
                  />

                  <Text
                    style={styles.infoText}
                    numberOfLines={1}
                  >
                    {cancha.horario}
                  </Text>
                </View>

                <Text style={styles.price}>
                  {cancha.precio}
                </Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.reserveButton,
                    pressed && styles.reserveButtonPressed,
                  ]}
                  onPress={() => {
                    console.log(
                      `Reservar ${cancha.nombre}`
                    );
                  }}
                >
                  <Text style={styles.reserveText}>
                    Reservar
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>

        {/* =====================================
            SI NO HAY RESULTADOS
        ====================================== */}

        {canchasFiltradas.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="football-outline"
              size={45}
              color="#68756D"
            />

            <Text style={styles.emptyTitle}>
              No encontramos canchas
            </Text>

            <Text style={styles.emptyText}>
              Intenta buscar otro nombre o ubicación.
            </Text>
          </View>
        )}

        {/* =====================================
            ESPACIO INFERIOR
        ====================================== */}

        <View style={{ height: 30 }} />
      </ScrollView>
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

  contentContainer: {
    paddingBottom: 20,
  },

  /* ==============================
     HERO
  =============================== */

  heroContainer: {
    height: 245,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  heroOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 25, 13, 0.58)',
  },

  heroContent: {
    position: 'absolute',
    left: 18,
    top: 58,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
  },

  heroTitleGreen: {
    color: '#C8FF00',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
  },

  heroDescription: {
    color: '#E0E5E2',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },

  /* ==============================
     BUSCADOR
  =============================== */

  searchContainer: {
    height: 54,
    marginHorizontal: 17,
    marginTop: -2,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#31543F',
    backgroundColor: '#10291C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
  },

  filterButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ==============================
     SECCIÓN
  =============================== */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 20,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  seeAll: {
    color: '#C8FF00',
    fontSize: 13,
    fontWeight: '700',
  },

  /* ==============================
     FILTROS
  =============================== */

  filtersContainer: {
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 18,
    gap: 9,
  },

  filterChip: {
    height: 36,
    paddingHorizontal: 17,
    borderRadius: 20,
    backgroundColor: '#123021',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterChipActive: {
    backgroundColor: '#C8FF00',
  },

  filterText: {
    color: '#B5BFB9',
    fontSize: 12,
    fontWeight: '600',
  },

  filterTextActive: {
    color: '#071B12',
    fontWeight: '800',
  },

  /* ==============================
     TARJETAS
  =============================== */

  cardsContainer: {
    paddingHorizontal: 17,
    gap: 13,
  },

  courtCard: {
    minHeight: 158,
    borderRadius: 15,
    backgroundColor: '#123323',
    borderWidth: 1,
    borderColor: '#1B4930',
    padding: 7,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  cardPressed: {
    opacity: 0.82,
  },

  imageWrapper: {
    width: 44,
    minWidth: 44,
    flex: 0.88,
    borderRadius: 11,
    overflow: 'hidden',
    position: 'relative',
  },

  courtImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 7,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#173427',
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 3,
  },

  cardInfo: {
    flex: 1.12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  courtName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 19,
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  infoText: {
    color: '#AEB9B2',
    fontSize: 11,
    marginLeft: 5,
    flex: 1,
  },

  price: {
    color: '#C8FF00',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
    marginBottom: 8,
  },

  reserveButton: {
    height: 35,
    borderRadius: 9,
    backgroundColor: '#C8FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  reserveButtonPressed: {
    opacity: 0.7,
  },

  reserveText: {
    color: '#071B12',
    fontSize: 12,
    fontWeight: '900',
  },

  /* ==============================
     SIN RESULTADOS
  =============================== */

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 12,
  },

  emptyText: {
    color: '#87938D',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});