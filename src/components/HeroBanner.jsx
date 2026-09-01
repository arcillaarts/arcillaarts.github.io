import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styles from './HeroBanner.module.css';

const HeroBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <img src="./logo.png" alt="Arcilla Arts Logo" className={styles.heroLogo} />
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
