import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CategoryComponent } from "./category/category.component";
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CategoryComponent, RouterModule, CurrencyPipe]
})
export class HomeComponent implements OnInit {
  public products: Product[] = new Array<Product>();
  public loadingProducts: boolean = true;
  public randomProduct: Product;
  public inspirationSentence: string;
  public text: string = "Waar het begint";
  public caret: string = "|";
  categoryList: Category[];
  public loadingCategories: boolean = true;
  public allowcaret: boolean = true;

  constructor(private productsService: ProductsService, private categoryService: CategoryService) {

  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public changeText() {
    const sentences = [
      "Waar dromen realiteit worden",
      "Waar service de 1e prioriteit is",
      "Waar iedereen zich thuis kan voelen",
      "Waar al je muziek instrumenten te vinden zijn",
      "Waar de muziek begint"
    ];
    const currentSentence = this.inspirationSentence;
    while (this.inspirationSentence === currentSentence) {
      this.inspirationSentence = sentences[Math.floor(Math.random() * sentences.length)];
    }
    // console.log(this.inspirationSentence);
    return this.inspirationSentence;
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.loadingCategories = false;
        this.categoryList = categories;
        // console.log(this.categoryList);
      });

    this.productsService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.loadingProducts = false;
        this.products = products;
        this.randomProduct = this.products[Math.floor(Math.random() * this.products.length)];
        // console.log(this.products);
      });
    this.changeText();
    
    setInterval(async () => {
      if (document.hasFocus()) {
        this.allowcaret = false;
        this.text = this.text.slice(0, -1);
        await this.sleep(500);
        while (this.text.length > 0) {
          this.text = this.text.slice(0, -1);
          await this.sleep(15);
        }
        this.allowcaret = true;
        await this.sleep(1000);
        this.allowcaret = false;
        this.text = "";
        const letters = this.changeText();
        for (let letter of letters) {
          this.text = this.text + letter;
          letter = "";
          const delay = Math.floor(Math.random() * 90) + 1
          // console.log(delay);
          await this.sleep(delay);
        }
        this.allowcaret = true;
        await this.sleep(2000);

      }
    }, 5500);

    setInterval(async () => {
      if (this.allowcaret) {
        if (this.caret === "|") {
          this.caret = "";
        } else {
          this.caret = "|";
        }
      } else {
        this.caret = "|";
      }
    }, 500);
  }

}
