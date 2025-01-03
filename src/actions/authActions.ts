"use server";

import { api } from '@/services/api';

export const handleRegister = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { success: false, message: "Preencha todos os campos" };
  }

  try {
    await api.post("/users", {
      name,
      email,
      password,
    });
    return { success: true, message: "Cadastrado com sucesso" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erro ao cadastrar. Tente novamente." };
  }
};
