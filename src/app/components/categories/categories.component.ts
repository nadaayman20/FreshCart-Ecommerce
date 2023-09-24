import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/core/interface/category';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  allCategories :Category[] = []
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items:6
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
   constructor(private _productsService:ProductsService){}

  ngOnInit(): void {
  this.getCategories()
  }
  getCategories(){
    this._productsService.getCategories().subscribe({
      next:(res:any)=>{
          this.allCategories= res.data
      }
    })
  }
}
