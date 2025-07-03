import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product, ProductResponse } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private _products = signal<ProductResponse>({ data: [], page: 1, total: 0 });

  products = this._products;

  categories = computed(() => {
    const products = this._products();
    if (!Array.isArray(products.data)) return [];

    const categories = products.data.map((p) => p.category);
    return Array.from(new Set(categories));
  });

  constructor(private http: HttpClient) {
    this.loadProductsByPage();
  }

  loadProductsByPage(page: number = 1, limit: number = 12) {
    this.http
      .get<ProductResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`)
      .subscribe({
        next: (data) => this._products.set(data),
        error: (err) => console.error('Failed to load products', err),
      });
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product) {
    console.log('Updating product with ID:', id, 'Data:', product);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  currentPage = computed(() => this._products().page);
  totalPages = computed(() => Math.ceil(this._products().total / 12));
}
