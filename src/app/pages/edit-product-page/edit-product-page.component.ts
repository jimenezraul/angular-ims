import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-edit-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product-page.component.html',
})
export class EditProductPageComponent {
  productForm!: FormGroup;
  productFound = true;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productId = id;
    this.productService.getProductById(id).subscribe((product) => {
      if (!product) {
        this.productFound = false;
        return;
      }

      this.productForm = new FormGroup({
        name: new FormControl(product.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        sku: new FormControl(product.sku, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9-_]+$/),
        ]),
        quantity: new FormControl(product.quantity, [
          Validators.required,
          Validators.min(0),
        ]),
        price: new FormControl(product.price, [
          Validators.required,
          Validators.min(0),
        ]),
        category: new FormControl(product.category, [
          Validators.required,
          Validators.minLength(3),
        ]),
        description: new FormControl(product.description, [
          Validators.required,
          Validators.minLength(10),
        ]),
        location: new FormControl(product.location, [
          Validators.required,
          Validators.minLength(2),
        ]),
      });
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
  get location() {
    return this.productForm.get('location')!;
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService
        .updateProduct(this.productId, this.productForm.value)
        .subscribe({
          next: () => {
            alert('Product updated successfully!');
            this.router.navigate(['/product', this.productId]);
          },
          error: (err) => {
            console.error('Failed to update product', err);
            alert('Failed to update product');
          },
        });
    }
  }

  goBack() {
    this.router.navigate(['/inventory']);
  }
}
