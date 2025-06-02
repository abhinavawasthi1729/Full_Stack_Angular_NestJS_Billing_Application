import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService  {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number) {
  return this.http.post(this.apiUrl, { productId, quantity });
}

  updateQuantity(cartId: number, productId: number, quantity: number) {
  return this.http.patch(`${this.apiUrl}/${cartId}/product/${productId}`, { quantity });
}

  removeItem(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  clearCart() {
    return this.http.delete(this.apiUrl);
  }
}
