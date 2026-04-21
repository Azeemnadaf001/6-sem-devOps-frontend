import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchHomeProducts } from "../lib/api";
import type { ProductListing } from "../types";

export default function Home() {
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <section className="banner">
        <div className="banner-content">
          <h1>Premium Gear</h1>
          <p>Elevate your setup with curated tech essentials</p>
        </div>
      </section>

      <section className="products-section">
        <h2>Featured Products</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}