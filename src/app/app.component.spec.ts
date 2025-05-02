import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'; // Import HeaderComponent
import { FooterComponent } from './components/footer/footer.component'; // Import FooterComponent
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule for HeaderComponent's dependency

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule, // Add RouterTestingModule for router-outlet
        HeaderComponent,     // Import HeaderComponent as it's used in the template
        FooterComponent,     // Import FooterComponent as it's used in the template
        HttpClientTestingModule // Add HttpClientTestingModule because HeaderComponent needs ApiService which needs HttpClient
      ],
      // No need to declare components here as they are standalone and imported
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'nova-wear' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nova-wear');
  });

  // Remove or update the test that checks for a specific h1 content
  // as it doesn't exist in the actual template.
  // You could test for the presence of the header or footer instead:
  it('should render the header component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should render the footer component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });
});
