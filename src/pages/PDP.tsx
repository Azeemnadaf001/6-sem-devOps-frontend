import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchHomeProducts, fetchPDP } from "../lib/api";
import { addToCart } from "../lib/cart";
import type { Product, ProductListing } from "../types";

export default function PDP() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([fetchPDP(id), fetchHomeProducts()])
      .then(([p, products]) => {
        setProduct(p);
        setSimilar(products.filter((pr) => pr.id !== id));
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="page loading">Loading...</div>;
  if (error || !product) return <div className="page error">{error || "Product not found"}</div>;

  return (
    <div className="page">
      <div className="pdp-layout">
        <div className="pdp-images">
          <img src={product.image} alt={product.name} className="pdp-main-image" />
          <div className="pdp-thumbnails">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt={`${product.name} view ${i + 1}`} className="pdp-thumb" />
            ))}
          </div>
        </div>

        <div className="pdp-details">
          <h1 className="pdp-title">{product.name}</h1>
          <div className="pdp-meta">
            <span className="pdp-rating">★ {product.rating.toFixed(1)}</span>
            <span className="pdp-reviews">({product.reviews} reviews)</span>
          </div>
          <p className="pdp-price">${product.price.toFixed(2)}</p>
          <p className="pdp-desc">{product.desc}</p>

          <div className="pdp-specs">
            <h3>Specifications</h3>
            <dl className="specs-list">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="pdp-stock">
            {product.stock > 0 ? (
              <span className="in-stock">✓ In stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">✗ Out of stock</span>
            )}
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-btn" disabled={product.stock === 0}>
            {added ? "Added!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="similar-section">
          <h2>Similar Products</h2>
          <div className="product-grid">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}