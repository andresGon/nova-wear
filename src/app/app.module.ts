import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Ensure this line exists

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent, // Make sure your components are declared if not standalone
    // ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Ensure this is in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }