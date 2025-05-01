import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators'; // Import switchMap
import { Observable, of } from 'rxjs'; // Import Observable and of

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  // styleUrl: './product-list.component.scss' // Use styleUrl if you have an SCSS file
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  currentCategory: string | null = null; // To store the current category

  // Inject ActivatedRoute
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Use switchMap to react to route parameter changes
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading = true; // Set loading true when params change
        this.error = null;
        this.currentCategory = params.get('categoryName'); // Get category from route params
        console.log('Current Category from route:', this.currentCategory);

        // Decide which API call to make
        if (this.currentCategory) {
          return this.apiService.getProductsByCategory(this.currentCategory);
        } else {
          // No category in route, fetch all products (e.g., for /products route)
          return this.apiService.getProducts();
        }
      })
    ).subscribe({
      next: (data) => {
        console.log('API Success - Products received:', data);
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error - Error fetching products:', err);
        // Provide more specific error if possible
        this.error = `Failed to load products${this.currentCategory ? ' for category ' + this.currentCategory : ''}. Please check console.`;
        this.isLoading = false;
        this.products = []; // Clear products on error
      }
    });
  }

  // fetchProducts method is now integrated into ngOnInit's subscription logic
}
