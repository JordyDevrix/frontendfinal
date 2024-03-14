import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  public title: string = 'INFIRFS - Webshop';

  public amountOfProducts: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.amountOfProducts = products.length;
    })
  }
}
