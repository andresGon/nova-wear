import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductModalComponent } from '../product-modal/product-modal.component'; // Import the modal component

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductModalComponent], // Add ProductModalComponent to imports
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  currentCategory: string | null = null;

  // Properties for modal
  selectedProduct: Product | null = null;
  isModalVisible: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading = true; // Set loading true when params change
        this.error = null;
        this.currentCategory = params.get('categoryName'); // Get category from route params
        //console.log('Current Category from route:', this.currentCategory);

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
        //console.log('API Success - Products received:', data);
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error - Error fetching products:', err);
        // Provide more specific error if possible
        this.error = `Failed to load products${this.currentCategory ? ' for category ' + this.currentCategory : ''}. Please reload.`;
        this.isLoading = false;
        this.products = []; // Clear products on error
      }
    });
  }

  // fetchProducts method is now integrated into ngOnInit's subscription logic

  // Method to open the modal
  openProductModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalVisible = true;
  }

  // Method to close the modal
  closeProductModal(): void {
    this.isModalVisible = false;
    this.selectedProduct = null;
  }
}
