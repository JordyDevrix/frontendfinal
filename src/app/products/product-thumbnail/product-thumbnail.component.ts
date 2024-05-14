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
  public text: string = 'Add to cart';
  public clickedStyle: string = '#FFF';
  public showPlus: boolean = true;
  
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
    this.text = 'Added to cart';
    this.clickedStyle = '#0C7';
    this.showPlus = false;
    setTimeout(() => {
      this.text = 'Add to cart';
      this.clickedStyle = '#FFF';
      this.showPlus = true;
    } , 1300);
  }

  public checkLoginState(): void{

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }
}
