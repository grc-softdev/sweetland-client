'use client'
import { useFormStatus } from 'react-dom';
import styles from './styles.module.scss'

type ButtonProps = {
    name: string;
}

const Button = ({ name }: ButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button type='submit' disabled={pending} className={styles.button}>{pending ? 'Carregando...': name}</button>
  )
}

export default Button