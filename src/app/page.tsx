import Image from "next/image";
import logo from "../../public/logo.png";
import styles from "./page.module.scss";
import Link from "next/link";
import { api } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const handleLogin = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }

      console.log(response.data);

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (error) {
      console.log("login error", error);
      return { error: error.response?.data?.error || "authentication error" };
    }
    redirect("/dashboard");
  };

  return (
    <div className={styles.containerCenter}>
      <div className="rounded-full">
        <Image src={logo} width={200} alt="candy shop logo" />
      </div>
      <section className={styles.login}>
        <form action={handleLogin}>
          <input
            type="email"
            required
            name="email"
            placeholder="enter your email"
            defaultValue="testadmin@email.com"
            className={styles.input}
          />

          <input
            type="password"
            required
            name="password"
            placeholder="enter your password"
            defaultValue="123123"
            className={styles.input}
          />

          <button className={styles.formButton} id="button" type="submit">
            Enter
          </button>
        </form>
        <Link href="/signup" className={styles.text}>
          Does not have an account? Sign Up
        </Link>
      </section>
    </div>
  );
}
