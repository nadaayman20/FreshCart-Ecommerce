import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit{
  constructor(private _wishlistService:WishlistService, private _cartService:CartService){}

  whishList: any[] = [];
  ngOnInit(): void {
    this.getAllWishlist()

   }

  getAllWishlist(){
   this._wishlistService.getWishlist().subscribe({
     next:(res)=>{
      this.whishList=res.data
         this._wishlistService.numOfWishlistItems.next(res.data.length);
       },
       error:(err)=>{
        console.log(err)
       }

   })
  }
  addToCart(id:string){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
       this._cartService.numOfCartItems.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  removeFromWhish(id:string){
     this._wishlistService.removeItem(id).subscribe({
      next:(res)=>{
        this.whishList = this.whishList.filter((item) =>
        res.data.includes(item._id)
      );

      // console.log(this.whishList);
      this._wishlistService.numOfWishlistItems.next(this.whishList.length);
      }

     })
  }
}
