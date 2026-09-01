import React from 'react';
import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';

export default function OrderConfirmation({ email, onClose }) {
  const navigate = useNavigate();
  const reference = `AA-${Date.now().toString().slice(-6)}`;

  const handleContinue = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <FaCircleCheck className={styles.checkmark} />
      </motion.div>
      <h2 className={styles.title}>Order Placed Successfully!</h2>
      <p className={styles.message}>Thank you for shopping with Arcilla Arts</p>
      <div className={styles.reference}>Reference: {reference}</div>
      <p className={styles.emailNote}>You will receive a confirmation at {email}</p>
      <button className={styles.continueBtn} onClick={handleContinue}>
        Continue Shopping
      </button>
    </div>
  );
}
