import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { ProductDetailsPageComponent } from './pages/products/product-details-page/product-details-page.component';
import { AddProductPageComponent } from './pages/products/add-product-page/add-product-page.component';
import { EditProductPageComponent } from './pages/products/edit-product-page/edit-product-page.component';
import { AddCategoryComponent } from './pages/categories/add-category/add-category.component';
import { ManageCategoryComponent } from './pages/categories/manage-categories/manage-categories.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'inventory', component: InventoryPageComponent },
  { path: 'product/:id', component: ProductDetailsPageComponent },
  { path: 'add-product', component: AddProductPageComponent },
  { path: 'add-category', component: AddCategoryComponent },
  {
    path: 'manage-categories',
    component: ManageCategoryComponent,
  },
  { path: 'edit-product/:id', component: EditProductPageComponent },
  { path: '**', redirectTo: '' },
];
