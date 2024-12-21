import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  API = 'https://fakestoreapi.com';
  http = inject(HttpClient);
  cartItemCount = signal(0);

  getProducts = () => this.http.get<Product[]>(`${this.API}/products`);

  getProduct = (id: number) =>
    this.http.get<Product>(`${this.API}/products/${id}`);

  getProdutsByCategory(category: string, limitCount?: number) {
    const limit = limitCount ? `?limit=${limitCount}` : '';
    return this.http.get<Product[]>(
      `${this.API}/products/category/${category}${limit}`
    );
  }

  addNewProduct = (c: Product) =>
    this.http.post<Product>(`${this.API}/carts`, c);

  cartProducts = () => this.http.get(`${this.API}/carts`);
}
