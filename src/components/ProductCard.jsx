import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ShareButtons from './ShareButtons';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast.success(`${product.name} added to cart`);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <motion.div
        className={styles.card}
        onClick={handleCardClick}
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.imageWrapper}>
          <div className={styles.image} style={{ background: product.image }}></div>
          <span className={styles.badge}>{product.category}</span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
          <button className={styles.addButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        <div className={styles.shareRow} onClick={handleShareClick}>
          <ShareButtons url={`${window.location.origin}/#/product/${product.id}`} title={product.name} />
        </div>
      </motion.div>
    </div>
  );
}
