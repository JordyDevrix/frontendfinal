import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {authGuard} from "./auth/auth.guard";
import { OrderComponent } from './orderlist/orderlist.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { SearchResultsComponent } from './searchresults/searchresults.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductsComponent },
  // { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent, canActivate: [authGuard] },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: 'results', component: SearchResultsComponent }
];

