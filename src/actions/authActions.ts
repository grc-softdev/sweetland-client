"use server";

import { api } from '@/services/api';

export const handleRegister = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { success: false, message: "Fill all fields" };
  }

  try {
    await api.post("/users", {
      name,
      email,
      password,
    });
    return { success: true, message: "Success" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error. Try again" };
  }
};
