import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './manage-categories.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class ManageCategoryComponent implements OnInit {
  selectedCategory: Category | null = null;

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.categoryService.loadCategories();
  }

  get categoriesList(): Category[] {
    return this.categoryService.categories().data || [];
  }

  onSelectCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = Number(target.value);
    if (!categoryId) return;

    this.categoryService.findOne(categoryId).subscribe((category) => {
      this.selectedCategory = category;
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
      });
    });
  }

  onUpdate(): void {
    if (!this.selectedCategory) return;

    const updated = this.categoryForm.value;
    this.categoryService
      .update(this.selectedCategory.id, updated)
      .subscribe(() => {
        alert('Category updated!');
        this.categoryService.loadCategories();
      });
  }

  onDelete(): void {
    if (!this.selectedCategory) return;

    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.remove(this.selectedCategory.id).subscribe(() => {
        alert('Category deleted.');
        this.selectedCategory = null;
        this.categoryForm.reset();
        this.categoryService.loadCategories();
      });
    }
  }
}
