'use client'

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react"
import { toast } from "sonner";

export type OrderItemProps = {
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string | null;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    }
    order: {
        id: string;
        table: number;
        name: string;
        draft: boolean;
        status: boolean;
    }
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export const OrderProvider = ({children}: OrderProviderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState<OrderItemProps[]>([])
    const router = useRouter()

    const onRequestOpen = async (order_id: string) => {
       
        const response = await api.get("/orders/detail", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                order_id: order_id
            }
        })
        setOrder(response.data)
        setIsOpen(true)
    }

    const onRequestClose = () => {
        setIsOpen(false)
    }

    const finishOrder = async (order_id: string) => {
        const token = getCookieClient()

        const data = {
            order_id: order_id,
        }
        
        try {
            await api.put("/order/finish", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch(err) {
            console.log(err);
            toast.error("Falha ao finalizar este pedido")
            return
        }
        toast.success("Pedido realizado com sucesso!")
        router.refresh()
        setIsOpen(false)
    }


    return (
        <OrderContext.Provider value={{isOpen, onRequestOpen, onRequestClose, order, finishOrder }}>
            {children}
        </OrderContext.Provider>
    )
}