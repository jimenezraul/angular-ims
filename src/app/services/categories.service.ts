import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryResponse } from '../models/category';
import { HttpService } from './httpService';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends HttpService {
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
}
