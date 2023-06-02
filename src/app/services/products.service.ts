import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProducts} from "../models/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = "http://localhost:3000/products";
  urlBasket: string = "http://localhost:3000/basket";
  productsShown: boolean = false;

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<IProducts[]>(this.url);
  }

  postProduct(product: IProducts) {
    return this.http.post<IProducts>(this.url, product);
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete<IProducts>(`${this.url}/${id}`);
  }

  updateProduct(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }

  getProductFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  postProductToBasket(product: IProducts) {
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<IProducts>(`${this.urlBasket}/${id}`);
  }
}
