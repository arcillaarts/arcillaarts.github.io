import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { sendContactEmail } from '../utils/emailService';
import styles from './NotifyModal.module.css';

const NotifyModal = ({ isOpen, onClose, product }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [design, setDesign] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !phone || !design) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);

    try {
      // Re-using the contact email template
      await sendContactEmail({
        name: `Custom Request: ${product.name}`,
        email: email,
        phone: phone, 
        message: `Desired Design:\n${design}\n\n* Note: Customer was instructed to send reference images separately if they have any.`
      });
      toast.success('Your request has been sent! We will contact you soon.');
      onClose();
    } catch (error) {
      toast.error('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          className={styles.modal}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
          <h2 className={styles.title}>Notify Me & Customise</h2>
          <p className={styles.subtitle}>
            Interested in <strong>{product.name}</strong>? Let us know your desired design and we'll get back to you!
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Your Email ID</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.field}>
              <label>Phone Number</label>
              <input 
                type="tel" 
                required 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="Enter your contact number"
              />
            </div>
            <div className={styles.field}>
              <label>Desired Design</label>
              <textarea 
                required 
                value={design} 
                onChange={e => setDesign(e.target.value)} 
                placeholder="Describe how you'd like your jewellery customised (colors, flowers, style, etc.)"
                rows="4"
              ></textarea>
            </div>
            
            <div className={styles.attachmentNote}>
              <strong>Have a reference image?</strong><br />
              Please email it directly to <a href="mailto:info.arcillaarts@gmail.com">info.arcillaarts@gmail.com</a> after submitting this form.
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotifyModal;
