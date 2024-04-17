import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.base_url + "/categories";

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/get`);
  }

  public getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  public addCategories(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  public getCategoriesByIndex(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/get/${id}`);
  }

  public updateCategoriesByIndex(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }
}
