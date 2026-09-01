import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products';
import styles from './TagCloud.module.css';

export default function TagCloud() {
  const navigate = useNavigate();

  const tagCounts = useMemo(() => {
    const counts = {};
    products.forEach(product => {
      product.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const handleTagClick = (tag) => {
    navigate(`/shop?tag=${encodeURIComponent(tag)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.tagCloudSection}>
      <div className={styles.container}>
        <h3 className={styles.title}>Explore by Tags</h3>
        <div className={styles.cloud}>
          {tagCounts.map(([tag, count]) => {
            // Determine size based on frequency
            const sizeClass = count > 10 ? styles.large : count > 4 ? styles.medium : styles.small;
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`${styles.tag} ${sizeClass}`}
              >
                {tag} <span className={styles.count}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
