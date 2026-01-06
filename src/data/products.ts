export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'new-arrivals' | 'sale';
  subcategory: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  fabric: string;
  care: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Wool Blend Coat',
    price: 299,
    originalPrice: 399,
    category: 'women',
    subcategory: 'Coats',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Grey', hex: '#808080' }
    ],
    description: 'Luxurious oversized coat crafted from premium wool blend. Features dropped shoulders, side pockets, and a relaxed silhouette perfect for layering.',
    fabric: '70% Wool, 20% Polyester, 10% Cashmere',
    care: ['Dry clean only', 'Store on hanger', 'Iron on low heat'],
    rating: 4.8,
    reviews: 124,
    isSale: true
  },
  {
    id: '2',
    name: 'Tailored Slim Fit Blazer',
    price: 249,
    category: 'men',
    subcategory: 'Blazers',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1593030103066-0093718e9d3e?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#1a2744' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Black', hex: '#1a1a1a' }
    ],
    description: 'Impeccably tailored blazer with a slim fit silhouette. Crafted from premium Italian wool with peak lapels and functional button cuffs.',
    fabric: '100% Italian Wool',
    care: ['Dry clean recommended', 'Steam to refresh', 'Store on padded hanger'],
    rating: 4.9,
    reviews: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'Silk Midi Dress',
    price: 189,
    category: 'women',
    subcategory: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Burgundy', hex: '#722F37' }
    ],
    description: 'Elegant silk midi dress with a flattering bias cut. Features delicate cowl neckline and adjustable spaghetti straps.',
    fabric: '100% Mulberry Silk',
    care: ['Hand wash cold', 'Hang to dry', 'Iron on low heat inside out'],
    rating: 4.7,
    reviews: 156,
    isNew: true
  },
  {
    id: '4',
    name: 'Premium Cotton T-Shirt',
    price: 59,
    category: 'men',
    subcategory: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Navy', hex: '#1a2744' },
      { name: 'Grey', hex: '#808080' }
    ],
    description: 'Essential crew neck t-shirt made from premium organic cotton. Features a relaxed fit with reinforced seams for durability.',
    fabric: '100% Organic Cotton',
    care: ['Machine wash cold', 'Tumble dry low', 'Iron medium heat'],
    rating: 4.6,
    reviews: 312
  },
  {
    id: '5',
    name: 'High-Waisted Tailored Trousers',
    price: 159,
    originalPrice: 199,
    category: 'women',
    subcategory: 'Trousers',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    description: 'Sophisticated high-waisted trousers with a wide leg silhouette. Features pressed creases and side pockets.',
    fabric: '65% Polyester, 35% Viscose',
    care: ['Machine wash cold', 'Hang to dry', 'Iron on medium heat'],
    rating: 4.5,
    reviews: 78,
    isSale: true
  },
  {
    id: '6',
    name: 'Cashmere Crewneck Sweater',
    price: 279,
    category: 'men',
    subcategory: 'Knitwear',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#D2B48C' },
      { name: 'Navy', hex: '#1a2744' },
      { name: 'Grey', hex: '#808080' }
    ],
    description: 'Luxuriously soft cashmere sweater with classic crewneck design. Lightweight yet warm, perfect for layering.',
    fabric: '100% Grade-A Mongolian Cashmere',
    care: ['Dry clean or hand wash cold', 'Lay flat to dry', 'Store folded'],
    rating: 4.9,
    reviews: 203,
    isNew: true
  },
  {
    id: '7',
    name: 'Leather Biker Jacket',
    price: 449,
    category: 'women',
    subcategory: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Cognac', hex: '#834333' }
    ],
    description: 'Iconic leather biker jacket crafted from buttery soft lambskin. Features asymmetric zip closure and quilted shoulders.',
    fabric: '100% Lambskin Leather',
    care: ['Professional leather cleaning only', 'Condition regularly', 'Store on padded hanger'],
    rating: 4.8,
    reviews: 67
  },
  {
    id: '8',
    name: 'Relaxed Linen Shirt',
    price: 89,
    originalPrice: 119,
    category: 'men',
    subcategory: 'Shirts',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Sand', hex: '#C2B280' }
    ],
    description: 'Breathable linen shirt with a relaxed fit. Perfect for warm weather with its airy construction and classic spread collar.',
    fabric: '100% European Linen',
    care: ['Machine wash cold', 'Hang to dry', 'Iron while damp'],
    rating: 4.4,
    reviews: 145,
    isSale: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  if (category === 'new-arrivals') return products.filter((p) => p.isNew);
  if (category === 'sale') return products.filter((p) => p.isSale);
  return products.filter((p) => p.category === category);
};
