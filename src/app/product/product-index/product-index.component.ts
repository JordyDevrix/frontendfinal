import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-index',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './product-index.component.html',
  styleUrl: './product-index.component.scss'
})
export class ProductIndexComponent {
  public products: Product[] = [
    { name: "Airpods", price: 260.50, category: "Apple" },
    { name: "Surfacebook", price: 150, category: "Microsoft" },
    { name: "iPad", price: 850, category: "Apple" },
  ];

}
