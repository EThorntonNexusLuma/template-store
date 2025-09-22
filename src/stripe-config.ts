export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  mode: 'payment' | 'subscription';
  checkoutUrl: string;
  media?: {
    folder: string;
    image: string;
    gif: string;
  };
}

export const products: Product[] = [
  {
    id: 'prod_1',
    priceId: 'price_1',
    name: 'DreamVision Business Coach Template',
    description: 'Professional business coaching website template for coaches and consultants',
    price: 549.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/28E4gy2109XbbrW8TPbQY0v',
    media: {
      folder: 'business',
      image: 'Business coach.jpg',
      gif: 'credit repair.gif'
    }
  },
  {
    id: 'prod_2',
    priceId: 'price_2',
    name: 'Luxury Auto Website Template',
    description: 'Premium automotive dealership website with luxury car showcases and lead generation',
    price: 579.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/eVq14maxwglzcw0fidbQY0u',
    media: {
      folder: 'lux-auto',
      image: 'Sales Girl.jpg',
      gif: 'Luxury Auto.gif'
    }
  },
  {
    id: 'prod_3',
    priceId: 'price_3',
    name: 'Basic Real Estate Website Template',
    description: 'Essential real estate website with property listings and agent profiles',
    price: 349.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/fZueVcfRQd9n9jO5HDbQY0w',
    media: {
      folder: 'lux-home',
      image: 'create a simple real estate home sold giving keys.jpg',
      gif: 'Luxury Home.gif'
    }
  },
  {
    id: 'prod_4',
    priceId: 'price_4',
    name: 'Credit Wise Finance Coach',
    description: 'Financial coaching website template for credit repair and financial advisors',
    price: 700.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/dRm8wO6hgc5jbrW4DzbQY0o',
    media: {
      folder: 'credit-wise',
      image: 'beautiful black business woman.jpg',
      gif: 'smart credit.gif'
    }
  },
  {
    id: 'prod_5',
    priceId: 'price_5',
    name: 'Lux Hair Salon Template',
    description: 'Elegant hair salon website with booking system and service showcase',
    price: 479.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/aFa28q0WW4CR67C5HDbQY0t',
    media: {
      folder: 'lux-hair',
      image: 'luxury hair salon latina.jpg',
      gif: 'luxury hair temp.gif'
    }
  },
  {
    id: 'prod_6',
    priceId: 'price_6',
    name: 'Online Beauty Store Template',
    description: 'Complete e-commerce beauty store with product catalog and shopping cart',
    price: 379.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/bJeaEW8po8T78fKb1XbQY0s',
    media: {
      folder: 'beauty-store',
      image: 'Beauty model.jpg',
      gif: 'Lux Beauty Store.gif'
    }
  },
  {
    id: 'prod_7',
    priceId: 'price_7',
    name: 'Luxury Cleaning Business Template',
    description: 'Premium cleaning service website with service booking and testimonials',
    price: 229.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/aFa6oG498c5j0Ni8TPbQY0p',
    media: {
      folder: 'lux-clean',
      image: 'lux cleaning.jpg',
      gif: 'Cleaning Website.gif'
    }
  },
  {
    id: 'prod_8',
    priceId: 'price_8',
    name: 'Simple Cleaning Business Template',
    description: 'Clean and simple cleaning service website for local businesses',
    price: 179.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/8x2aEWgVU3yN53yb1XbQY0r',
    media: {
      folder: 'simple',
      image: 'Simple Clean.jpg',
      gif: 'Cleaning website 2.gif'
    }
  },
  {
    id: 'prod_9',
    priceId: 'price_9',
    name: 'Just Another Real Estate Website',
    description: 'Modern real estate website with advanced property search and virtual tours',
    price: 129.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/7sYdR85dc9Xb67C3zvbQY0y',
    media: {
      folder: 'lux-home',
      image: 'create a simple real estate home sold giving keys.jpg',
      gif: 'Luxury Home.gif'
    }
  },
  {
    id: 'prod_10',
    priceId: 'price_10',
    name: 'Better Baking Bakery Website Template',
    description: 'Delicious bakery website with menu showcase and online ordering system',
    price: 129.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/8x2aEW8po0mBanS2vrbQY0q',
    media: {
      folder: 'better-baking',
      image: 'Baked Bread.jpg',
      gif: 'Bakery.gif'
    }
  },
  {
    id: 'prod_11',
    priceId: 'price_11',
    name: 'Black Oak Construction Template',
    description: 'Professional construction company website with project portfolio and quotes',
    price: 329.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/14AcN48pod9nanS2vrbQY0z',
    media: {
      folder: 'construction',
      image: 'create a construction worker business man.jpg',
      gif: 'Contruction website template.gif'
    }
  },
  {
    id: 'prod_12',
    priceId: 'price_12',
    name: '24/7 Fitness Website Template',
    description: 'Complete fitness center website with class schedules and membership management',
    price: 349.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/eVqeVcgVUc5jcw02vrbQY0x',
    media: {
      folder: 'fitness',
      image: 'fitness woman.jpg',
      gif: 'Gym website.gif'
    }
  }
];

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(product => product.priceId === priceId);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}