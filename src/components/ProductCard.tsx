import { Link } from "react-router-dom";
import type { ProductListing } from "../types";

interface Props {
  product: ProductListing;
  featured?: boolean;
}

export default function ProductCard({ product, featured }: Props) {
  return (
    <Link to={`/pdp/${product.id}`} className="product-card">
      {featured && <span className="featured-badge">New Release</span>}
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <p className="product-price">${product.price.toFixed(2)}</p>
          <span className="product-rating">★ Premium</span>
        </div>
      </div>
    </Link>
  );
}