import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from '../../core/interface/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productId: String ="";
  productDetails:Product = {} as Product;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  constructor(private _activatedRoute:ActivatedRoute , private _productServices: ProductsService, private _cartService:CartService){
    this._activatedRoute.paramMap.subscribe((res:any)=>{
      this.productId=res.params.id
    })
    this._productServices.getProductsById(this.productId).subscribe({
      next:(res)=>{
         this.productDetails= res.data
         console.log(this.productDetails)
      }
    })
  }
  addProduct(id:string){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._cartService.numOfCartItems.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {

  }

}
