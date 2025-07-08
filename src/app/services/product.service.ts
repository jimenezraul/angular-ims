import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product, ProductResponse } from '../models/product';
import { CategoryResponse } from '../models/category';
import { HttpService } from './httpService';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpService {
  private productsUrl = `${this.apiUrl}/products`;
  private _products = signal<ProductResponse>({ data: [], page: 1, total: 0 });

  products = this._products;
  limit = 50;

   constructor(http: HttpClient) {
    super(http);
    this.loadProductsByPage();
  }

  loadProductsByPage(page: number = 1, limit: number = this.limit) {
    this.http
      .get<ProductResponse>(`${this.productsUrl}?page=${page}&limit=${limit}`)
      .subscribe({
        next: (data) => this._products.set(data),
        error: (err) => console.error('Failed to load products', err),
      });
  }

  searchProducts(query: string, page: number = 1, limit: number = this.limit) {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString(),
    });

    this.http
      .get<ProductResponse>(`${this.productsUrl}/search?${params.toString()}`)
      .subscribe({
        next: (data) => this._products.set(data),
        error: (err) => console.error('Failed to search products', err),
      });
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product) {
    console.log('Updating product with ID:', id, 'Data:', product);
    return this.http.put<Product>(`${this.productsUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productsUrl}/${id}`);
  }

  currentPage = computed(() => this._products().page);
  totalPages = computed(() => Math.ceil(this._products().total / this.limit));
}
