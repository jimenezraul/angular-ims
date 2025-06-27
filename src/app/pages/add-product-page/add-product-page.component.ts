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
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-product-page.component.html',
})
export class AddProductPageComponent {
productForm!: FormGroup;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sku: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-_]+$/),
      ]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
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
  get category() {
    return this.productForm.get('category')!;
  }
  get description() {
    return this.productForm.get('description')!;
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value);
      alert('Product added successfully!');
      this.router.navigate(['/inventory']);
    }
  }
}
