import { Link } from "react-router-dom";
import type { ProductListing } from "../types";

interface Props {
  product: ProductListing;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/pdp/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}