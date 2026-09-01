export const getProductUrl = (productId) => {
  const basePath = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
  return `${window.location.origin}${basePath}#/product/${productId}`;
};

export const shareOnWhatsApp = (product, siteUrl) => {
  const url = siteUrl || getProductUrl(product.id);
  const text = `Check out ${product.name} on Arcilla Arts! ₹${product.price} - ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'width=800,height=600');
};

export const shareOnFacebook = (product, siteUrl) => {
  const url = siteUrl || getProductUrl(product.id);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=800,height=600');
};

export const shareOnX = (product, siteUrl) => {
  const url = siteUrl || getProductUrl(product.id);
  const text = `Check out ${product.name} on Arcilla Arts! ₹${product.price}`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'width=800,height=600');
};

export const shareOnInstagram = async (product, siteUrl) => {
  const url = siteUrl || getProductUrl(product.id);
  try {
    await navigator.clipboard.writeText(url);
    return { success: true, message: 'Link copied to clipboard! You can now share it on Instagram.' };
  } catch (err) {
    return { success: false, message: 'Failed to copy link.' };
  }
};
