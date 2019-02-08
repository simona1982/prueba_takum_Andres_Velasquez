import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { ProductInterface } from '../models/product-interface';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  products: Observable<any>;
  product: Observable<any>;
  ProductInterface: Observable<any>;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllProducts() {
    const token = this.authService.getToken();
    const url_api = `http://192.168.10.10:8000/api/v1/products`;

    return this.http.post(
      url_api,
      { token },
      { headers: this.headers }
    );
  }

  saveProduct(product: ProductInterface) {
    // TODO: obtener token
    // TODO: not null
    console.log(product);
    const token = this.authService.getToken();
    const url_api = `http://192.168.10.10:8000/api/v1/products/save`;

    return this.http
      .post<ProductInterface>(
        url_api,
        { product, token },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  deleteProduct(id: string) {
    // TODO: obtener token
    // TODO: not null
    const url_api = `http://192.168.10.10:8000/api/v1/products/delete`;
    return this.http
      .post<ProductInterface>(
        url_api, 
        { id },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }
}
