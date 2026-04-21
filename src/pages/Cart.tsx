import { Link } from "react-router-dom";
import { getCart, removeFromCart, updateQuantity, clearCart } from "../lib/cart";
import { useEffect, useState } from "react";
import type { CartItem } from "../types";

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setItems(getCart());
  };

  const handleUpdate = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    setItems(getCart());
  };

  const handleClear = () => {
    clearCart();
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="empty-cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2>Your cart is empty</h2>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <Link to={`/pdp/${item.product.id}`}>
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              </Link>
              <div className="cart-item-info">
                <Link to={`/pdp/${item.product.id}`} className="cart-item-name">
                  {item.product.name}
                </Link>
                <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => handleUpdate(item.product.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdate(item.product.id, item.quantity + 1)}>+</button>
              </div>
              <p className="cart-item-total">${(item.product.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemove(item.product.id)} className="remove-btn">
                ✕
              </button>
            </div>
          ))}
          <button onClick={handleClear} className="clear-cart-btn">Clear Cart</button>
        </div>

        <div className="cart-summary">
          <h2>Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}