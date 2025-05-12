'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import styles from "../page.module.scss";
import { toast } from 'sonner';
import { handleRegister } from "@/actions/authActions";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await handleRegister(formData);

    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.message);
    }
  };


  return (
    <div className={styles.containerCenter}>
      <Image src={logo} width={200} alt="candy shop logo" />
      <section className={styles.login}>
        <h1>Create your Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="name"
            placeholder="enter your name"
            className={styles.input}
          />

          <input
            type="email"
            required
            name="email"
            placeholder="enter your email"
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
            Register
          </button>
        </form>
        <Link href="/" className={styles.text}>
        Already have an account?{" "} SignIn
        </Link>
      </section>
    </div>
  );
};

export default SignUp;
