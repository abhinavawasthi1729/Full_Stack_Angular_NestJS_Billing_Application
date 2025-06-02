import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';


@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  templateUrl: './cart-checkout.component.html',
  imports: [CommonModule]
})
export class CartCheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data;
      this.total = this.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    });
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id).subscribe(() => this.ngOnInit());
  }

  checkout(): void {
    alert('Checkout Complete!');
    this.cartService.clearCart().subscribe(() => this.ngOnInit());
  }
}
