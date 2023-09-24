import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/core/interface/brand';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
  allBrands: Brand []=[]
  constructor(private _productsService:ProductsService){}
  getAllBrand(){
    this._productsService.getBrands().subscribe({
      next:(res)=>{
        this.allBrands=res.data
        console.log(this.allBrands)
      },
      error:(err)=>{
          console.log(err)
      }
    })
  }
  ngOnInit(): void {
this.getAllBrand()
  }

}
