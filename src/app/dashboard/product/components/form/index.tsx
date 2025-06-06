'use client'
import { UploadCloud } from 'lucide-react'
import styles from './styles.module.scss'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import Button from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner'

type CategoryProps = {
    id: string;
    name: string;
}

type Props = {
    categories: CategoryProps[]
}

const Form = ({ categories }: Props) => {
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    const handleRegisterProduct = async (formData: FormData) => {
        const categoryIndex = formData.get('category')
        const name = formData.get('name')
        const price = formData.get('price')
        const description = formData.get('description')

        if (!name || !categoryIndex || !price || !description || !image) {
            toast.warning("Fill all fields")
            return
        }

        const data = new FormData()

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = getCookieClient()

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => {
            console.log(err)
        })

        toast.success('successfully registered')
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (
                image.type !== "image/jpeg" &&
                image.type !== "image/png" &&
                image.type !== "image/jpg"
            ) {
                toast.warning('forbidden format!')
                return
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
        }
    }

    return (
        <main className={styles.container}>
            <h1>New Product</h1>
            <form className={styles.form} action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={38} color='#4e2806' />
                    </span>
                    <input
                        type='file'
                        name='file'
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={handleFile}
                    />
                    {previewImage && (
                        <Image
                            alt='preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>

                <select name='category'>
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type='text'
                    name='name'
                    placeholder='product name'
                    required
                    className={styles.input}
                />
                <input
                    type='text'
                    name='price'
                    placeholder='product price'
                    required
                    className={styles.input}
                />
                <textarea
                    className={styles.input}
                    placeholder='describe product'
                    required
                    name='description'
                />
                <Button name='Register Product' />
            </form>
        </main>
    )
}

export default Form