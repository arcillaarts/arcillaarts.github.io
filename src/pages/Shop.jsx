import React from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';
import products from '../data/products';
import styles from './Shop.module.css';

const Shop = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      <SEO 
        title="Shop" 
        description="Browse our complete collection of handmade jewellery including necklaces, earrings, and traditional sets."
      />
      <div className={styles.header}>
        <h1 className={styles.title}>Our Collection</h1>
        <p className={styles.subtitle}>
          Each piece is handcrafted with love and attention to detail
        </p>
      </div>

      <div className={styles.container}>
        <ProductGrid products={products} showFilters={true} />
      </div>
    </motion.div>
  );
};

export default Shop;
