import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/core/interface/brand';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit{
  brandId:string ="";
  brandDetail: Brand ={} as Brand
  constructor(private _productsService:ProductsService , private _activatedRoute:ActivatedRoute){
    this._activatedRoute.paramMap.subscribe((res:any)=>{
     this.brandId= res.params.id
    })
    this._productsService.getBrandsById(this.brandId).subscribe({
      next:(res)=>{
        this.brandDetail=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  ngOnInit(): void {

  }

}
