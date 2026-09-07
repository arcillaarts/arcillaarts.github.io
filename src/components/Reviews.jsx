import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Please enter both name and message');
      return;
    }
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp()
      });
      setName('');
      setMessage('');
      toast.success('Thank you for your review!');
    } catch (error) {
      console.error('Error adding review: ', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Customer Love</h2>
          <p>Read what others are saying about Arcilla Arts</p>
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.formContainer}>
            <h3>Leave a Review</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
              />
              <textarea 
                placeholder="Your Message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={500}
                rows={4}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          <div className={styles.reviewsList}>
            {reviews.length === 0 ? (
              <p className={styles.noReviews}>Be the first to leave a review!</p>
            ) : (
              <div className={styles.scrollingArea}>
                {reviews.map((review) => (
                  <motion.div 
                    key={review.id} 
                    className={styles.reviewCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={styles.quoteIcon}>"</div>
                    <p className={styles.reviewMessage}>{review.message}</p>
                    <p className={styles.reviewName}>- {review.name}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
