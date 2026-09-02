import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styles from './HeroBanner.module.css';

const rightImages = [
  '/cover/Cover2.jpg',
  '/cover/Cover3.jpg',
  '/cover/Cover4.jpg',
  '/cover/Cover5.jpg'
];

const HeroBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % rightImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={styles.hero}>
      {/* Left Video */}
      <div className={styles.leftMedia}>
        <video 
          src="/cover/Cover1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className={styles.mediaElement}
        />
      </div>

      {/* Right Slideshow */}
      <div className={styles.rightMedia}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={rightImages[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.mediaElement}
            alt="Showcase"
          />
        </AnimatePresence>
      </div>

      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <img src="/logo.png" alt="Arcilla Arts Logo" className={styles.heroLogo} />
        </motion.div>
        <motion.p className={styles.tagline} variants={itemVariants}>
          Handcrafted Jewellery, Made with Love
        </motion.p>
        <motion.div variants={itemVariants}>
          <NavLink to="/shop" className={styles.ctaButton}>
            Shop Now
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
