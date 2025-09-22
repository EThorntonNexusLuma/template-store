import type { Product } from '../stripe-config';

/**
 * Simple checkout function that directly opens the Stripe payment link
 * No backend integration - uses payment links only
 */
export async function handleCheckout(product: Product): Promise<void> {
  try {
    // Directly open the Stripe payment link
    window.open(product.checkoutUrl, '_blank');
  } catch (error) {
    console.error('Checkout error:', error);
    // Still try to open the checkout URL even if there's an error
    window.open(product.checkoutUrl, '_blank');
  }
}