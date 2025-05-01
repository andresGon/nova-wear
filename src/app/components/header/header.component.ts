import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import RouterLink and RouterLinkActive
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  // Add RouterLinkActive to the imports array
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  categories: string[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

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
