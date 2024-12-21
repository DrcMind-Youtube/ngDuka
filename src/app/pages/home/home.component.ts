import { Component } from '@angular/core';
import { ProductListComponent } from '../products/product-list.component';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  template: `
    <section align="center" class="hero-section">
      <h2>Bienvenue sur ngDuka</h2>
      <h3>Une boutique en ligne pour le demo Http Client en Angular</h3>
      <input placeholder="Rechercher dans Soko" type="text" />
    </section>
    <br />
    <app-product-list
      title="Electroniques"
      query="electronics"
      [queryLimit]="4"
    />
    <br />
    <app-product-list title="Bijoux" query="jewelery" [queryLimit]="4" />
    <br />
    <app-product-list
      title="Vêtements pour hommes"
      query="men's clothing"
      [queryLimit]="4"
    />
    <br />
    <app-product-list
      title="Vêtements pour femmes"
      query="women's clothing"
      [queryLimit]="4"
    />
  `,
  styles: `
  .hero-section{
    background: linear-gradient(to right, #FF7F7F, #FFB6C1);
    padding: 2rem;

    input{
     width: 50vw;
     padding:0.5rem;
     font-size: 1rem;
    }
  }
  
  `,
})
export default class HomeComponent {}
