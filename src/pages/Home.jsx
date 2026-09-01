import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';
import styles from './Home.module.css';

const categories = [
  { name: 'Earrings', color: 'linear-gradient(135deg, #F5EFE5, #D8C2A5)' },
  { name: 'Necklaces', color: 'linear-gradient(135deg, #E6D5C3, #B65F45)' },
  { name: 'Bracelets', color: 'linear-gradient(135deg, #F3E9DD, #8A5140)' },
  { name: 'Rings', color: 'linear-gradient(135deg, #EAD7C6, #D8C2A5)' },
  { name: 'Anklets', color: 'linear-gradient(135deg, #E5D5CB, #B65F45)' }
];

const features = [
  {
    title: 'Handcrafted with Love',
    description: 'Every piece is meticulously handcrafted by skilled artisans.',
    icon: '❤️'
  },
  {
    title: 'Authentic Materials',
    description: 'We source only the finest and most authentic materials.',
    icon: '✨'
  },
  {
    title: 'Pan-India Delivery',
    description: 'Delivering happiness across all of India, straight to your door.',
    icon: '🚚'
  }
];

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      <HeroBanner />
      
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Collection</h2>
          <ProductGrid products={featuredProducts} showFilters={false} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.categorySection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <motion.div 
            className={styles.categoryGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div key={category.name} variants={itemVariants}>
                <NavLink 
                  to={`/shop?category=${category.name}`}
                  className={styles.categoryCard}
                  style={{ background: category.color }}
                >
                  <h3>{category.name}</h3>
                  <span className={styles.exploreText}>Explore &rarr;</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Arcilla Arts</h2>
          <div className={styles.featureGrid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
