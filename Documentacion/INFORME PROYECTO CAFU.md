## INFORME PROYECTO

## Universidad: Universidad Antonio Nariño Programa: Ingeniería de Sistemas y Computación Proyecto: CAFÚ - REVANCHA Asignatura: ELECTIVA I

## Estudiante:

## \- Dalis Natalia Hernandez Carvajal - Santiago Moreno Cardenas - Dairon Stid Vega Camacho

## Fecha: 03 septiembre 2026 Docente: Wilson Forero


## Enlace Repositorio GitHub: https://github.com/HelloWord-404/CAFU- [URL 🔗](https://github.com/HelloWord-404/CAFU-)

## (Invitación al repositorio enviada al profesor)

## Introducción

En el contexto urbano de Bogotá, la práctica del fútbol aficionado representa una de las actividades recreativas y deportivas de mayor demanda. Sin embargo, la organización de un

encuentro deportivo conlleva retos logísticos recurrentes para los jugadores y administradores de escenarios deportivos, tales como la falta de visibilidad en tiempo real de la disponibilidad de campos, procesos manuales e ineficientes para la reserva de horarios y complicaciones en la recaudación de fondos entre los participantes.

Para dar respuesta a esta problemática nace CAFU, una solución tecnológica integral orientada a optimizar la experiencia de reserva y gestión de canchas sintéticas en los formatos de Fútbol 5, Fútbol 7 y Fútbol 11. Bajo el lema ¡Preocúpate solo del 3er tiempo!, la plataforma busca eliminar la fricción operativa asociada al alquiler de escenarios y al seguimiento de pagos, centralizando todo el flujo en una interfaz ágil, intuitiva y accesible.

El presente documento expone la arquitectura completa para la fase de diseño e implementación del sistema. Se detalla la estructura modular compuesta por un número de vistas clave organizadas en flujos de autenticación, exploración geolocalizada, embudo de reserva y gestión de perfil. Asimismo, se define la transición técnica hacia un desarrollo fundamentado en React native y Supabase como infraestructura Backend-as-a-Service (BaaS), garantizando la sincronización de datos en tiempo real, la escalabilidad del sistema

y una experiencia de usuario optimizada tanto a nivel visual como funcional.


## Objetivos

## Objetivo general

Resolver la problemática de desorganización y fricción operativa en el alquiler de canchas de fútbol aficionado en Bogotá, mediante el desarrollo de una solución digital en React y Supabase (CAFU) que centralice la búsqueda por formato (Fut5, Fut7, Fut11), automatice la reserva de horarios en tiempo real y facilite la gestión compartida del pago para los jugadores.

## Objetivos específicos

- Eliminar la incertidumbre de disponibilidad: Diseñar e implementar un sistema de búsqueda visual y geolocalizada en tiempo real que reemplace el proceso manual de llamadas telefónicas, permitiendo filtrar canchas por ubicación, tipo de terreno y formato de juego.

- Simplificar la recolección de dinero entre jugadores: Desarrollar un módulo de gestión de pagos flexibles que admita abonos parciales (50%/100%) y herramientas de cobro grupal para erradicar el problema del capitán que asume solo el costo de la reserva.

- Proporcionar una arquitectura visual e infraestructura escalable: Maquetar en Penpot e implementar en React native + Supabase un ecosistema de ciertos números de vistas interconectadas, garantizando una navegación intuitiva y el manejo seguro de datos de usuarios, reservas y transacciones.

- Desarrollar un aplicativo en el cual permita a los usuarios visualizar canchas sintéticas disponibles por medio de filtros, mapas o ubicaciones y realizar su respectiva reserva, pago o cancelación.

## Descripción del proyecto

CAFU es una solución móvil desarrollada en React y Supabase que transforma la experiencia de alquiler de canchas sintéticas de fútbol (Fut5, Fut7 y Fut11) en Bogotá. La plataforma elimina las llamadas telefónicas y mensajes en plataformas como Whatsapp y la fricción de cobro al permitir encontrar escenarios deportivos geolocalizados en tiempo real, reservar horarios de forma inmediata y gestionar pagos compartidos entre los jugadores, permitiendo al capitán asegurar la cancha sin asumir solo el costo del partido.


