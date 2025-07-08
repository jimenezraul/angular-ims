import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResponse } from '../models/product';
import { HttpService } from './httpService';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpService {
  private productsUrl = `${this.apiUrl}/products`;
  private _products = signal<ProductResponse>({ data: [], page: 1, total: 0 });

  products = this._products;
  loading = signal(true);
  limit = 50;

  constructor(http: HttpClient) {
    super(http);
  }

  loadProductsByPage(page: number = 1, limit: number = this.limit) {
    this.loading.set(true);
    this.http
      .get<ProductResponse>(`${this.productsUrl}?page=${page}&limit=${limit}`)
      .subscribe({
        next: (data) => {
          this._products.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Failed to load products', err);
          this.loading.set(false);
        },
      });
  }

  searchProducts(
    query: string,
    categoryId?: number,
    page: number = 1,
    limit: number = this.limit
  ) {
    const paramsObj: Record<string, string> = {
      query,
      page: page.toString(),
      limit: limit.toString(),
    };

    if (categoryId && categoryId > 0) {
      paramsObj['categoryId'] = categoryId.toString();
    }

    const params = new URLSearchParams(paramsObj);

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
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(`${this.productsUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productsUrl}/${id}`);
  }

  currentPage = computed(() => this._products().page);
  totalPages = computed(() => Math.ceil(this._products().total / this.limit));
}
