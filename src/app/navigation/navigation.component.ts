import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { NavigationModule } from './navigation.module';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import {AuthService} from "../auth/auth.service";
import {NgIf} from "@angular/common";
import { SearchBarComponent } from "./searchbar/searchbar.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    imports: [RouterModule, NgIf, NavigationModule, SearchBarComponent]
})
export class NavigationComponent implements OnInit {
  public title: string = 'DVRX - Webshop';

  public amountOfProducts: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.amountOfProducts = products.length;
    })
    this.checkLoginState();
  }

  public showHotCupIcon: boolean = false;
  public userIsLoggedIn: boolean = false;


  public onLogout(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
    alert('U bent uitgelogd');
  }

  public checkLoginState(): void{

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }


}
