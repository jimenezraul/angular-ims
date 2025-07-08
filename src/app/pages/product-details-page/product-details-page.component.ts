import { Component, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './product-details-page.component.html',
})
export class ProductDetailsPageComponent implements OnInit {
  product = signal<Product | null>(null);
  category = signal<Category | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (prod) => {
        this.product.set(prod);
        this.loading.set(false);
      },
      error: () => {
        this.product.set(null);
        this.loading.set(false);
      },
    });

    this.categoryService.loadCategories();
  }

  effect = effect(() => {
    const prod = this.product();
    const categories = this.categoryService.categories().data;

    if (prod && categories.length > 0) {
      const foundCategory = categories.find((c) => c.id === prod.categoryId);
      this.category.set(foundCategory || null);
    }
  });

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
