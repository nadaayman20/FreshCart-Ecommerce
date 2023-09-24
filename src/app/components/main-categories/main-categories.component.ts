import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.css']
})
export class MainCategoriesComponent implements OnInit{
  allCategory:any[]=[]
  constructor(private _productService: ProductsService){}

  getAllCategory(){
    this._productService.getCategories().subscribe({
      next:(res) =>{
        this.allCategory= res.data
        console.log(this.allCategory)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
   this.getAllCategory()
  }

}
