'use client'
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logo2 from '../../../../../public/logo2.png'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Header = () => {
    const router = useRouter()
    const handleLogout = async (formData: FormData) => {
        deleteCookie("session", {path: "/"})
        toast.success("Logout")
        router.replace("/")
    }

  return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href='/dashboard'>
            
            <Image src={logo2} alt='Logo'
            width={140} 
            height={130} 
            priority={true} 
            quality={100}
            />
          
            </Link>
            <nav>
                <Link href='/dashboard/category' >
                Category
                </Link>
                <Link href='/dashboard/product' >
                Product
                </Link>
                <form action={handleLogout}>
                    <button type='submit'>
                        <LogOutIcon size={24}/>
                    </button>
                </form>
            </nav>
        </div>
    </header>
  )
}

export default Header