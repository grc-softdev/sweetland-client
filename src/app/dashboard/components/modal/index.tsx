"use client";
import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderContext } from "@/providers/order";
import { use } from "react";
import { calculateTotalOrder } from "@/lib/helper";
import { formatCurrency } from "@/utilities/formatCurrency";

const ModalOrder = () => {
  const { order, onRequestClose, finishOrder } = use(OrderContext);

  const handleFinishOrder = async () => {
    await finishOrder(order[0].order.id);
  };

  return (
    <dialog className={styles.dialogContainer} open>
      <section className={styles.dialogContent}>
        <button
          className={styles.dialogBack}
          onClick={onRequestClose}
          aria-label="Close"
        >
          <X size={28} color="#FF3f4b" />
        </button>

        <article className={styles.container}>
          <h2 className={styles.detail_title}>Order Details</h2>
          <div className={styles.container_details}>
            <div className={styles.name}>
              <span className={styles.table}>
                Order <b>{order[0].order.table}</b>
              </span>
            </div>

            {order.map((item) => (
              <section className={styles.item} key={item.id}>
                <div className={styles.itemd}>
                  <img
                    src={`${item.product.banner}`}
                    width={50}
                    height={50} 
                    alt={`image of ${item.product.name}`}
                    style={{ borderRadius: "4px" }}
                  />

                  <span className={styles.desc}>
                    <b>{item.product.name}</b>
                    <b>x {item.amount}</b>
                  </span>
                  <b>{formatCurrency((item.product.price) * item.amount)}</b>
                </div>
              </section>
            ))}

            <h3 className={styles.total}>
              Total: {formatCurrency(calculateTotalOrder(order))}
            </h3>

            <button className={styles.buttonOrder} onClick={handleFinishOrder}>
              Finish Order
            </button>
          </div>
        </article>
      </section>
    </dialog>
  );
};

export default ModalOrder;