## Tecnologías utilizadas


| 📦 |   |   |
| --- | --- | --- |
| Versionamie | Git + GitHub | Código |
| nto |   |   |
| 🚀 Build | EAS Build | Generar APK/AAB/iOS |
| 🧪 Testing | Jest + Testing Library | Pruebas |
| 📋 | OpenAPI/Swagger |   |
| Documentaci | opcional | Documentar endpoints |
| ón API |   |   |

## Desarrollo

## Análisis de requerimientos Funcionales y No funcionales

## Requerimientos Funcionales (RF)

## RF01 — Inicio

El sistema deberá permitir al usuario visualizar la pantalla de inicio con las canchas disponibles, opciones de búsqueda, categorías y accesos a las principales funcionalidades.

## RF02 — Registro

El sistema deberá permitir a los usuarios crear una cuenta proporcionando la información requerida.

## RF03 — Inicio de sesión

El sistema deberá permitir a los usuarios autenticarse mediante sus credenciales.

## RF04 — Recuperación de contraseña

El sistema deberá permitir al usuario solicitar la recuperación de su contraseña mediante el correo electrónico registrado.


## RF05 — Búsqueda de canchas

El sistema deberá permitir buscar canchas mediante una barra de búsqueda, si la persona

conoce el nombre de la cancha.

## RF06 — Selección del tipo de cancha

El sistema deberá permitir filtrar o seleccionar canchas según su modalidad:

- Fútbol 5

- Fútbol 7

- Fútbol 11

## RF07 — Filtros

El sistema deberá permitir filtrar las canchas según criterios como tipo de cancha, precio o

disponibilidad, entre otros.

## RF08 — Mapa

El sistema deberá permitir visualizar las canchas disponibles mediante un mapa y mostrar

su ubicación geográfica.

## RF09 — Detalle de cancha

El sistema deberá permitir consultar la información detallada de una cancha, incluyendo

nombre, fotografías, ubicación, tipo, precio, horarios y disponibilidad.

## RF10 — Favoritos

El sistema deberá permitir al usuario agregar y eliminar canchas de su lista de favoritos.

## RF11 — Reserva de cancha

El sistema deberá permitir al usuario seleccionar una cancha, fecha y horario disponible para realizar una reserva.

## RF12 — Confirmación de reserva

El sistema deberá mostrar una confirmación antes de finalizar la reserva y registrar la

información correspondiente.

## RF13 — Detalle de reserva

El sistema deberá permitir al usuario consultar los detalles de sus reservas, incluyendo cancha, fecha, horario, precio y estado.

## RF14 — Pagos


El sistema deberá permitir al usuario realizar el pago correspondiente a una reserva

mediante los métodos de pago disponibles.

## RF15 — Estado de pagos

El sistema deberá permitir consultar el estado de los pagos, incluyendo pagos pendientes,

aprobados, rechazados o cancelados.

## RF16 — Notificaciones

El sistema deberá permitir al usuario consultar sus notificaciones relacionadas con reservas, pagos y otros eventos importantes.

## RF17 — Perfil

El sistema deberá permitir al usuario consultar y modificar la información de su perfil.

## RF18 — Barra lateral

El sistema deberá proporcionar una barra lateral de navegación que permita acceder a las

diferentes funcionalidades de la aplicación.

## RF19 — Billetera virtual

El sistema deberá permitir al usuario consultar su saldo disponible, realizar recargas y

visualizar el historial de movimientos de su billetera.

## RF20 — Pago mediante saldo

El sistema deberá permitir al usuario utilizar el saldo disponible en su billetera para realizar el pago de una reserva.

## RF21 — Historial de movimientos

El sistema deberá permitir al usuario consultar los movimientos de su billetera, incluyendo recargas, pagos, devoluciones y ajustes.

## RF22 — Gestión de Usuarios y Autenticación

- Registro e inicio de sesión seguro para jugadores y administradores (correo/contraseña y OAuth con Google).

- Gestión de perfil de usuario (datos personales, historial de partidos y métodos de pago guardados).

