import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Import HomeComponent
import { ProductListComponent } from './components/product-list/product-list.component'; // Import ProductListComponent

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  // Add a wildcard route for 404 if needed later
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }