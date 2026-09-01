import { FaFacebook, FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import styles from './SocialFollow.module.css';

const SocialFollow = ({ variant = 'light' }) => {
  return (
    <div className={`${styles.socialLinks} ${styles[variant]}`}>
      <a href="#" className={styles.iconLink} aria-label="Facebook">
        <FaFacebook size={20} />
      </a>
      <a href="#" className={styles.iconLink} aria-label="Instagram">
        <FaInstagram size={20} />
      </a>
      <a href="#" className={styles.iconLink} aria-label="WhatsApp">
        <FaWhatsapp size={20} />
      </a>
      <a href="#" className={styles.iconLink} aria-label="X">
        <FaXTwitter size={20} />
      </a>
    </div>
  );
};

export default SocialFollow;
