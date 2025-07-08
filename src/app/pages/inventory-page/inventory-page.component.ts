import { Component, signal, effect } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categories.service';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent {
  searchTerm = signal('');
  selectedCategory = signal('');

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    effect(() => {
      const term = this.searchTerm().trim();
      if (term.length > 0) {
        this.selectedCategory.set('');
      }
    });

    effect(() => {
      const categoryId = this.selectedCategory().trim();
      if (categoryId) {
        this.searchTerm.set('');
      }
    });

    effect(() => {
      const term = this.searchTerm().trim();
      const categoryId = this.selectedCategory().trim();

      if (term.length > 0 && !categoryId) {
        this.productService.searchProducts(term);
      } else if (categoryId) {
        this.productService.searchProducts('', parseInt(categoryId));
      } else {
        this.loadCurrentPage();
      }
    });
  }

  private loadCurrentPage() {
    this.productService.loadProductsByPage(this.currentPage);
  }

  get productsList() {
    const categories = this.categoryService.categories().data || [];

    return (this.productService.products().data || []).map((product) => {
      const category = categories.find((c) => c.id === product.categoryId);
      return {
        ...product,
        categoryName: category?.name || 'Unknown',
      };
    });
  }

  get currentPage() {
    return this.productService.currentPage();
  }

  get totalPages() {
    return this.productService.totalPages();
  }

  get categories() {
    return this.categoryService.categories().data || [];
  }

  goToPage(page: number) {
    this.productService.loadProductsByPage(page);
  }
}
