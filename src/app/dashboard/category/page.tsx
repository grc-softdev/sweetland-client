import { api } from '@/services/api'
import Button from '../components/button'
import styles from './styles.module.scss'
import { getCookieServer } from '@/lib/cookieServer'
import { redirect } from 'next/navigation'

const Category = () => {

  const handleRegisterCategory = async (formData: FormData) => {
    'use server'
    const name = formData.get('name')

    if(name === '') return;

    const data = {
      name: name
    }

    const token = await getCookieServer()

    const response = await api.post("/category", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((err) => {
      console.log(err)
      return;
    })

    redirect('/dashboard')
  }

  return (
    <main className={styles.container}>
      <h1>New Category</h1>

      <form className={styles.form} action={handleRegisterCategory}>
        <input
        type='text'
        name='name'
        placeholder='category name, ex.: bakes'
        required
        className={styles.input}
        />
       <Button name='Register'/>
      </form>
    </main>
  )
}

export default Category