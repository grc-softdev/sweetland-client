
import Image from "next/image";
import Link from "next/link";
import { api } from '@/services/api'
import logo from "../../../public/logo.svg";
import styles from "../page.module.scss";
import { toast } from "sonner";

const SignUp = () => {

    const handleRegister = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if(name === "" || email === "" || password === ""){
          toast.warning("Preencha todos os campos")
            return
        }

         try {
            await api.post("/users", {
              name, email, password
            })
         } catch(err) {
          //TODO: link the error we get from the backend to something user friendly          
            console.log(err)

            
         }
         toast.success('cadastrado com sucesso')
         
    }

  return (
    <div className={styles.containerCenter}>
      <Image src={logo} alt="logo da pizzaria" />
      <section className={styles.login}>
        <h1>Criando sua Conta</h1>
        <form action={handleRegister}>
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
