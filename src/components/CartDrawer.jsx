import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import { FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleClose = () => {
    setShowCheckout(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{showCheckout ? 'Checkout' : 'Your Cart'}</h2>
              <button className={styles.closeBtn} onClick={handleClose}>
                <FaXmark />
              </button>
            </div>

            {showCheckout ? (
              <CheckoutForm onClose={handleClose} onBack={() => setShowCheckout(false)} />
            ) : (
              <>
                <div className={styles.items}>
                  {cart.length === 0 ? (
                    <div className={styles.emptyCart}>
                      <p>Your cart is empty</p>
                      <button className={styles.checkoutBtn} onClick={handleClose} style={{marginTop: '1rem'}}>Shop Now</button>
                    </div>
                  ) : (
                    cart.map((item) => <CartItem key={item.id} item={item} />)
                  )}
                </div>
                {cart.length > 0 && (
                  <div className={styles.footer}>
                    <div className={styles.total}>
                      <span>Total:</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button className={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
