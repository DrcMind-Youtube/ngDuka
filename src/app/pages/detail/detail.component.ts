import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { APIService } from '../../core/services/api.service';
import { Subscription, switchMap } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductListComponent } from '../products/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  imports: [ProductListComponent],
  template: `
    <main class="max-width">
      @if (loading()) {
      <h1 align="center">Chargement du produit...</h1>
      }@else { @if (product) {
      <div class="product-container">
        <img [src]="product.image" alt="product image" />
        <div class="product-info">
          <p>
            <b>{{ product.title }}</b>
          </p>
          <p>{{ product.category }}</p>
          <p>
            <b>$ {{ product.price }}</b>
          </p>
          <div class="quantity-container">
            <span>Quantité:</span>
            <button
              [class.disabled-btn]="productQty() === 1"
              [disabled]="productQty() === 1"
              (click)="qtyHandling('minus')"
            >
              -
            </button>
            <span
              ><b> {{ productQty() }} </b></span
            >
            <button
              [class.disabled-btn]="productQty() === 5"
              (click)="qtyHandling('add')"
              [disabled]="productQty() === 5"
            >
              +
            </button>
          </div>
          <hr />
          <span
            ><b>Total: $ {{ product.price! * productQty() }} </b></span
          >
          <button (click)="addToCart(product)">Ajouter au panier</button>
          <br />
          <hr />
          <p>{{ product.description }}</p>
        </div>
      </div>
      }@else {
      <h1 align="center">Oups! Aucun produit trouvé</h1>
      } }

      <br />
      <br />
      <app-product-list
        title="Ceci pourrait aussi vous plaire"
        query="allProducts"
      />
    </main>
  `,
  styles: `
  .product-container{
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    margin: 2rem auto !important;

    img{
      width: 50%	;
    }

    .product-info{
      width: 40%
    }
  }

  .disabled-btn{
    background: grey;
    opacity:0.5
  }

  .quantity-container{
    display:flex;
    align-items:center;
    gap:0.5rem
  }

  `,
})
export default class DetailComponent implements OnInit, OnDestroy {
  product!: Product;
  api = inject(APIService);
  routeSub!: Subscription;
  route = inject(ActivatedRoute);
  title = inject(Title);
  loading = signal(true);

  productQty = signal(1);

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(switchMap((params) => this.api.getProduct(Number(params['id']))))
      .subscribe((product) => {
        this.product = product;
        this.title.setTitle(`${product.title} - ngDuka`);
        this.loading.set(false);
      });
  }

  addToCart(product: Product) {
    this.api.addNewProduct(product);
    this.productQty.set(1);
    this.api.cartItemCount.update((value) => value + 1);
  }

  qtyHandling(operation: string) {
    if (operation === 'add') {
      this.productQty.update((value) => value + 1);
    } else {
      this.productQty.update((value) => value - 1);
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
