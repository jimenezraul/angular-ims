import { Injectable, signal, computed } from '@angular/core';
import type { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = signal<Product[]>([
    {
      id: 1,
      name: 'Laptop Pro',
      sku: 'LP-001',
      description: 'High performance professional laptop.',
      quantity: 10,
      price: 1200,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      sku: 'WM-004',
      description: 'Ergonomic wireless mouse.',
      quantity: 25,
      price: 25,
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Office Chair',
      sku: 'OC-016',
      description: 'Comfortable office chair with adjustable height.',
      quantity: 5,
      price: 150,
      category: 'Furniture'
    },
  ]);
  
  readonly products = this._products.asReadonly();

  private _nextId = 4;

  getProductById(id: number) {
    return this._products().find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = { id: this._nextId++, ...product };
    this._products.update(products => [...products, newProduct]);
  }

  updateProduct(updatedProduct: Product) {
    this._products.update(products =>
      products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }

  deleteProduct(id: number) {
    this._products.update(products => products.filter(p => p.id !== id));
  }

  get categories() {
    const categories = this._products().map(p => p.category);
    return Array.from(new Set(categories));
  }
}