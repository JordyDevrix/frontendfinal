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

    newEvent(event: any) {
        this.myString = event.target.value;
        // console.log(event.target.value, this.myString)
    }
}

