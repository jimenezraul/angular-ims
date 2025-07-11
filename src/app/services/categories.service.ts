import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryResponse } from '../models/category';
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
  }

  loadCategories() {
    this.http.get<CategoryResponse>(`${this.categoriesUrl}`).subscribe({
      next: (data) => this._categories.set(data),
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  findOne(id: number) {
    return this.http.get<Category>(`${this.categoriesUrl}/${id}`);
  }

  createCategory(category: Category) {
    return this.http.post(`${this.apiUrl}/categories`, category);
  }

  update(id: number, data: Partial<Category>) {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }
}
