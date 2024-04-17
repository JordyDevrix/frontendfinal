import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { Category } from '../models/category.model';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.base_url + "/products";

  private baseUrl2: string = environment.base_url + "/private/orders/all";

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  public getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  public getProductByIndex(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  public getProductCategoryByIndex(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/get/category/${id}`);
  }

  public getProductBrandByIndex(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/get/brand/${id}`);
  }

  public updateProductByIndex(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }
}