## RF23 — Búsqueda y Filtrado de Canchas

- Buscador en tiempo real por ubicación geográfica, nombre de la sede.

- Filtros avanzados por formato de juego (Fut5, Fut7, Fut11), precio y horario disponible.

- Visualización de escenarios en lista y mapa interactivo.


## RF24 — Módulo de Reservas y Disponibilidad

- Consulta de la agenda en tiempo real con bloques de horarios disponibles por cancha y fecha.

- Bloqueo temporal del horario seleccionado durante el proceso de pago para evitar reservas dobles.

## RF25 — Gestión de Pagos y Cobro Grupal

- Integración con pasarelas de pago digitales (Nequi, Daviplata, PSE).

## RF26 — Historial y Notificaciones

- Panel de seguimiento con reservas próximas, activas y pasadas.

- Envío de recordatorios automáticos previos al partido y alertas de confirmación de pago.

## RF27 — Canal de Atención y Soporte al Cliente

El sistema deberá proporcionar al usuario un canal directo de contacto y soporte dentro de la aplicación, permitiéndole enviar consultas, reportar problemas con sus reservas o comunicarse con atención al cliente a través de acceso directo o formulario de soporte integrado.

## Requerimientos No Funcionales (RNF)

## RNF01 — Rendimiento de la pantalla de inicio

El sistema deberá cargar la interfaz inicial y el catálogo principal en un tiempo no mayor a 2.0 segundos bajo conexiones estándar 4G o Wi-Fi.

## RNF02 — Encriptación en el registro

Las contraseñas y datos sensibles capturados durante el registro deberán ser procesados mediante algoritmos de hashing seguro (BCrypt/Argon2) a través de Supabase Auth.

## RNF03 — Seguridad en la autenticación

El sistema deberá implementar tokens de sesión seguros (JWT) para mantener la autenticación del usuario sin exponer credenciales en el cliente.

## RNF04 — Tiempo de vida de enlaces de recuperación

Los enlaces o tokens de recuperación de contraseña enviados al correo electrónico deberán caducar automáticamente tras 15 minutos de su emisión.


## RNF05 — Respuesta de la barra de búsqueda

La consulta de resultados en la barra de búsqueda deberá ofrecer un tiempo de respuesta menor a 500 milisegundos mediante técnicas de debounce y optimización de consultas.

## RNF06 — Usabilidad en selección de modalidades

La interfaz deberá permitir cambiar el filtro por formato (Fut5, Fut7, Fut11) en un solo toque (single tap) actualizando el estado visual de forma inmediata.

## RNF07 — Eficiencia en el filtrado

El motor de filtrado multicriterio en el frontend (React) deberá ejecutarse sin re-renderizados innecesarios, manteniendo una tasa de refresco fluida de 60 fps en la interfaz.

## RNF08 — Precisión y consumo del Mapa

La integración del mapa interactivo deberá consumir recursos de la API (Google Maps/Mapbox) de forma optimizada mediante renderizado de marcadores por agrupamiento (clustering).

## RNF09 — Carga progresiva del detalle

Las fotografías del detalle de la cancha deberán cargarse de manera asíncrona (lazy loading) y estar optimizadas en formato WebP para minimizar el consumo de datos móviles.

## RNF10 — Sincronización de favoritos

La adición o eliminación de una cancha en la lista de favoritos deberá actualizar el estado local al instante (actualización optimista).

## RNF11 — Control de concurrencia en reservas

El sistema deberá implementar transacciones óptimas en la base de datos PostgreSQL para garantizar que un mismo bloque de horario no pueda ser reservado por dos usuarios simultáneamente (prevención de double booking).

## RNF12 — Claridad en la confirmación

La vista de confirmación de reserva deberá desplegar de forma explícita el desglose de precios y políticas de cancelación antes de ejecutar el commit final, es decir reservar.

## RNF13 — Disponibilidad del detalle de reservas

La consulta de los detalles de las reservas archivadas o activas deberá estar disponible en todo momento, incluso ante caídas parciales de servicios de terceros (pasarelas de pago).

## RNF14 — Consistencia de estados de pago

