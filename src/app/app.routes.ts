import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'checkout', component: CartCheckoutComponent }
];
