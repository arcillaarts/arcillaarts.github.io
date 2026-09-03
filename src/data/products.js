export const categories = ['All', 'Sets', 'Pendants', 'Earrings', 'Fabric'];

export const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', duration: '5-7 days', price: 59, freeAbove: 499 },
  { id: 'express', name: 'Express Delivery', duration: '2-3 days', price: 89, freeAbove: null }
];

const rawData = [
  { id: 1, name: "Durga On Kulo Clay Locket & Earring", price: 370 },
  { id: 2, name: "Pink Clay Locket & Earring", price: 170 },
  { id: 3, name: "Kolkata Taxi Clay Locket & Earring", price: 175 },
  { id: 4, name: "Dailywear Clay Pendant", price: 50 },
  { id: 5, name: "Fish Clay Locket & Earring", price: 150 },
  { id: 6, name: "Flower Blue Clay Locket & Earring", price: 170 },
  { id: 7, name: "Folk Culture Clay Locket & Earring", price: 175 },
  { id: 8, name: "Bengal Art Clay Locket & Earring", price: 170 },
  { id: 9, name: "Flower Art On Kulo Clay Locket", price: 130 },
  { id: 10, name: "Fish Seagreen Clay Locket", price: 36 },
  { id: 11, name: "Owl Green Clay Locket", price: 36 },
  { id: 12, name: "Peacock Terracotta Locket & Earring", price: 175 },
  { id: 13, name: "Floral Green Clay Locket", price: 36 },
  { id: 14, name: "Cowrie Red Fabric Locket & Earring", price: 120 },
  { id: 15, name: "Cowrie Blue Fabric Locket & Earring", price: 120 },
  { id: 16, name: "Cowrie Pink Fabric Locket & Earring", price: 150 },
  { id: 17, name: "Durga Bamboo Locket", price: 130 },
  { id: 18, name: "Durga Kulo Locket", price: 130 },
  { id: 19, name: "Durga Face Grey Clay Locket & Earring", price: 200 },
  { id: 20, name: "Folk Clay Locket & Earring", price: 150 },
  { id: 21, name: "Flower Yellow Terracotta Locket & Earring", price: 170 },
  { id: 22, name: "Round Black Terracotta Pendant", price: 65 },
  { id: 23, name: "Sunrise Black Terracotta Pendant", price: 65 },
  { id: 24, name: "Chemical Bead Blue Pendant", price: 50 },
  { id: 25, name: "Chemical Bead Red Pendant", price: 50 },
  { id: 26, name: "Kite Yellow Clay Earring", price: 35 },
  { id: 27, name: "Parrot Green Clay Earring", price: 45 },
  { id: 28, name: "Bird Green Clay Earring", price: 45 },
  { id: 29, name: "Peacock Red Clay Earring", price: 45 },
  { id: 30, name: "Sunflower Terracotta Locket & Earring", price: 170 },
  { id: 31, name: "Floral Clay Locket & Earring", price: 170 }
];

const determineCategory = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('fabric')) return 'Fabric';
  if (lowerName.includes('earring') && !lowerName.includes('locket')) return 'Earrings';
  if (lowerName.includes('locket & earring') || lowerName.includes('set')) return 'Sets';
  return 'Pendants';
};

const products = rawData.map(item => {
  const lowerName = item.name.toLowerCase();
  
  // Colors
  const colorKeywords = ['pink', 'blue', 'seagreen', 'green', 'red', 'grey', 'yellow', 'black'];
  const colors = colorKeywords.filter(color => lowerName.includes(color));
  
  // Materials
  const materialKeywords = ['clay', 'fabric', 'bamboo', 'terracotta'];
  const materials = materialKeywords.filter(mat => lowerName.includes(mat));
  
  // Types
  const typeKeywords = ['locket', 'earring', 'pendant', 'set'];
  const types = typeKeywords.filter(type => lowerName.includes(type));
  if (lowerName.includes('locket & earring')) types.push('set');

  // Base Tags
  const baseTags = ['handmade', 'jewelry'];
  
  // Combine all
  const rawTags = [...baseTags, ...colors, ...materials, ...types];
  const uniqueTags = [...new Set(rawTags)];

  return {
    ...item,
    category: determineCategory(item.name),
    description: `Beautifully handcrafted ${item.name} perfect for any occasion. Made by skilled artisans with attention to detail.`,
    image: `url('./products/${item.id}.jpg') center/cover no-repeat`,
    tags: uniqueTags,
    featured: [1, 2, 3, 14, 19, 26, 30].includes(item.id)
  };
});

export default products;
