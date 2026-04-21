import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCartCount } from "../lib/cart";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setCount(getCartCount());
  }, [location]);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/" className="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        Store
      </Link>
      <Link to="/cart" className="nav-link cart-link">
        Cart
        {count > 0 && <span className="cart-badge">{count}</span>}
      </Link>
    </nav>
  );
}