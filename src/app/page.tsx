
import Image from "next/image";
import logo from '../../public/logo.svg'
import styles from "./page.module.scss";
import Link from "next/link";
import { api } from '@/services/api'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default function Home() {

  const handleLogin = async (formData: FormData) => {
    "use server"
    const email = formData.get("email")
    const password = formData.get("password")

    if(email === "" || password === "") {
      return
    }

    try {
      const response = await api.post("/session", {
        email, password
      })

      if(!response.data.token) {
        return;
      }

      console.log(response.data)

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch(err){
      console.log(err)
      return
    }
    redirect("/dashboard")
  }


  return (
    <div className={styles.containerCenter}>
      <Image src={logo} alt="logo da pizzaria"/>
    <section className={styles.login}>
      <form action={handleLogin}>
        <input type="email" 
        required 
        name="email" 
        placeholder="Digite Seu Email"
        className={styles.input}
        />

        <input type="password" 
        required 
        name="password" 
        placeholder="*********"
        className={styles.input}
        />

        <button className={styles.formButton} id="button"
      type="submit">Acessar</button>
      </form>
      <Link href="/signup" className={styles.text}>
      Não possui uma conta? Cadastre-se
      </Link>

    </section>
    </div>
  );
}
