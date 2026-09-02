import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import styles from './About.module.css';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      <SEO 
        title="About Us" 
        description="Learn about the story of Arcilla Arts, founded by Bidisha. Discover our passion for handcrafted traditional and contemporary jewellery."
      />
      <div className={styles.container}>
        <h1 className={styles.title}>About Arcilla Arts</h1>
        
        <section className={styles.section}>
          <div className={styles.contentGrid}>
            <div className={styles.textBlock}>
              <h2 className={styles.subtitle}>Our Story</h2>
              <p>
                "Arcilla" means clay in Spanish — representing the raw, earthy essence of handmade art. 
                Founded by Bidisha, a passionate artisan who believes in preserving traditional Indian craftsmanship.
              </p>
              <p>
                Every piece crafted at Arcilla Arts tells a unique story of heritage, creativity, and dedication. 
                We bring together timeless techniques and contemporary designs to create jewelry that speaks to the modern soul.
              </p>
            </div>
            <div className={styles.imageBlock} style={{ background: 'linear-gradient(135deg, #D8C2A5, #8A5140)' }}>
              {/* Decorative image placeholder */}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.contentGrid} ${styles.reverse}`}>
            <div className={styles.textBlock}>
              <h2 className={styles.subtitle}>Meet Bidisha</h2>
              <p>
                Bidisha's journey into handmade jewelry started as a childhood fascination with traditional art forms. 
                Over the years, she honed her skills, transforming a simple passion into a thriving studio of creativity.
              </p>
              <p>
                Her vision is to create pieces that are not just accessories, but intimate expressions of personal style and cultural pride.
              </p>
            </div>
            <div className={styles.imageBlock} style={{ background: 'linear-gradient(135deg, #B65F45, #F5EFE5)' }}>
              {/* Decorative image placeholder */}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitleCentered}>Our Process</h2>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.icon}>🎨</div>
              <h3>Design</h3>
              <p>Conceptualizing unique patterns inspired by nature and heritage.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.icon}>🔨</div>
              <h3>Craft</h3>
              <p>Meticulously hand-shaping and assembling raw materials into art.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.icon}>✨</div>
              <h3>Quality Check</h3>
              <p>Ensuring every piece meets our strict standards of excellence.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.icon}>📦</div>
              <h3>Deliver</h3>
              <p>Carefully packaging and sending your new favorite piece to you.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitleCentered}>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Handcrafted Quality</h3>
              <p>We believe in the beauty of imperfections that come with authentic handmade artistry.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Sustainable Practices</h3>
              <p>Committed to eco-friendly packaging and ethically sourced materials.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Customer First</h3>
              <p>Your joy is our success. We prioritize a seamless and personalized shopping experience.</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