El sistema deberá sincronizar el cambio de estado de los pagos mediante Webhooks seguros validados por firma criptográfica con la pasarela.


## RNF15 — Latencia en entrega de notificaciones

Las notificaciones push o internas en la aplicación deberán entregarse en el dispositivo del usuario en menos de 3 segundos tras la ocurrencia del evento .

## RNF16 — Adaptabilidad de la vista de Perfil

La pantalla de perfil deberá ser completamente responsiva, adaptando los formularios a diferentes tamaños de pantalla (Mobile-First).)

## RNF17 — Control de Acceso Basado en Roles (RLS)

Se deberán aplicar políticas de Row Level Security en Supabase para asegurar que los jugadores solo puedan leer/modificar sus propios registros de perfil y los administradores los de sus respectivas sedes.

## RNF18 — Cobertura geográfica y rendimiento de búsqueda

Las consultas geolocalizadas por coordenadas de Bogotá deberán hacer uso de índices espaciales (PostGIS) para responder en menos de 1 segundo ante grandes volúmenes de

datos.

## RNF20 — Disponibilidad global del servicio

La plataforma CAFU (React Native + Supabase) deberá mantener una disponibilidad (SLA) del 99.9% del tiempo, garantizando continuidad operativa en los horarios pico de mayor demanda (tardes, noches y fines de semana).

## Diseño del sistema

## Arquitectura Técnica del Sistema

La arquitectura está concebida bajo un esquema moderno cliente-servidor descentralizado apoyado en infraestructura BaaS (Backend-as-a-Service):

Frontend Mobile: React Native con Expo (vía Expo Router para navegación declarativa y NativeWind para estilos Tailwind CSS).

servidor.

## Gestión de Estado y Caché: Zustand para el estado global (sesión, carrito de reserva, filtros) y TanStack Query para el manejo de caché asíncrono y sincronización con el


## Capa BaaS (Supabase):

- \- Autenticación: Supabase Auth (Manejo de JWT, OAuth con Google/Apple).

- \- Base de Datos: PostgreSQL con extensión PostGIS para búsquedas geolocalizadas.

- \- Seguridad: Políticas Row Level Security (RLS) para aislar datos por usuario/admin.

- \- Lógica de Negocio Sensible: Edge Functions (bloqueo de reservas, procesamiento de cobro grupal, manejo de webhooks de pago).

- \- Realtime: Subscripciones WebSockets para la disponibilidad instantánea de canchas.

## Servicios Externos Integrados:

- \- Mapas y Geolocalización: Google Maps Platform (Maps API, Places API, Directions API).

- \- Pasarelas de Pago: Wompi, Mercado Pago o Stripe de acuerdo a la que se elija definitivamente (soporte para Nequi, Daviplata, PSE).

- \- Notificaciones: Expo Notifications (push) y Resend/SendGrid (emails).


## Modelo Entidad - Relación


## Casos de Uso


## Diagrama de Clases


## Diagrama de Flujo


## Estrategia de Módulos del Sistema (Mapeo de Pantallas y Funcionalidades)

Módulo 1: Autenticación, Seguridad y Perfil de Usuario Gestión del acceso seguro a la

plataforma y administración del perfil del jugador o administrador.

- \- Pantallas integradas

- 1. Pantalla de Bienvenida / Onboarding: Presentación visual de los beneficios de la aplicación.

- 2. Inicio de Sesión y Registro: Formulario unificado con validación de correo, contraseña y autenticación rápida (OAuth con Google / Apple).

- 3. Recuperación de Contraseña: Flujo de envío de token temporal (expiración de 15 min) para restablecer credenciales.

- 4. Perfil de Usuario: Gestión de datos personales (nombre, teléfono, foto, posición preferida) y ajuste de preferencias de notificaciones.

Módulo 2: Exploración, Búsqueda Geolocalizada y Filtros permite a los usuarios descubrir

complejos deportivos cercanos en tiempo real utilizando la API de Google Maps.

- \- Pantallas integradas

- 1. Pantalla Principal (Home / Mapa Interactivo): Vista en tiempo real con marcadores de sedes deportivas según la ubicación GPS del usuario.

