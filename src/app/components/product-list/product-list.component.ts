import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CartItem, Product } from '../../models/cart-item.model';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule],  
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  addToCart(product: Product): void {
  this.cartService.getCart().subscribe((cartItems: CartItem[]) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      this.cartService.addToCart(product.id, 1).subscribe(() => {
        alert(`Increased quantity of ${product.name}. Current quantity: ${newQuantity}`);
      });
    } else {
      this.cartService.addToCart(product.id, 1).subscribe(() => {
        alert(`Added ${product.name} to cart`);
      });
    }
  });
}

}
