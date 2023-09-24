import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category } from './../../core/interface/category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  categorytId: string ="";
  CategoryDetails:Category = {} as Category
  subCategory: any
  constructor(private _productsService: ProductsService, private _activatedRoute:ActivatedRoute){
     this._activatedRoute.paramMap.subscribe((res:any)=>{
      this.categorytId=res.params.id
     })
     this._productsService.getCategoriesById(this.categorytId).subscribe({
      next:(res)=>{
        this.CategoryDetails=res.data

      },
      error:(err)=>{
        console.log(err)
      }
     })
     this._productsService.getSubCategory(this.categorytId).subscribe({
      next:(res)=>{
     this. subCategory= res.data
     console.log(this.subCategory)

      },
      error:(err)=>{
        console.log(err)
      }
     })
  }

  ngOnInit(): void {

  }

}
