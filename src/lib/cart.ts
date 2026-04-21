import type { CartItem, ProductListing } from "../types";

const CART_KEY = "cart_items";

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToCart(product: ProductListing): void {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter((item) => item.product.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function updateQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find((i) => i.product.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}