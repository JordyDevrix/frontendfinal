import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public orders: Order[] = new Array<Order>();
  public loadingProducts: boolean = true;

  constructor(private productsService: ProductsService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productsService
      .getOrderList()
      .subscribe((products: Order[]) => {
        this.loadingProducts = false;
        this.orders = products;
      });
      console.log("tada");
  }

  public onBuyProduct(product: Product) {
    this.cartService.addProductToCart(product)
  }

}
