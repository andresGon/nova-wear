import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import testing modules

import { ApiService } from './api.service';
import { Product } from '../models/product.model'; // Import Product model if testing specific methods

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController; // Controller to mock HTTP requests
  const apiUrl = 'https://fakestoreapi.com'; // Base URL used in the service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the testing module for HttpClient
      providers: [ApiService] // Provide the service itself
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController); // Inject the mock controller
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Example test for getProducts method
  it('should retrieve products from the API via GET', () => {
    const dummyProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: 'Desc 1', category: 'cat1', image: 'img1.jpg', rating: { rate: 4, count: 10 } },
      { id: 2, title: 'Product 2', price: 20, description: 'Desc 2', category: 'cat2', image: 'img2.jpg', rating: { rate: 5, count: 20 } }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    // Expect a GET request to the correct URL
    const request = httpMock.expectOne(`${apiUrl}/products`);
    expect(request.request.method).toBe('GET');

    // Respond with mock data
    request.flush(dummyProducts);
  });

  // Example test for getCategories method
  it('should retrieve categories from the API via GET', () => {
    const dummyCategories: string[] = ['electronics', 'jewelery'];

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategories);
    });

    const request = httpMock.expectOne(`${apiUrl}/products/categories`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCategories);
  });

   // Example test for getProductsByCategory method
   it('should retrieve products by category from the API via GET', () => {
    const dummyProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: 'Desc 1', category: 'electronics', image: 'img1.jpg', rating: { rate: 4, count: 10 } }
    ];
    const category = 'electronics';

    service.getProductsByCategory(category).subscribe(products => {
      expect(products.length).toBe(1);
      expect(products).toEqual(dummyProducts);
    });

    // Expect a GET request to the correct category URL (ensure encoding)
    const request = httpMock.expectOne(`${apiUrl}/products/category/${encodeURIComponent(category)}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProducts);
  });

});
