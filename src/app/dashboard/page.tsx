import React from 'react'
import Orders from './components/orders'
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'
import { OrderProps } from '@/lib/order.type'

const GetOrders = async (): Promise<OrderProps[] | []> => {

  try{
    const token = await getCookieServer()

    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data || []
  } catch(err) {
    console.log(err)
    return []
  }
}

const DashBoard = async () => {

  const orders = await GetOrders()
 
  return (
    <>
    <Orders orders={orders}/>
    </>
  )
}

export default DashBoard