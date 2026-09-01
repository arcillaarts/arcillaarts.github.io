import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaXmark, FaCartShopping } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import SocialFollow from './SocialFollow';
import styles from './Navbar.module.css';

const Navbar = ({ onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Mobile Hamburger */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
        </button>

        <div className={styles.logoArea}>
          <NavLink to="/" className={styles.logoLink} onClick={closeMobileMenu}>
            <img src="./logo.png" alt="Arcilla Arts Logo" className={styles.logoImage} />
          </NavLink>
        </div>

        {/* Desktop Nav Links */}
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <NavLink to="/" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/shop" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} onClick={closeMobileMenu}>Shop</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} onClick={closeMobileMenu}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} onClick={closeMobileMenu}>Contact</NavLink>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <div className={styles.socialDesktop}>
            <SocialFollow variant="light" />
          </div>
          <button 
            className={styles.cartButton} 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <FaSearch size={20} />
          </button>
          <button 
            className={styles.cartButton} 
            onClick={onOpenCart}
            aria-label="Open cart"
          >
            <FaCartShopping size={20} />
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input 
              type="text" 
              placeholder="Search for products, colors, materials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            <button type="submit" className={styles.searchSubmit}><FaSearch /></button>
            <button type="button" className={styles.searchClose} onClick={() => setIsSearchOpen(false)}><FaXmark /></button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
