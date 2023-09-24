import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token:string | null ;
  numOfCartItems:BehaviorSubject<number> =new BehaviorSubject(0);
  cartId:BehaviorSubject<string> =new BehaviorSubject("");

  constructor(private _HttpClient:HttpClient) {
    this.token= localStorage.getItem("userToken");
    this.getCart().subscribe({
      next:(res)=>{
          this.numOfCartItems.next(res.numOfCartItems)
          this.cartId.next(res.data.id)
      },
      error:(err)=>{
        console.log(err)
      }
    })

   }
  addToCart(productId:String) : Observable<any>{
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
   { productId:productId},
   {
    headers:{
      token: `${this.token}`
    }
   }
   );
  }
  getCart() : Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
     headers:{
       token: `${this.token}`
     }
    }
    );
   }
   updateCart(productId:string,count:number) : Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count:count},
    {
     headers:{
       token: `${this.token}`
     }
    }
    );
   }
   removeCart(productId:string) : Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
     headers:{
       token: `${this.token}`
     }
    }
    );
   }
   clearCart() : Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
     headers:{
       token: `${this.token}`
     }
    }
    );
   }
   onlinePayment(cartId:string, shippingAddress:any) : Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://nadaayman20.github.io/FreshCart-Ecommerce/`,
      {shippingAddress:shippingAddress},
      {headers:{
       token: `${this.token}`
      }
    });
  }
}
