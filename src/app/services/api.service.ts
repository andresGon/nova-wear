import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  // Add this method to get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    // Ensure the category name is properly encoded for the URL
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${encodeURIComponent(category)}`);
  }
}
