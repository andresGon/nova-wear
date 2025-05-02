import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Import waitForAsync
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

// Mock ApiService remains the same
class MockApiService {
  getProducts(): Observable<Product[]> {
    return of([]);
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return of([]);
  }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockApiService: MockApiService;

  // Configure the base TestBed module only once
  beforeEach(waitForAsync(() => { // Use waitForAsync for compileComponents
    mockApiService = new MockApiService(); // Create instance here

    TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        // Provide the mock ApiService globally for most tests
        { provide: ApiService, useValue: mockApiService },
        // Provide a default ActivatedRoute mock
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({}))
          }
        }
      ]
    }).compileComponents(); // Compile components here
  }));

  // Test cases that use the default ActivatedRoute mock
  describe('without category route param', () => {
    beforeEach(() => {
      // Create fixture and component for this group of tests
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges(); // Trigger ngOnInit
      expect(component).toBeTruthy();
    });

    it('should call getProducts', () => {
      spyOn(mockApiService, 'getProducts').and.callThrough();
      fixture.detectChanges(); // Trigger ngOnInit
      expect(mockApiService.getProducts).toHaveBeenCalled();
    });

    it('should set isLoading to false after products are loaded', () => {
      const dummyProducts: Product[] = [{ id: 1, title: 'Test', price: 10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }];
      spyOn(mockApiService, 'getProducts').and.returnValue(of(dummyProducts));
      fixture.detectChanges();
      expect(component.isLoading).toBeFalse();
      expect(component.products).toEqual(dummyProducts);
    });

    it('should set error message on API failure', () => {
      const errorResponse = new Error('API Error');
      spyOn(mockApiService, 'getProducts').and.returnValue(throwError(() => errorResponse));
      fixture.detectChanges();
      expect(component.isLoading).toBeFalse();
      expect(component.error).toContain('Failed to load products');
      expect(component.products).toEqual([]);
    });

    it('should open and close the product modal', () => {
      fixture.detectChanges(); // Needed for component init before calling methods
      const dummyProduct: Product = { id: 1, title: 'Test', price: 10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } };
      expect(component.isModalVisible).toBeFalse();
      expect(component.selectedProduct).toBeNull();

      component.openProductModal(dummyProduct);
      expect(component.isModalVisible).toBeTrue();
      expect(component.selectedProduct).toEqual(dummyProduct);

      component.closeProductModal();
      expect(component.isModalVisible).toBeFalse();
      expect(component.selectedProduct).toBeNull();
    });
  });

  // Test cases that need the overridden ActivatedRoute
  describe('with category route param', () => {
    const categoryName = 'electronics';

    beforeEach(waitForAsync(() => { // Use waitForAsync for override
      // Override the provider *before* creating the component for this describe block
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
          paramMap: of(convertToParamMap({ categoryName: categoryName }))
        }
      });

      // Recompile is not strictly needed here after override if compileComponents was done in the outer beforeEach
      // but keeping it doesn't hurt. If issues persist, remove this compileComponents.
      TestBed.compileComponents();
    }));

    beforeEach(() => {
      // Create fixture and component *after* override
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
      // Re-inject the service if needed, though the instance from outer scope might still work
      // mockApiService = TestBed.inject(ApiService) as unknown as MockApiService;
    });

    it('should call getProductsByCategory', () => {
      spyOn(mockApiService, 'getProductsByCategory').and.callThrough();
      fixture.detectChanges(); // Trigger ngOnInit
      expect(mockApiService.getProductsByCategory).toHaveBeenCalledWith(categoryName);
    });
  });
});
