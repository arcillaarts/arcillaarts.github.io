import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { sendOrderEmail } from '../utils/emailService';
import { QRCodeSVG } from 'qrcode.react';
import OrderConfirmation from './OrderConfirmation';
import toast from 'react-hot-toast';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm({ onClose, onBack }) {
  const { cart, dispatch, cartTotal: subtotal } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [selectedDelivery, setSelectedDelivery] = useState('Standard');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('details'); // details, payment, confirmation
  const [utrNumber, setUtrNumber] = useState('');
  
  let deliveryCharge = 0;
  if (selectedDelivery === 'Standard') {
    deliveryCharge = subtotal >= 499 ? 0 : 50;
  } else {
    deliveryCharge = 79;
  }

  const grandTotal = subtotal + deliveryCharge;

  // Placeholder UPI details - User must replace these
  const UPI_ID = 'your_upi_id@bank';
  const PAYEE_NAME = 'Arcilla Arts';
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${grandTotal}&cu=INR&tn=ArcillaArtsOrder`;

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill all details');
      return;
    }
    setStep('payment');
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!utrNumber.trim()) {
      toast.error('Please enter the UTR / Reference Number');
      return;
    }
    setLoading(true);
    
    try {
      await sendOrderEmail({
        ...formData,
        cart: cart,
        total: subtotal,
        deliveryCharge: deliveryCharge,
        utr: utrNumber
      });
      setStep('confirmation');
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      toast.error('Failed to send email. Proceeding anyway.');
      setStep('confirmation');
      dispatch({ type: 'CLEAR_CART' });
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirmation') {
    return <OrderConfirmation email={formData.email} onClose={onClose} />;
  }

  if (step === 'payment') {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
      <div className={styles.form}>
        <button className={styles.backBtn} onClick={() => setStep('details')}>&larr; Back to Details</button>
        <div className={styles.paymentContainer}>
          <h3 className={styles.heading} style={{ textAlign: 'center' }}>Complete Your Payment</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-clay)' }}>
            Amount to Pay: <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <QRCodeSVG value={upiUrl} size={180} />
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-dark)', textAlign: 'center' }}>
              Scan this QR code with any UPI app (GPay, PhonePe, Paytm)<br/>
              <strong>UPI ID:</strong> {UPI_ID}
            </p>

            {isMobile && (
              <a href={upiUrl} className={styles.submitBtn} style={{ textDecoration: 'none', textAlign: 'center', width: '100%', display: 'block' }}>
                Open UPI App to Pay
              </a>
            )}
          </div>

          <form onSubmit={handleConfirmPayment}>
            <div className={styles.field}>
              <label className={styles.label}>Enter UTR / Reference Number (12 Digits)</label>
              <input 
                className={styles.input} 
                type="text" 
                required 
                value={utrNumber} 
                onChange={e => setUtrNumber(e.target.value)} 
                placeholder="e.g. 123456789012"
              />
              <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>After paying, find the 12-digit UTR/Ref number in your app and enter it here so we can verify your payment.</small>
            </div>
            
            <button type="submit" className={styles.submitBtn} disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Confirming...' : 'I Have Paid'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <button className={styles.backBtn} onClick={onBack}>&larr; Back to Cart</button>
      <form onSubmit={handleProceedToPayment}>
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
              Express (₹79)
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

        <button type="submit" className={styles.submitBtn}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
