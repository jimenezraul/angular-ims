import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product, ProductResponse } from '../models/product';
import { CategoryResponse } from '../models/category';
import { HttpService } from './httpService';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends HttpService {
  private categoriesUrl = `${this.apiUrl}/categories`;
  private _categories = signal<CategoryResponse>({ data: [], total: 0 });

  categories = this._categories;

  constructor(http: HttpClient) {
    super(http);
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<CategoryResponse>(`${this.categoriesUrl}`).subscribe({
      next: (data) => this._categories.set(data),
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  getCategories() {
    return this.http.get(`${this.categoriesUrl}`);
  }
}
