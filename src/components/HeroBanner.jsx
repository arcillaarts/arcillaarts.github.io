import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const timerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalMobileSlides = rightImages.length + 2;

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const totalSlides = isMobile ? totalMobileSlides : rightImages.length;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
  }, [isMobile, totalMobileSlides]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (isMobile) {
      setCurrentSlide(prev => (prev === 0 ? totalMobileSlides - 1 : prev - 1));
    } else {
      setCurrentSlide(prev => (prev === 0 ? rightImages.length - 1 : prev - 1));
    }
    startAutoPlay(); // Reset timer
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (isMobile) {
      setCurrentSlide(prev => (prev + 1) % totalMobileSlides);
    } else {
      setCurrentSlide(prev => (prev + 1) % rightImages.length);
    }
    startAutoPlay(); // Reset timer
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const desktopImageIndex = currentSlide % rightImages.length;

  return (
    <section className={styles.hero}>
      {isMobile ? (
        <div className={styles.heroContainer}>
          <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev}>
            <FaChevronLeft />
          </button>
          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
            <FaChevronRight />
          </button>
          <AnimatePresence mode="wait">
            {currentSlide === 0 && (
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
            {currentSlide === 1 && (
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
            {currentSlide >= 2 && (
              <motion.div 
                key={`mobileImg-${currentSlide}`}
                className={styles.mobileMedia}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={rightImages[currentSlide - 2]}
                  className={styles.mediaElement}
                  alt="Showcase"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className={styles.desktopContainer}>
          <div className={styles.mediaRow}>
            <div className={styles.leftMedia}>
              <video src="/cover/Cover1.mp4" autoPlay loop muted playsInline className={styles.mediaElement} />
            </div>
            
            <div className={styles.logoWrapper}>
              <img src="/logo.png" alt="Arcilla Arts Logo" className={styles.heroLogo} />
            </div>

            <div className={styles.rightMediaContainer}>
              <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev}>
                <FaChevronLeft />
              </button>
              <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
                <FaChevronRight />
              </button>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`desktopImg-${desktopImageIndex}`}
                  className={styles.rightMedia}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={rightImages[desktopImageIndex]}
                    className={styles.mediaElement}
                    alt="Showcase"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div 
            className={styles.textRow}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p className={styles.tagline} variants={itemVariants}>
              Handcrafted Jewellery, Made with Love
            </motion.p>
            <motion.div variants={itemVariants}>
              <NavLink to="/shop" className={styles.ctaButton}>Shop Now</NavLink>
            </motion.div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
