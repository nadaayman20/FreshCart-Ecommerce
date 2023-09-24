import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from './../../core/interface/product';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit{
  allProducts: Product[] =[];
  searchProduct: string ="";
  constructor(private _productServices: ProductsService){}
  getAllProducts(){
    this._productServices.getProducts().subscribe({
      next:(res)=>{
         console.log(res)
         this.allProducts= res.data;
      }
    })
  }
  ngOnInit(): void {
   this.getAllProducts();
  }

}
