import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-product-page.component.html',
})
export class AddProductPageComponent {
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private categoriesService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sku: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-_]+$/),
      ]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      category: new FormControl('', [Validators.required]),
    });
    this.categoriesService.loadCategories();
  }

  get name() {
    return this.productForm.get('name')!;
  }
  get sku() {
    return this.productForm.get('sku')!;
  }
  get quantity() {
    return this.productForm.get('quantity')!;
  }
  get price() {
    return this.productForm.get('price')!;
  }

  get categoryControl() {
    return this.productForm.get('category');
  }

  get category() {
    return this.categoriesService.categories().data || [];
  }
  get description() {
    return this.productForm.get('description')!;
  }
  get location() {
    return this.productForm.get('location')!;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = { ...this.productForm.value };

      formValue.categoryId = Number(formValue.category);
      delete formValue.category;

      this.productService.createProduct(formValue).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/inventory']);
        },
        error: (err) => {
          console.error('Failed to add product', err);
          alert('Failed to add product');
        },
      });
    }
  }
}
