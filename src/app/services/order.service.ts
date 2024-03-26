import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private orders: Order[] = [];
  public $orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  
  private baseUrl: string = environment.base_url + "/orderlist";
  
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  public allProductsInOrder() {
    this.getOrder();
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  public saveOrder(orderlist: Order) {
    const token = "Bearer " + this.authService.getToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }
    const headers = new HttpHeaders().set('Authorization', token);
    // return this.http.post<Order>(this.baseUrl, orderlist); // Modify method to make an HTTP POST request
    this.http.post(this.baseUrl, orderlist, { headers }).subscribe(responseData => {console.log(responseData);});
      
  }

  public getOrder() {
    const token = "Bearer " + this.authService.getToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }
    const headers = new HttpHeaders().set('Authorization', token);
    // return this.http.post<Order>(this.baseUrl, orderlist); // Modify method to make an HTTP POST request
    return this.http.get<any[]>(this.baseUrl + "/get", { headers });
    
  }
}
