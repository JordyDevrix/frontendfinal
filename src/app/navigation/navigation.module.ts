import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation.component';
import { SearchBarComponent } from './searchbar/searchbar.component';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavigationComponent,
        SearchBarComponent
    ],
    exports: [
    ]

})
export class NavigationModule { }