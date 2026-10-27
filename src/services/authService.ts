import { supabase } from "../lib/supabase";

export type RegisterData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  password: string;
};

export async function registerUser(data: RegisterData) {
  const nombre = data.nombre.trim();
  const apellido = data.apellido.trim();
  const correo = data.correo.trim().toLowerCase();
  const telefono = data.telefono.trim();

  if (!nombre || !apellido || !correo || !telefono || !data.password) {
    throw new Error("Completa todos los campos.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    throw new Error("Ingresa un correo electrónico válido.");
  }

  if (data.password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  const { data: result, error } = await supabase.auth.signUp({
    email: correo,
    password: data.password,
    options: {
      data: {
        nombre,
        apellido,
        telefono,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return result;
}
