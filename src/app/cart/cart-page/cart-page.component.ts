import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from 'src/app/cart';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartDetails: Cart ={} as Cart
 constructor(private _cartService:CartService){}
  ngOnInit(): void {
   this.getAllCart()
  }

 getAllCart(){
  this._cartService.getCart().subscribe({
    next:(res)=>{
        this.cartDetails=res
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }

  })
 }
 updateCart(id:string, count:number){
   this._cartService.updateCart(id,count).subscribe({
    next:(res)=>{
      this.cartDetails=res
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
   })
 }
 removeItem(id:string){
  this._cartService.removeCart(id).subscribe({
    next:(res)=>{
      this.cartDetails= res
      this._cartService.numOfCartItems.next(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err.error.message)
    }
  })
 }
 clearCart(){
  this._cartService.clearCart().subscribe({
    next:(res)=>{
        this.cartDetails= res
        this._cartService.numOfCartItems.next(0);
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }
}
