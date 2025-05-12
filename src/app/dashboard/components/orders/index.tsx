'use client'
import { RefreshCw } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderProps } from "@/lib/order.type";
import ModalOrder from "../modal";
import { OrderContext } from "@/providers/order";
import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  orders: OrderProps[];
}

const Orders = ({ orders }: Props) => {
  const {isOpen, onRequestOpen } = use(OrderContext)
  const router = useRouter()


  const handleDetailOrder = async (order_id: string) => {
   await onRequestOpen(order_id)
  }

  const handleRefresh = () => {
    router.refresh()
    toast.success(' order successfully updated!')
  }

  return (
    <>
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1 style={{color:'#4e2806'}}>Last Orders</h1>
        <button>
          <RefreshCw size={24} color="#FF3f4b" onClick={handleRefresh}/>
        </button>
      </section>
      
      <section className={styles.listOrders}>
        {orders.length === 0  && (
          <span className={styles.emptyItem}>There is no request...</span>
        )}
        {orders.map((order) => (
          <button 
          key={order.id} 
          className={styles.orderITem} 
          onClick={() => handleDetailOrder(order.id)}>
          <div className={styles.tag}></div>
          <span>Order {order.table}</span>
          </button>
        ))}
      </section>
    </main>
    {isOpen && <ModalOrder/>}
    </>
  );
};

export default Orders;
