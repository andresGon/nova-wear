import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported

@Component({
  selector: 'app-product-list',
  standalone: true, // Component is standalone
  imports: [CommonModule], // Add CommonModule for pipes and directives
  templateUrl: './product-list.component.html',
  // styleUrls: ['./product-list.component.css'] // Remove or comment out this line
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getProducts().subscribe({
      next: (data) => {
        console.log('API Success - Products received:', data);
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error - Error fetching products:', err);
        this.error = 'Failed to load products. Please check console for details.';
        this.isLoading = false;
      }
    });
  }
}
