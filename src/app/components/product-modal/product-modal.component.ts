import { Component, Input, Output, EventEmitter, Renderer2, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit, OnDestroy {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();

  // Inject Renderer2 and ElementRef
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // Prevent background scroll when modal is open
    //this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy(): void {
    // Restore background scroll when modal is destroyed
    this.renderer.removeStyle(document.body, 'overflow');
  }

  // Updated close method
  close(): void {
    const modalOverlay = this.el.nativeElement.querySelector('.modal-overlay');
    if (modalOverlay) {
      // Add the fadeOutDown class to trigger the animation
      this.renderer.addClass(modalOverlay, 'fadeOutDown');

      // Wait for the animation to complete (300ms) before emitting close event
      setTimeout(() => {
        this.closeModal.emit();
        // Optional: Remove the class after closing if the component might be reused without destruction
        // this.renderer.removeClass(modalOverlay, 'fadeOutDown');
      }, 300); // Match the animation duration
    } else {
      // Fallback if overlay isn't found immediately
      this.closeModal.emit();
    }
  }

  // Close modal if backdrop is clicked
  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  // Close modal on Escape key press
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    this.close();
  }
}
