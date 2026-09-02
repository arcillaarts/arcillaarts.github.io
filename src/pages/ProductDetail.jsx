import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import products from '../data/products';
import { deliveryOptions } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If not enough related in same category, pad with random
  if (relatedProducts.length < 4) {
    const extra = products.filter(p => p.id !== product.id && !relatedProducts.includes(p));
    relatedProducts.push(...extra.slice(0, 4 - relatedProducts.length));
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      <SEO 
        title={product.name} 
        description={product.description}
        image={`https://arcillaarts.github.io/products/${product.id}.jpg`}
        keywords={`${product.name}, handmade jewellery, ${product.category}, ${product.tags.join(', ')}`}
      />
      <div className={styles.productLayout}>
        <div className={styles.imageWrapper}>
          <img 
            src={`./products/${product.id}.jpg`} 
            alt={`${product.name} - Arcilla Arts Handmade`}
            className={styles.detailImage}
          />
        </div>

        <div>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <div className={styles.price}>₹{product.price.toLocaleString('en-IN')}</div>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.tags}>
            {product.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.deliveryInfo}>
            {deliveryOptions.map(option => (
              <div key={option.id} className={styles.deliveryOption}>
                <span>{option.name} ({option.duration})</span>
                <span>{option.price === 0 ? `Free above ₹${option.freeAbove}` : `₹${option.price}`}</span>
              </div>
            ))}
          </div>

          <button onClick={handleAddToCart} className={styles.addToCartBtn}>
            Add to Cart
          </button>

          <ShareButtons title={product.name} url={window.location.href} />
        </div>
      </div>

      <div className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>You May Also Like</h2>
        <div className="row g-4">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
