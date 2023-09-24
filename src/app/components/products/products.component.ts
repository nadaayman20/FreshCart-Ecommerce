import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/core/interface/product';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  pages:number[]=[];
  curentPage: number = 0;

  constructor(private _produvtService: ProductsService, private _cartService: CartService){
    this.pages =new Array(2).fill("").map((ele,index)=>index+1)
    console.log(this.pages)
  }
  ngOnInit(): void {
    this._produvtService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.curentPage = response.metadata.currentPage;
        console.log(this.products,this.curentPage)
      },
  })
}
pageChanged(pageNum: number): void {
  this.curentPage = pageNum;
  this._produvtService.getProducts(pageNum).subscribe({
    next: (response) => {
      this.products = response.data;
      this.curentPage = response.metadata.currentPage;
    },
  });
}
addProduct(id:string){
  this._cartService.addToCart(id).subscribe({
    next:(res)=>{
     this._cartService.numOfCartItems.next(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
}
