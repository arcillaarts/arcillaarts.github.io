import React from 'react';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrashCan } from 'react-icons/fa6';
import styles from './CartItem.module.css';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const updateQuantity = (quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });
  };

  const removeItem = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
  };

  return (
    <div className={styles.item}>
      <img src={`./products/${item.id}.jpg`} alt={item.name} className={styles.image} />
      <div className={styles.details}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.price}>₹{item.price.toLocaleString('en-IN')}</div>
        <div className={styles.controls}>
          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.quantity - 1)}>
            <FaMinus />
          </button>
          <span className={styles.qty}>{item.quantity}</span>
          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.quantity + 1)}>
            <FaPlus />
          </button>
        </div>
      </div>
      <button className={styles.removeBtn} onClick={removeItem}>
        <FaTrashCan />
      </button>
    </div>
  );
}
