import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    // Route for displaying all products
    { path: 'products', component: ProductListComponent },
    // Route for displaying products by category
    { path: 'category/:categoryName', component: ProductListComponent },
    // Default redirect remains pointing to all products
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    // Optional: Add a wildcard route for 404 later
    // { path: '**', component: PageNotFoundComponent },
];
