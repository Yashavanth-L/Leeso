import getConfig from 'next/config';

// When using next.config.js basePath, we can access it via publicRuntimeConfig or just hardcode for simplicity
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/Leeso' : '';

// simple in-memory dataset for demo purposes
export const products = [
  {
    id: 'essential-cotton-tee',
    name: 'Essential Cotton Tee',
    categories: ['men-tshirts', 'new-arrivals'],
    price: 39,
    image: `${basePath}/assets/new-arrival-1.png`,
    meta: 'Men · T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'relaxed-fleece-hoodie',
    name: 'Relaxed Fleece Hoodie',
    categories: ['men-hoodies', 'new-arrivals'],
    price: 69,
    image: `${basePath}/assets/new-arrival-2.png`,
    meta: 'Men · Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'lightweight-utility-jacket',
    name: 'Lightweight Utility Jacket',
    categories: ['men-jackets', 'new-arrivals'],
    price: 119,
    image: `${basePath}/assets/new-arrival-3.png`,
    meta: 'Men · Jackets',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 'tapered-chino-pant',
    name: 'Tapered Chino Pant',
    categories: ['men-pants', 'new-arrivals'],
    price: 79,
    image: `${basePath}/assets/new-arrival-4.png`,
    meta: 'Men · Pants',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'classic-crew-sweater',
    name: 'Classic Crew Sweater',
    categories: ['men-sweaters', 'best-sellers'],
    price: 89,
    image: `${basePath}/assets/sweater.png`,
    meta: 'Men · Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
  },
];
