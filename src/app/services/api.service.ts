import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // Import the Product interface

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://fakestoreapi.com'; // Base URL for the API

  constructor(private http: HttpClient) { }

  // Method to get all products
  getProducts(): Observable<Product[]> {
    // The <mcreference></mcreference> tag was removed from the end of the next line
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  // You can add more methods here later for other endpoints:
  // getProductById(id: number): Observable<Product> { ... }
  // createProduct(product: Product): Observable<Product> { ... }
  // etc.
}