- 2. Modal de Filtros Avanzados: Permite filtrar las opciones por:

- \- Formato de juego: Fútbol 5, Fútbol 7, Fútbol 11.

- \- Ubicación.

- \- Rango de precios.

- \- Disponibilidad de horarios.

- 3. Lista / Catálogo de Sedes: Vista alternativa ordenada por cercanía o relevancia.

Módulo 3: Selección, Detalle y Reserva de Horarios Proceso donde el usuario consulta la ficha técnica de la cancha y bloquea el espacio deseado.

- \- Pantallas integradas

- 1. Detalle del Complejo / Cancha: Galería de fotos, dirección, mapa de llegada, reglas de la sede, calificación y reseñas de otros usuarios.

- 2. Selector de Fecha y Bloque Horario: Interfaz interactiva para elegir el día y las franjas de horas disponibles (1 hora, 1.5 horas, etc.).

- 3. Pantalla de Resumen de Reserva (Checkout Step 1): Muestra el desglose del precio total, la cancha asignada y activa el temporizador de bloqueo temporal (Slot Lock de 15 minutos) para evitar reservas dobles en la base de datos.


Módulo 4: Procesamiento de Pagos y Billetera Virtual (CAFU Wallet)Gestión completa de las transacciones monetarias del capitán para confirmar el alquiler de la cancha.

- \- Pantallas integradas:

- 1. Pantalla de Selección de Pago: Permite elegir la forma de cancelar el 100% de la reserva:

- 1. Saldo CAFU Wallet (Descuento inmediato del saldo en la app).

- 2. Pasarela de Pago Externa

- 2. Pantalla CAFU Wallet (Billetera Virtual): Visualización del saldo acumulado, botón de recarga rápida y tabla con el historial de movimientos (recargas y pagos).

- 3. Pantalla de Confirmación / Comprobante: Pantalla final con mensaje de éxito, resumen de la reserva y código QR para presentar al llegar al complejo deportivo.

Módulo 5: Gestión de Reservas, Notificaciones y SoporteMantenimiento post-reserva, alertas push y herramientas administrativas.

- \- Pantallas integradas:

- 1. Sección "Mis Reservas": Pestaña dividida en reservas Activas / Próximas y Historial / Pasadas, con opción de cancelar según las políticas de la sede.

- 2. Centro de Notificaciones Push: Historial de alertas enviadas (confirmaciones de reserva, recordatorio 2 horas antes del partido, avisos de cancelación).

- 3. Panel Administrativo (Vista Sede / Admin): Interfaz exclusiva para dueños de canchas donde pueden gestionar la disponibilidad, bloquear franjas por mantenimiento y consultar métricas de ocupación.

- 4. Centro de Ayuda / Soporte: Sección de preguntas frecuentes (FAQ) y canal de contacto directo (Chat / WhatsApp) para resolver inconvenientes.


## Mockups


Nota: Estas imágenes son de referencia, pero no van a ser exactas por temas de circunstancias en desarrollo.


## Perfiles y roles técnicos

Integrante 1 — Frontend UI/UX (Dev 1): Responsable exclusivo de la maquetación en React Native, componentes de NativeWind (Tailwind), maquetación responsiva, navegación en Expo Router y experiencia visual. (Trabaja principalmente en app/ y src/components/).

Integrante 2 — Backend & Database (Dev 2): Responsable de la infraestructura en Supabase, arquitectura SQL en PostgreSQL, procedimientos almacenados (PL/pgSQL), políticas RLS, índices de PostGIS y rendimiento del servidor. (Trabaja en el panel de Supabase, scripts .sql y supabase/).

Integrante 3 — Full-Stack Integration & Services (Dev 3): Responsable de la capa de comunicación y estado global: Zustand, TanStack Query, hooks personalizados, integraciones con APIs externas (Google, Expo Push, WhatsApp) y manejo de errores. (Trabaja principalmente en src/services/, src/store/ y src/hooks/).

## Metodología de desarrollo – Scrum

Para el desarrollo del proyecto CAFU se propone utilizar la metodología ágil Scrum, debido a que permite organizar el proyecto en ciclos cortos de trabajo, realizar entregas progresivas y facilitar la adaptación de los requerimientos durante el desarrollo.

