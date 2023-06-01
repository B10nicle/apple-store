import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductsService) {
  }

  basket: IProducts[]
  basketSubscription: Subscription;

  ngOnInit(): void {
    this.basketSubscription = this.productService
      .getProductFromBasket()
      .subscribe(data => this.basket = data);
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  removeItem(product: IProducts) {
    if (product.quantity === 1) {
      this.productService
        .deleteProductFromBasket(product.id)
        .subscribe(() => this.basket.splice(this.basket.findIndex(val => val.id === product.id), 1));
    } else {
      product.quantity--;
      this.productService.updateProductToBasket(product).subscribe(data => {
      });
    }
  }

  addItem(product: IProducts) {
    product.quantity++;
    this.productService.updateProductToBasket(product).subscribe(data => {
    });
  }
}
