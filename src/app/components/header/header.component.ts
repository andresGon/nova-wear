import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { RouterLink } from '@angular/router'; // Import RouterLink for navigation
import { ApiService } from '../../services/api.service'; // Import ApiService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink], // Add CommonModule and RouterLink
  templateUrl: './header.component.html',
  // Change styleUrls to styleUrl and point to the .scss file
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  categories: string[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {} // Inject ApiService

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
        console.log('Categories fetched:', data);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.error = 'Failed to load categories.';
        this.isLoading = false;
      }
    });
  }
}
