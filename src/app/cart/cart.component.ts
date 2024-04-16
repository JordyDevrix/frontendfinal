import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { AuthRequest } from '../auth/auth-request.model';
import { OrderedProduct } from '../models/productorder.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[];
  public orderlist: Order[];
  public orderedproduct: OrderedProduct[];
  public totalPrice: number;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart();
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
      let cartValue = 0;
      this.orderedproduct = [];
      for (let product of this.products_in_cart) {
      cartValue += product.price;
    }
    this.totalPrice = cartValue;
    })
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);

  }

  public saveProduct() {
    if (this.products_in_cart.length == 0) {
      alert('U heeft geen producten in uw winkelmandje ❌');
      return;
    }

    let cartValue = 0;
    this.orderedproduct = [];
    for (let product of this.products_in_cart) {
      cartValue += product.price;
      this.orderedproduct.push({  name: product.name, price: product.price });
    }
    
    this.orderlist = [
      {
        date: new Date().toISOString(),
        price: cartValue,
        products: this.orderedproduct as Product[]
      }
    ]
    console.log(this.orderlist);
    this.orderService.saveOrder(this.orderlist[0]);

    // this.cartService.saveProductsToLocalStorage(this.products_in_cart);
    for (let product of this.products_in_cart) {
      this.cartService.clearCart();
    }

    alert('Uw order is aangemaakt! ✅');
  }
}
