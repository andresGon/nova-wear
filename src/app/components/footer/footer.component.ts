import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss' // Make sure this points to .scss if needed
})
export class FooterComponent {
  // No specific logic needed here for static text
}
