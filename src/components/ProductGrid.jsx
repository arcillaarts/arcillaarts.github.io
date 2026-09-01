import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../data/products';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, showFilters = true }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  
  const activeCategory = searchParams.get('category') || 'All';
  const activeTag = searchParams.get('tag') || null;
  const searchQuery = searchParams.get('search') || '';

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter((product) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(query) && !product.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    // Tag filter
    if (activeTag && !product.tags.includes(activeTag)) {
      return false;
    }
    
    // Category filter
    if (activeCategory !== 'All' && product.category !== activeCategory) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // default
  });

  return (
    <div>
      {showFilters && (
        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterPill} ${activeCategory === category ? styles.activePill : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      )}

      {showFilters && (searchQuery || activeTag) && (
        <div className={styles.activeFilters}>
          {searchQuery && (
            <span className={styles.activeFilterBadge}>
              Search: {searchQuery}
              <button onClick={() => { searchParams.delete('search'); setSearchParams(searchParams); }}>×</button>
            </span>
          )}
          {activeTag && (
            <span className={styles.activeFilterBadge}>
              Tag: {activeTag}
              <button onClick={() => { searchParams.delete('tag'); setSearchParams(searchParams); }}>×</button>
            </span>
          )}
        </div>
      )}

      <motion.div
        className="row g-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
          },
        }}
      >
        <AnimatePresence>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
