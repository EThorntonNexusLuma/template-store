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
    price: 35.00,
    mode: 'subscription',
    checkoutUrl: 'https://buy.stripe.com/bIY01M8Cr8kX2Ri4gg',
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
    price: 20.00,
    mode: 'subscription',
    checkoutUrl: 'https://buy.stripe.com/00g6qc5oN8kXaiIcMN',
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
    price: 297.00,
    mode: 'subscription',
    checkoutUrl: 'https://buy.stripe.com/fZe2a28Cr8kXbmM4gh',
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
    price: 97.00,
    mode: 'subscription',
    checkoutUrl: 'https://buy.stripe.com/aEU5mc4kLcBjgGQ5kl',
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
    price: 149.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/28o7uggcV4Z7cwU6oo',
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
    price: 79.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/fZe9CocWHcBjcqQ5km',
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
    price: 89.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/dR615Q5oN8kX3Vm6op',
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
    price: 129.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/aEUdSM0448kX4ZqeUX',
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
    price: 199.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/7sI15Q8Cr2SZ0Ii7su',
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
    price: 169.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/14k9Co9Gv3WZ4ZqbIS',
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
    price: 139.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/bIYcOI4kL8kX5duaEM',
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
    price: 249.00,
    mode: 'payment',
    checkoutUrl: 'https://buy.stripe.com/14kaGE4kLdFrfCU000',
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