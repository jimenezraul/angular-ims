import { Component, computed, signal, effect, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent {
  searchTerm = signal('');
  selectedCategory = signal('');

  private productService = inject(ProductService);
  private categoriesService = inject(CategoriesService)

  constructor() {
    effect(() => {
      const term = this.searchTerm().trim();

      if (term.length > 0) {
        this.productService.searchProducts(term);
      } else {
        this.loadCurrentPage();
      }
    });
  }

  private loadCurrentPage() {
    this.productService.loadProductsByPage(this.currentPage);
  }

  get productsList() {
    return this.productService.products().data || [];
  }

  get currentPage() {
    return this.productService.currentPage();
  }

  get totalPages() {
    return this.productService.totalPages();
  }

  get categories() {
    return this.categoriesService.categories().data || [];
  }

  goToPage(page: number) {
    this.productService.loadProductsByPage(page);
  }
}
