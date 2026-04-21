export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  desc: string;
  specs: Record<string, string>;
  stock: number;
  rating: number;
  reviews: number;
}

export interface ProductListing {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: ProductListing;
  quantity: number;
}