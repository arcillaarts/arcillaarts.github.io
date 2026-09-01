import { FaWhatsapp, FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import styles from './ShareButtons.module.css';

const ShareButtons = ({ product, url, title }) => {
  // Support both product object and direct url/title props
  const shareUrl = url || (product ? `${window.location.origin}${window.location.pathname}#/product/${product.id}` : window.location.href);
  const shareTitle = title || (product ? `Check out ${product.name} on Arcilla Arts! ₹${product.price}` : 'Check out Arcilla Arts!');

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`, '_blank', 'width=800,height=600');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=800,height=600');
  };

  const handleX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=800,height=600');
  };

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied! Share on Instagram');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Share:</span>
      <div className={styles.buttons}>
        <button onClick={handleWhatsApp} className={styles.button} aria-label="Share on WhatsApp">
          <FaWhatsapp />
        </button>
        <button onClick={handleFacebook} className={styles.button} aria-label="Share on Facebook">
          <FaFacebook />
        </button>
        <button onClick={handleX} className={styles.button} aria-label="Share on X">
          <FaXTwitter />
        </button>
        <button onClick={handleInstagram} className={styles.button} aria-label="Copy link for Instagram">
          <FaInstagram />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
