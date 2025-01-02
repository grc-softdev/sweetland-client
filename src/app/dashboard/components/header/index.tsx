'use client'
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logo from '../../../../../public/logo.svg'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Header = () => {
    const router = useRouter()
    const handleLogout = async (formData: FormData) => {
        deleteCookie("session", {path: "/"})
        toast.success("Logout feito com sucesso!")
        router.replace("/")
    }

  return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href='/dashboard'>
            <Image src={logo} alt='Logo sujeito'
            width={190} 
            height={60} 
            priority={true} 
            quality={100}
            />
            </Link>
            <nav>
                <Link href='/dashboard/category' >
                Categoria
                </Link>
                <Link href='/dashboard/product' >
                Produto
                </Link>
                <form action={handleLogout}>
                    <button type='submit'>
                        <LogOutIcon size={24} color="#FFF"/>
                    </button>
                </form>
            </nav>
        </div>
    </header>
  )
}

export default Header