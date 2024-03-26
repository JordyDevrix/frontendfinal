import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../models/product.model';
import {NgIf} from "@angular/common";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrl: './product-thumbnail.component.scss'
})
export class ProductThumbnailComponent implements OnInit{
  @Input() public product!: Product;
  @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();

  public userIsLoggedIn: boolean = false;
  
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.checkLoginState();
  }

  public buyProduct(product: Product) {
    this.onBuyProduct.emit(product);
  }

  public checkLoginState(): void{

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }
}
