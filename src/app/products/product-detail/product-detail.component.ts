import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/category.model';
import { Brand } from '../../models/brand.model';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() public product!: Product;
  //public product: Product;
  public category: Category;
  public brand: Brand;
  private productId: number;
  public userIsLoggedIn: boolean = false;
  public text: string = 'Add to cart';
  public clickedStyle: string = '#FFF';
  public showPlus: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.checkLoginState();

    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.productsService
      .getProductByIndex(this.productId)
      .subscribe((product: Product) => {
        this.product = product;
      });

    this.productsService
      .getProductCategoryByIndex(this.productId)
      .subscribe((category: Category) => {
        this.category = category;
      });

    this.productsService
      .getProductBrandByIndex(this.productId)
      .subscribe((brand: Brand) => {
        this.brand = brand;
      });
  }

  public buyProduct(product: Product) {
    console.log(product);
    console.log("Product gekocht")
    this.cartService.addProductToCart(product)
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
