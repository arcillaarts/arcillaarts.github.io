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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const totalSlides = isMobile ? rightImages.length + 2 : rightImages.length; // +2 for logo and video on mobile
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); 
    return () => clearInterval(timer);
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // On desktop, the right slideshow uses the currentSlide directly (modulo length)
  const desktopImageIndex = currentSlide % rightImages.length;

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        {/* DESKTOP LEFT MEDIA */}
        {!isMobile && (
          <div className={styles.leftMedia}>
            <video src="/cover/Cover1.mp4" autoPlay loop muted playsInline className={styles.mediaElement} />
          </div>
        )}

        {/* DESKTOP OR MOBILE LOGO (Slide 0 on mobile) */}
        <AnimatePresence mode="wait">
          {(!isMobile || currentSlide === 0) && (
            <motion.div 
              key="content"
              className={styles.content}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.8 }}
            >
              <motion.div variants={itemVariants}>
                <img src="/logo.png" alt="Arcilla Arts Logo" className={styles.heroLogo} />
              </motion.div>
              <motion.p className={styles.tagline} variants={itemVariants}>
                Handcrafted Jewellery, Made with Love
              </motion.p>
              <motion.div variants={itemVariants}>
                <NavLink to="/shop" className={styles.ctaButton}>Shop Now</NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE VIDEO (Slide 1 on mobile) */}
        <AnimatePresence>
          {(isMobile && currentSlide === 1) && (
            <motion.div 
              key="mobileVideo"
              className={styles.mobileMedia}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <video src="/cover/Cover1.mp4" autoPlay loop muted playsInline className={styles.mediaElement} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESKTOP RIGHT MEDIA OR MOBILE IMAGES (Slides 2+ on mobile) */}
        <AnimatePresence mode="wait">
          {(!isMobile || currentSlide >= 2) && (
            <motion.div 
              key={!isMobile ? "desktopRight" : `mobileImg-${currentSlide}`}
              className={isMobile ? styles.mobileMedia : styles.rightMedia}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={rightImages[isMobile ? currentSlide - 2 : desktopImageIndex]}
                className={styles.mediaElement}
                alt="Showcase"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default HeroBanner;
