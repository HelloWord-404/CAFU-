import { supabase } from "./supabase";

export type BookedSlot = {
  start_time: string;
  end_time: string;
};

type CreateReservationInput = {
  courtId: string;
  courtName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // 24 horas: HH:mm
};

export async function getBookedSlots(
  courtId: string,
  date: string,
): Promise<BookedSlot[]> {
  const { data, error } = await supabase.rpc("get_booked_slots", {
    p_court_id: courtId,
    p_date: date,
  });

  if (error) {
    console.error("Error consultando disponibilidad:", error.message);
    throw new Error("No se pudo consultar la disponibilidad.");
  }

  return (data ?? []) as BookedSlot[];
}

export async function createReservation({
  courtId,
  courtName,
  date,
  startTime,
}: CreateReservationInput) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(
      "No hay una sesión activa. Inicia la sesión del usuario de prueba.",
    );
  }

  const [hour, minute] = startTime.split(":").map(Number);

  const endHour = (hour + 1) % 24;
  const endTime =
    `${String(endHour).padStart(2, "0")}:` +
    `${String(minute).padStart(2, "0")}:00`;

  const { data, error } = await supabase
    .from("court_reservations")
    .insert({
      court_id: courtId,
      court_name: courtName,
      reservation_date: date,
      start_time: `${startTime}:00`,
      end_time: endTime,
      user_id: user.id,
      status: "confirmed",
    })
    .select(
      "id, court_id, court_name, reservation_date, start_time, end_time, user_id, status",
    )
    .single();

  if (error) {
    console.error("Error guardando reserva:", error.code, error.message);

    if (error.code === "23505") {
      throw new Error("Ese horario ya está reservado. Selecciona otro.");
    }

    throw new Error("No se pudo guardar la reserva en Supabase.");
  }

  return data;
}
