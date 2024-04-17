import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../models/product.model';
import {NgIf} from "@angular/common";
import { AuthService } from '../../auth/auth.service';
import { Brand } from '../../models/brand.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrl: './product-thumbnail.component.scss'
})
export class ProductThumbnailComponent implements OnInit{
  @Input() public product!: Product;
  @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();

  public userIsLoggedIn: boolean = false;
  public brand: Brand;
  
  constructor(private authService: AuthService, private productsService: ProductsService){}

  ngOnInit() {
    this.checkLoginState();

    this.productsService
      .getProductBrandByIndex(this.product.id)
      .subscribe((brand: Brand) => {
        this.brand = brand;
      });
  }
  productId(productId: any) {
    throw new Error('Method not implemented.');
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
