import { FaFacebook, FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import styles from './SocialFollow.module.css';

const SocialFollow = ({ variant = 'light' }) => {
  return (
    <div className={`${styles.socialLinks} ${styles[variant]}`}>
      <a href="https://www.instagram.com/arcilla__arts_by_bidisha?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Instagram">
        <FaInstagram size={20} />
      </a>
    </div>
  );
};

export default SocialFollow;
