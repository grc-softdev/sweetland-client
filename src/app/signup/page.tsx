'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";
import styles from "../page.module.scss";
import { toast } from 'sonner';
import { handleRegister } from "@/actions/authActions";

const SignUp = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await handleRegister(formData);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };


  return (
    <div className={styles.containerCenter}>
      <Image src={logo} alt="logo da pizzaria" />
      <section className={styles.login}>
        <h1>Criando sua Conta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="name"
            placeholder="Digite Seu Nome"
            className={styles.input}
          />

          <input
            type="email"
            required
            name="email"
            placeholder="Digite Seu Email"
            className={styles.input}
          />

          <input
            type="password"
            required
            name="password"
            placeholder="*********"
            className={styles.input}
          />

          <button className={styles.formButton} type="submit">
            Cadastrar
          </button>
        </form>
        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça o login
        </Link>
      </section>
    </div>
  );
};

export default SignUp;
