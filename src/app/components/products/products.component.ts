import {Component, OnInit} from '@angular/core';
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
export class ProductsComponent implements OnInit {
  products: IProducts[];
  productsSubscription: Subscription;
  canEdit: boolean;

  constructor(private productsService: ProductsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.canEdit = true;

    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "300px";
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => this.postData(data));
  }

  postData(data: IProducts) {
    this.productsService
      .postProduct(data)
      .subscribe(data => this.products.push(data));
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
