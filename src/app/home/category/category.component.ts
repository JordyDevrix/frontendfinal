import { Component, Input, OnInit } from "@angular/core";
import { Category } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";
import { Product } from "../../models/product.model";
import { SlicePipe } from "@angular/common";

@Component({
    selector: "app-category",
    standalone: true,
    imports: [SlicePipe],
    templateUrl: "./category.component.html",
    styleUrl: "./category.component.scss"
    })
export class CategoryComponent implements OnInit{
    @Input() public product!: Product;
    categoryList: Category[];
    public loadingCategories: boolean = true;

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
    }
    
}