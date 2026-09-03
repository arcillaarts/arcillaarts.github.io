import { NavLink } from 'react-router-dom';
import SocialFollow from './SocialFollow';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row g-4">
          {/* Column 1: Brand */}
          <div className="col-12 col-md-6 col-lg-3">
            <img src="./footer-logo.jpg" alt="Arcilla Arts Logo" style={{ height: '100px', marginBottom: '1rem', borderRadius: '50%' }} />
            <p className={styles.text}>
              Handcrafted jewellery made with love by Bidisha. Every piece is unique and tells a story.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <h3 className={styles.heading}>Quick Links</h3>
          <nav className={styles.nav}>
            <NavLink to="/" className={styles.link}>Home</NavLink>
            <NavLink to="/shop" className={styles.link}>Shop</NavLink>
            <NavLink to="/about" className={styles.link}>About</NavLink>
            <NavLink to="/contact" className={styles.link}>Contact</NavLink>
          </nav>
        </div>

        {/* Column 3: Categories */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <h3 className={styles.heading}>Categories</h3>
          <nav className={styles.nav}>
            <NavLink to="/shop?category=Earrings" className={styles.link}>Earrings</NavLink>
            <NavLink to="/shop?category=Necklaces" className={styles.link}>Necklaces</NavLink>
            <NavLink to="/shop?category=Bracelets" className={styles.link}>Bracelets</NavLink>
            <NavLink to="/shop?category=Rings" className={styles.link}>Rings</NavLink>
            <NavLink to="/shop?category=Anklets" className={styles.link}>Anklets</NavLink>
          </nav>
        </div>

        {/* Column 4: Connect */}
        <div className="col-12 col-md-6 col-lg-3">
          <h3 className={styles.heading}>Connect</h3>
          <SocialFollow variant="dark" />
          <p className={styles.text} style={{ marginTop: '1rem' }}>
            <a href="mailto:info.arcillaarts@gmail.com" className={styles.link}>
              info.arcillaarts@gmail.com
            </a>
          </p>
        </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} Arcilla Arts. All rights reserved. Handcrafted with ♥
      </div>
    </footer>
  );
};

export default Footer;
