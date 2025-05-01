import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model'; // Adjust path if needed

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  @Input() product: Product | null = null; // Input to receive product data
  @Output() closeModal = new EventEmitter<void>(); // Output event to close the modal

  onClose(): void {
    this.closeModal.emit();
  }

  // Prevent clicks inside the modal content from closing it
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
