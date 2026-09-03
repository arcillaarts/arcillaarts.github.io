import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { sendOrderEmail } from '../utils/emailService';
import OrderConfirmation from './OrderConfirmation';
import toast from 'react-hot-toast';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm({ onClose, onBack }) {
  const { cart, dispatch, cartTotal: subtotal } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [selectedDelivery, setSelectedDelivery] = useState('Standard');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  let deliveryCharge = 0;
  if (selectedDelivery === 'Standard') {
    deliveryCharge = subtotal >= 499 ? 0 : 59;
  } else {
    deliveryCharge = 89;
  }

  const grandTotal = subtotal + deliveryCharge;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill all details');
      return;
    }
    setLoading(true);
    
    try {
      await sendOrderEmail({
        ...formData,
        cart: cart,
        total: subtotal,
        deliveryCharge: deliveryCharge,
      });
      setShowConfirmation(true);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      toast.error('Failed to send email. Proceeding anyway.');
      setShowConfirmation(true);
      dispatch({ type: 'CLEAR_CART' });
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return <OrderConfirmation email={formData.email} onClose={onClose} />;
  }

  return (
    <div className={styles.form}>
      <button className={styles.backBtn} onClick={onBack}>&larr; Back to Cart</button>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>
          <input className={styles.input} type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Contact Number</label>
          <div className={styles.phoneWrapper}>
            <span className={styles.phonePrefix}>+91</span>
            <input className={`${styles.input} ${styles.phoneInput}`} type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>

        <div className={styles.summary}>
          <h3 className={styles.heading}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className={styles.summaryItem}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
          
          <div className={styles.deliveryOptions}>
            <label className={styles.radioLabel}>
              <input type="radio" name="delivery" value="Standard" checked={selectedDelivery === 'Standard'} onChange={() => setSelectedDelivery('Standard')} />
              Standard (Free over ₹499)
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="delivery" value="Express" checked={selectedDelivery === 'Express'} onChange={() => setSelectedDelivery('Express')} />
              Express (₹89)
            </label>
          </div>

          <div className={styles.summaryItem}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
          </div>
          <div className={styles.grandTotal}>
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
