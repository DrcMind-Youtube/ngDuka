import { Component, input } from '@angular/core';
import { ProductListComponent } from './product-list.component';

@Component({
  selector: 'app-products',
  imports: [ProductListComponent],
  template: `
    <main class="max-width">
      <app-product-list [title]="category()" [query]="category()" />
      <br />
      <app-product-list
        title="Vous aimerez peut-être aussi ceci"
        query="allProducts"
      />
    </main>
  `,
  styles: ``,
})
export default class ProductsComponent {
  category = input('category');
}
