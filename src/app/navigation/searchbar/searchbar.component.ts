import { Component, EventEmitter, Input, Output } from '@angular/core';
import stringSimilarity from 'string-similarity';
import { ProductsService } from "../../services/products.service";
import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Brand } from '../../models/brand.model';
import { RouterModule } from '@angular/router';
import { SearchresultsService } from '../../services/searchresults.service';


@Component({
    selector: 'app-searchbar',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterModule
    ],
    templateUrl: './searchbar.component.html',
    styleUrl: './searchbar.component.scss',
    providers: [ProductsService, CategoryService, SearchresultsService]
})
export class SearchBarComponent {
    public categoryList: Category[] = [];
    public productList: Product[] = [];
    public productStack: Product[] = [];
    public brand: Brand;
    myString = "";
    public productsFound: number[] = [];

    constructor(
        private productService: ProductsService,
        private categoryService: CategoryService,
        private searchresultsService: SearchresultsService
    ) {
    }
    ngOnInit() {

        this.productService
            .getProducts()
            .subscribe((productList: Product[]) => {
                this.productList = productList;
                // console.log(this.productList)
            });

        this.categoryService
            .getCategories()
            .subscribe((categoryList: Category[]) => {
                this.categoryList = categoryList;
                // console.log(this.categoryList)
            });
    }


    newEvent(event: any) {
        this.myString = event.target.value;
        // console.log(event.target.value, this.myString)
    }

    stringSimilarity = stringSimilarity
    public search() {
        this.productsFound = []
        this.productStack = []
        // console.log("Query: " + this.myString);
        // console.log("Results by direct match:");
        for (let i = 0; i < this.productList.length; i++) {
            this.productService
                .getProductBrandByIndex(this.productList[i].id)
                .subscribe((brand: Brand) => {
                    this.brand = brand;
                    // Vergelijk de string (uit de zoekbalk) met elk product in de lijst van GET /api/pub/product/all
                    // console.log(`${this.productList[i].brand} ${this.productList[i].name}`)
                    let ratio = 0;

                    // console.log(this.brand)
                    try {
                        ratio = this.stringSimilarity.compareTwoStrings(
                            `${this.brand.brand.toLowerCase()} ${this.productList[i].name.toLowerCase()}`,
                            this.myString.toLowerCase());

                    } catch (e) {
                        console.log(e)
                    }

                    if (ratio > 0.2) {
                        // Als de ratio hoger is dan 0.2, print dan het product
                        // Voeg elk product toe aan de lijst van producten met een minimale ratio van 0.2
                        this.productsFound.push(this.productList[i].id);
                        this.productStack.push(this.productList[i]);
                        // console.log(this.myString + "\t" + ratio + "\t" + this.productList[i].name);
                    }
                });
        }

        for (let i = 0; i < this.categoryList.length; i++) {
            // Vergelijk de string (uit de zoekbalk) met elke category in de lijst van GET /api/pub/category/all
            let ratio = 0;
            ratio = this.stringSimilarity.compareTwoStrings(this.categoryList[i].name.toLowerCase(), this.myString.toLowerCase());
            if (ratio > 0.55) {
                // Hier ga je een request sturen voor alle categorieën die een ratio van 0.55 of hoger hebben
                for (const product of this.categoryList[i].products) {
                    if (this.productsFound.includes(product.id)) {
                        continue
                    } else {
                        // Hier kan je elk product uit de betreffende categorie printen die je van te voren hebt aangeroep op een get category endpoint
                        // console.log(this.myString + "\t" + ratio + "\t" + product.name);
                        this.productStack.push(product);
                    }
                }
            }
        }
        this.searchresultsService.setProductsInResults(this.productStack);
    }
}

