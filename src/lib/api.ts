import type { Product, ProductListing } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchHomeProducts(): Promise<ProductListing[]> {
  const res = await fetch(`${BASE_URL}/api/home`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchPDP(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/api/pdp/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}