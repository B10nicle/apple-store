import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProducts[];
  productsSubscription: Subscription;
  basket: IProducts[];
  basketSubscription: Subscription;
  canEdit: boolean;

  constructor(private productsService: ProductsService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.canEdit = false;
    this.productsSubscription = this.productsService.getProducts().subscribe(data => this.products = data);
    this.basketSubscription = this.productsService.getProductFromBasket().subscribe(data => this.basket = data)
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  openDialog(product?: IProducts): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "300px";
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
        if (data) {
          data && data.id
            ? this.updateData(data)
            : this.postData(data)
        }
      }
    );
  }

  updateData(product: IProducts) {
    this.productsService
      .updateProduct(product)
      .subscribe(data => this.products = this.products.map(product =>
        product.id === data.id
          ? data
          : product
      ));
  }

  postData(data: IProducts) {
    this.productsService
      .postProduct(data)
      .subscribe(data => this.products.push(data));
  }

  deleteItem(id: number) {
    this.productsService
      .deleteProduct(id)
      .subscribe(() => this.products.splice(this.products.findIndex(val => val.id === id), 1));
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    if (this.basket.length > 0) {
      const findItem = this.basket.find(item => item.id === product.id)
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.productsService.postProductToBasket(product).subscribe(data => this.basket.push(data));
  }

  updateToBasket(product: IProducts) {
    product.quantity++;
    this.productsService.updateProductToBasket(product).subscribe(data => {
    });
  }
}
