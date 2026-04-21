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
      <Link to="/" className="nav-icon" title="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>
      <Link to="/" className="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        Store
      </Link>
      <Link to="/cart" className="nav-icon cart-link" title="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {count > 0 && <span className="cart-badge">{count}</span>}
      </Link>
    </nav>
  );
}