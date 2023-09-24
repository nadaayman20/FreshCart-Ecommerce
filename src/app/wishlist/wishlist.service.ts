import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token:string | null ;
  numOfWishlistItems:BehaviorSubject<number> =new BehaviorSubject(0);
  constructor(private _httpClient: HttpClient) {
    this.token= localStorage.getItem("userToken");
    if(this.token !== null){
      this.getWishlist().subscribe({
        next:(res)=>{
          this.numOfWishlistItems.next(res.count)
        },
        error:(err)=>{
          console.log(err)
        }
      })


     }
  }

  addToWishlist(productId:String) : Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId:productId},
    {
     headers:{
       token: `${this.token}`
     }
    }
    );
   }

   removeItem(productId:string) : Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
     headers:{
       token: `${this.token}`
     }
    }
    );
   }

   getWishlist() : Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
     headers:{
       token: `${this.token}`
     }
    }
    );
   }
}
