import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchresultsService {
    private productsInResults: Product[] = [];

    public allProductsInResults(): Product[] {
        return this.productsInResults;
    }

    public setProductsInResults(products: Product[]) {
        this.productsInResults = products;
    }
}
