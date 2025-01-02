import { getCookieServer } from '@/lib/cookieServer'
import Form from './components/form'
import { api } from '@/services/api'

const Product = async () => {

  const token = await getCookieServer()
  const response = await api.get('/category', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <Form categories={response.data}/>
  )
}

export default Product