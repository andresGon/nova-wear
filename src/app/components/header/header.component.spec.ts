import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { of } from 'rxjs'; // Import 'of' for creating mock observables

import { HeaderComponent } from './header.component';
import { ApiService } from '../../services/api.service'; // Import ApiService

// Create a mock ApiService
class MockApiService {
  getCategories() {
    // Return an observable with mock data or an empty array
    return of(['electronics', 'jewelery']); // Example mock data
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let apiService: ApiService; // Optional: Inject the service if needed for specific tests

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the component itself (since it's standalone)
      imports: [
        HeaderComponent,
        HttpClientTestingModule, // Provide HttpClientTestingModule for HttpClient dependencies
        RouterTestingModule      // Provide RouterTestingModule for router directives
      ],
      // Provide the mock service instead of the real one
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // Optional: Get the injected service instance
    // apiService = TestBed.inject(ApiService);
    fixture.detectChanges(); // Trigger ngOnInit and initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more specific tests here if needed, for example:
  it('should load categories on init', () => {
    // fixture.detectChanges(); // ngOnInit is called here
    expect(component.isLoading).toBeFalse(); // Assuming mock service returns synchronously
    expect(component.error).toBeNull();
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories).toEqual(['electronics', 'jewelery']); // Check against mock data
  });

  it('should toggle mobile menu', () => {
    expect(component.isMobileMenuOpen).toBeFalse();
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBeTrue();
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  // Test for closing the menu (if you add elements that call it)
  it('should close mobile menu', () => {
    component.isMobileMenuOpen = true; // Open it first
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

});
