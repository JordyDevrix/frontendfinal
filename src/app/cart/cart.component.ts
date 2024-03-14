import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart();
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
    })
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);

  }
}
