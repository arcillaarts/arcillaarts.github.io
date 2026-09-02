import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image }) {
  const siteTitle = 'Arcilla Arts by Bidisha';
  const defaultDescription = 'Discover Arcilla Arts by Bidisha. Exquisite handcrafted jewellery blending traditional craftsmanship with contemporary design.';
  const defaultImage = 'https://arcillaarts.github.io/logo.png';
  
  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      
      {/* Twitter */}
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
    </Helmet>
  );
}
