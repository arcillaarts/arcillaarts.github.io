import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SocialFollow from '../components/SocialFollow';
import SEO from '../components/SEO';
import { sendContactEmail } from '../utils/emailService';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await sendContactEmail(formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      <SEO 
        title="Contact Us" 
        description="Get in touch with Arcilla Arts. We'd love to hear from you regarding custom orders, queries, or just to say hello!"
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>We'd love to hear from you</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.infoCard}>
              <h3>Contact Information</h3>
              <div className={styles.infoItem}>
                <strong>Email:</strong>
                <a href="mailto:info.arcillaarts@gmail.com">info.arcillaarts@gmail.com</a>
              </div>
              <div className={styles.infoItem}>
                <strong>Location:</strong>
                <span>Kolkata, India</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Working Hours:</strong>
                <span>Mon-Sat, 10 AM - 7 PM IST</span>
              </div>
            </div>

            <div className={styles.socialCard}>
              <h3>Follow Us</h3>
              <SocialFollow />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
