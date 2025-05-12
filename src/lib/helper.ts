import { OrderItemProps } from "@/providers/order";

export const calculateTotalOrder = (orders: OrderItemProps[]) => {
    return orders.reduce((total, item) => {
        //@ts-ignore
        const itemTotal = parseFloat(item.product.price) + item.amount;
        return total + itemTotal
    }, 0)
}

