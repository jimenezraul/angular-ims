import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details-page.component.html',
})
export class ProductDetailsPageComponent {
  product = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getProductById(id);
    if (found) {
      this.product.set(found);
    } else {
      this.product.set(null);
    }
  }

  // Function to determine stock status, returning an object with text and class
  getStockStatus(quantity: number | undefined | null) {
    // Added null to type
    if (quantity === undefined || quantity === null || quantity < 0) {
      return { text: 'Invalid', class: 'text-gray-500' };
    } else if (quantity === 0) {
      return { text: '(Out of Stock)', class: 'text-red-600' };
    } else if (quantity > 0 && quantity <= 10) {
      return { text: '(Low Stock)', class: 'text-yellow-600' };
    } else {
      return { text: '(In Stock)', class: 'text-green-600' };
    }
  }

  deleteProduct() {
    if (this.product()) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduct(this.product()!.id);
        alert('Product deleted successfully.');
        this.router.navigate(['/inventory']);
      }
    }
  }

  goBack() {
    this.router.navigate(['/inventory']);
  }
}
