export const categories = ['All', 'Earrings', 'Necklaces', 'Bracelets', 'Rings', 'Anklets'];

export const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', duration: '5-7 days', price: 0, freeAbove: 499 },
  { id: 'express', name: 'Express Delivery', duration: '2-3 days', price: 79, freeAbove: null }
];

const generateProducts = () => {
  const categoriesInfo = {
    Earrings: { start: 1, count: 12 },
    Necklaces: { start: 13, count: 10 },
    Bracelets: { start: 23, count: 10 },
    Rings: { start: 33, count: 10 },
    Anklets: { start: 43, count: 8 }
  };

  const names = {
    Earrings: ['Kundan Drop Earrings', 'Meenakari Jhumkas', 'Temple Bell Earrings', 'Oxidised Silver Chandbalis', 'Terracotta Studs', 'Pearl Cascade Drops', 'Gold Plated Hoops', 'Ruby Polki Studs', 'Tribal Silver Danglers', 'Emerald Leaf Earrings', 'Enamel Lotus Jhumkas', 'Antique Coin Earrings'],
    Necklaces: ['Temple Choker', 'Polki Long Hararam', 'Kundan Choker Set', 'Pearl Stranded Mala', 'Oxidised Silver Hasli', 'Terracotta Bead Necklace', 'Mango Motif Necklace', 'Ruby Pendant Chain', 'Navratna Statement Piece', 'Antique Gold Choker'],
    Bracelets: ['Meenakari Bangle', 'Kundan Kada', 'Oxidised Silver Cuff', 'Temple Design Bangle', 'Pearl Charm Bracelet', 'Navratna Bangle', 'Terracotta Hand Painted Cuff', 'Gold Plated Chain Bracelet', 'Ruby Embedded Kada', 'Tribal Silver Bangle'],
    Rings: ['Kundan Cocktail Ring', 'Oxidised Silver Statement Ring', 'Navratna Ring', 'Meenakari Band', 'Temple Motif Ring', 'Pearl Cluster Ring', 'Ruby Solitaire Ring', 'Gold Plated Midi Ring', 'Terracotta Adjustable Ring', 'Antique Gold Band'],
    Anklets: ['Silver Bell Payal', 'Kundan Anklet', 'Pearl Drop Payal', 'Oxidised Silver Chain Anklet', 'Meenakari Bridal Payal', 'Gold Plated Simple Anklet', 'Tribal Bead Anklet', 'Terracotta Charm Payal']
  };

  const tagsPool = ['handmade', 'traditional', 'festive', 'bridal', 'everyday wear', 'statement', 'classic', 'boho'];
  const gradients = [
    'linear-gradient(135deg, #3E2A23 0%, #D8C2A5 100%)',
    'linear-gradient(135deg, #B65F45 0%, #F5EFE5 100%)',
    'linear-gradient(135deg, #8A5140 0%, #D8C2A5 100%)',
    'linear-gradient(135deg, #3E2A23 0%, #B65F45 100%)',
    'linear-gradient(135deg, #D8C2A5 0%, #F5EFE5 100%)'
  ];

  let productsArray = [];
  let id = 1;
  const featuredIds = [1, 5, 14, 19, 25, 34, 39, 44];

  for (const [cat, info] of Object.entries(categoriesInfo)) {
    for (let i = 0; i < info.count; i++) {
      const name = names[cat][i];
      // Generate deterministic pseudo-random price and tags based on ID so they stay consistent
      const price = 200 + ((id * 37) % 2300);
      const desc = `Beautifully handcrafted ${name} perfect for any occasion. Made by skilled artisans with attention to detail.`;
      const grad = gradients[id % gradients.length];
      const tag1 = tagsPool[id % tagsPool.length];
      const tag2 = tagsPool[(id + 3) % tagsPool.length];
      const featured = featuredIds.includes(id);

      productsArray.push({
        id: id,
        name: name,
        category: cat,
        price: price,
        description: desc,
        image: grad,
        tags: [...new Set([tag1, tag2])],
        featured: featured
      });
      id++;
    }
  }
  return productsArray;
};

const products = generateProducts();
export default products;
