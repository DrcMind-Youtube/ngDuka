import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'ngDuka',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/detail/detail.component'),
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products/products.component'),
  },
];
