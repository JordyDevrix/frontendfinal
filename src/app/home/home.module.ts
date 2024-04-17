import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CategoryComponent
    ],
    exports: [
    ]

})
export class HomeModule { }