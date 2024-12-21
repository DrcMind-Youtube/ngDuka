import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { APIService } from '../../core/services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  template: `
    <main>
      @if (loading) {
      <h1 align="center">Chargement des produits...</h1>
      }@else {
      <header>
        <h3>{{ title() }}</h3>
        @if(query() !== 'allProducts'){
        <a class="action" [routerLink]="'/products/' + query()">
          <span>Voir plus</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path
              d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
            />
          </svg>
        </a>
        }
      </header>
      <div class="product-container">
        @for (product of products; track $index) {<a
          class="product-card"
          [routerLink]="'/product/' + product.id"
        >
          <img [src]="product.image" />
          <div class="product-info">
            <p class="truncate">
              {{ product.title }}
            </p>
            <p>
              <b>$ {{ product.price }}</b>
            </p>
          </div> </a
        >}@empty {
        <p align="center">
          Oups! Aucun produit trouvé <br />
          Vérifier votre connexion internet.
        </p>
        }
      </div>
      }
    </main>
  `,
  styles: `
  main{
    max-width: max-content;
    margin: auto;
  }

  header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .action{
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .product-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem
  }

  .product-card{
    width: 250px;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    transition: 250ms ease-in-out;

    &:hover {
      opacity: 0.8;
      scale: 0.95;
    }

    img{
      width: calc(100% - 1rem);
      margin: 0 auto;
      padding:0.5rem;
      height: 200px;
      object-fit: contain;
    }

    .product-info {
      border-top: 1px solid #e4e4e4;
      padding: 0.5rem;

      .truncate {
        width: 100%;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  
  `,
})
export class ProductListComponent implements OnInit, OnDestroy {
  title = input.required<string>();
  query = input.required<string>();
  queryLimit = input<number>();
  api = inject(APIService);
  products!: Product[];
  loading = true;
  readonly router = inject(Router);
  productsSub!: Subscription;
  pageTitle = inject(Title);

  ngOnInit() {
    const products$ =
      this.query() === 'allProducts'
        ? this.api.getProducts()
        : this.api.getProdutsByCategory(this.query(), this.queryLimit());

    this.productsSub = products$.subscribe((products) => {
      this.products = products;
      if (this.router.url.includes('products')) {
        this.pageTitle.setTitle(`${products[0].category} - ngDuka`);
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }
}
