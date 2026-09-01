import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SocialFollow from '../components/SocialFollow';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }
    // Simulate send
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
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
              <button type="submit" className={styles.submitBtn}>
                Send Message
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
