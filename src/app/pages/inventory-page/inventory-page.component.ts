import { Component, computed, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent implements OnInit {
  searchTerm = signal('');
  selectedCategory = signal('');

  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.loadProductsByPage(this.currentPage);
  }

  get categories() {
    return this.productService.categories();
  }

  filteredProducts = computed(() => {
    const products = this.productService.products().data || [];

    const term = this.searchTerm().toLowerCase();
    const categoryFilter = this.selectedCategory();

    return products.filter((p) => {
      const matchesTerm =
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term);

      const matchesCategory = categoryFilter
        ? p.category === categoryFilter
        : true;

      return matchesTerm && matchesCategory;
    });
  });

  goToPage(page: number) {
    this.productService.loadProductsByPage(page);
  }

  get currentPage() {
    return this.productService.currentPage();
  }

  get totalPages() {
    return this.productService.totalPages();
  }
}
