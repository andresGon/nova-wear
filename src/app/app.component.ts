import { Component } from '@angular/core';
// Import RouterOutlet, RouterLink, and RouterLinkActive
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Ensure AppComponent is standalone
  // Add RouterOutlet, RouterLink, RouterLinkActive to imports
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss' // Or styleUrls if using .css
})
export class AppComponent {
  title = 'nova-wear';
}
