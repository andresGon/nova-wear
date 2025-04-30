import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

import { routes } from './app.routes'; // Import your routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Ensure routes are provided here
    provideHttpClient() // Ensure HttpClient is provided for ApiService
  ]
};
