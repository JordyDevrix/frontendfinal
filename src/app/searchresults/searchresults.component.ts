import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SearchresultsService } from '../services/searchresults.service';

@Component({
    selector: 'app-searchresults',
    templateUrl: './searchresults.component.html',
    styleUrl: './searchresults.component.scss',
    providers: [ProductsService, CartService, SearchresultsService]
})
export class SearchResultsComponent {
    public products: Product[] = new Array<Product>();
    public searchResults: Product[] = new Array<Product>();

    constructor(private productsService: ProductsService, private cartService: CartService, private searchresultsService: SearchresultsService) {
    }

    ngOnInit(): void {
        this.searchResults = this.searchresultsService.allProductsInResults();
        console.log(this.searchResults);
    }

    public onBuyProduct(product: Product) {
        this.cartService.addProductToCart(product);
    }

}
