import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { EditProductPageComponent } from './pages/edit-product-page/edit-product-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'inventory', component: InventoryPageComponent },
  { path: 'product/:id', component: ProductDetailsPageComponent },
  { path: 'add-product', component: AddProductPageComponent },
  { path: 'edit-product/:id', component: EditProductPageComponent },
  { path: '**', redirectTo: '' },
];