La metodología Scrum permitirá al equipo trabajar de manera colaborativa y dividir el desarrollo de CAFU en diferentes Sprints, en los cuales se desarrollarán y validarán funcionalidades específicas de la aplicación.

El proyecto se desarrollará de manera incremental, comenzando con las funcionalidades principales y posteriormente incorporando los módulos de búsqueda, reservas, pagos, perfil, notificaciones y administración.

## Sprints propuestos para CAFU

Para organizar el desarrollo inicial de CAFU se propone dividir el proyecto en 6 Sprints, distribuyendo las funcionalidades de acuerdo con su dependencia y prioridad.

## Sprint 1 – Configuración y autenticación

Objetivo: establecer la estructura inicial del proyecto y permitir el acceso de los usuarios.

## Actividades:

- Configuración inicial de React Native y Expo.


- Configuración de Supabase.

- Creación de la estructura del proyecto.

- Configuración de navegación.

- Diseño de la pantalla de bienvenida.

- Registro.

- Inicio de sesión.

- Recuperación de contraseña.

- Configuración inicial del perfil.

Resultado esperado: usuario capaz de registrarse, iniciar sesión y acceder a la aplicación.

## Sprint 2 – Inicio, búsqueda y filtros

Objetivo: permitir al usuario encontrar las canchas disponibles.

## Actividades:

- Diseño de pantalla principal.

- Catálogo de canchas.

- Barra de búsqueda.

- Filtros.

- Fútbol 5.

- Fútbol 7.

- Fútbol 11.

- Filtro por precio.

- Filtro por disponibilidad.

- Integración inicial del mapa.

Resultado esperado: usuario capaz de buscar y filtrar canchas según sus necesidades.

## Sprint 3 – Detalle y reservas

Objetivo: implementar el proceso de selección y reserva de una cancha.

## Actividades:

- Detalle de la cancha.

- Fotografías.

- Información de ubicación.

- Precios.

- Horarios.

- Selección de fecha.

- Selección de horario.

- Resumen de reserva.

- Confirmación de reserva.


- Gestión de disponibilidad.

El sistema contempla la consulta de disponibilidad y mecanismos para evitar que un mismo

horario sea reservado simultáneamente por diferentes usuarios.

## Sprint 4 – Pagos y CAFU Wallet

Objetivo: implementar las funcionalidades relacionadas con el pago de las reservas.

## Actividades:

- Pantalla de selección de método de pago.

- Integración con Nequi.

- Integración con Daviplata.

- Integración con PSE.

- CAFU Wallet.

- Consulta de saldo.

- Recargas.

- Historial de movimientos.

- Confirmación del pago.

Resultado esperado: usuario capaz de seleccionar un método de pago y consultar el estado de su transacción.

## Sprint 5 – Reservas, favoritos y notificaciones

Objetivo: completar las funcionalidades posteriores a la reserva.

Actividades:

- Sección “Mis Reservas”.

- Reservas próximas.

- Historial de reservas.

- Cancelación de reservas según políticas.

- Sistema de favoritos.

- Notificaciones.

- Recordatorios.

- Confirmaciones de pago.

El informe ya contempla reservas activas, próximas, pasadas y notificaciones relacionadas

con confirmaciones y recordatorios.

## Resultado esperado: usuario capaz de administrar sus reservas y recibir información relacionada con ellas.


## Conclusiones

La propuesta de CAFU establece las bases necesarias para iniciar el desarrollo de una aplicación orientada a facilitar la búsqueda, reserva y pago de canchas sintéticas de fútbol.

A partir del análisis realizado se definieron los principales requerimientos funcionales y no funcionales, la arquitectura tecnológica, los módulos del sistema y las interfaces que servirán como referencia durante la etapa de implementación.

La planificación planteada permitirá al equipo distribuir las responsabilidades y desarrollar progresivamente las funcionalidades de CAFU, buscando obtener una

solución intuitiva, segura y escalable.

## Referencias

- ChatGPT

- Gemini

- [Documentación de las tecnologías utilizadas]
