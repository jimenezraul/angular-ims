import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../models/product';
import { CategoryService } from '../../services/categories.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details-page.component.html',
})
export class ProductDetailsPageComponent {
  product = signal<ProductDto | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (prod) => {
        const categories = this.categoryService.categories().data || [];
        const category = categories.find((c) => c.id === prod.categoryId);

        const productWithCategory = {
          ...prod,
          categoryName: category?.name || 'Unknown',
        };

        this.product.set(productWithCategory);
      },
      error: () => this.product.set(null),
    });
  }

  getStockStatus(quantity: number | undefined | null) {
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
        this.productService.deleteProduct(this.product()!.id).subscribe({
          next: () => {
            alert('Product deleted successfully.');
            this.router.navigate(['/inventory']);
          },
          error: () => alert('Failed to delete product.'),
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/inventory']);
  }
}
