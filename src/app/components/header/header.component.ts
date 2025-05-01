import { Component, OnInit, HostListener, HostBinding, Inject, ElementRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  categories: string[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  // Property to track if the header should be fixed
  isHeaderFixed = false;

  // Bind the 'fixed-header' class based on the isHeaderFixed property
  @HostBinding('class.fixed-header') get fixed() {
    return this.isHeaderFixed;
  }

  constructor(
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document, // Inject DOCUMENT
    private el: ElementRef // Inject ElementRef
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    // Optional: Calculate header height here if needed for placeholder
    // console.log('Header height:', this.el.nativeElement.offsetHeight);
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.error = 'Failed to load categories.';
        this.isLoading = false;
      }
    });
  }

  // Listen for window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Define a scroll threshold (e.g., 10 pixels)
    const scrollOffset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    const threshold = 10; // Or calculate based on header's initial position/height if needed

    this.isHeaderFixed = scrollOffset > threshold;

    // Optional: Add/remove body padding to prevent content jump
    // This is a simple approach; more robust solutions might use a placeholder div
    const headerHeight = this.el.nativeElement.offsetHeight;
    if (this.isHeaderFixed) {
      this.document.body.style.paddingTop = `${headerHeight}px`;
    } else {
      this.document.body.style.paddingTop = '0';
    }
  }
}
