import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }
  getProducts(pageNum: number = 1): Observable <any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
  }
  getProductsById(id:String): Observable <any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategories(): Observable <any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  getCategoriesById(id:string): Observable <any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  getSubCategory(id:string): Observable <any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }
  getBrands(): Observable <any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  getBrandsById(id:string): Observable <any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
  getAllOrdes(): Observable <any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/orders')
  }
  getUserOrdes(userId:string): Observable <any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }

}
