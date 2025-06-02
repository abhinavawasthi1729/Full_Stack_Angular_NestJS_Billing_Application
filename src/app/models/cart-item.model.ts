// src/app/models/cart-item.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
  image: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
