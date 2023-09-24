import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  ordersData: any[] = [];
  userId: string = '';
  constructor(private _productService:ProductsService, private _AuthService:AuthService){

  }
  ngOnInit(): void {
    this._AuthService.UserData.subscribe({
      next: (res) => {
        if (res !== null) {
          this.userId = res.id;
          this._productService.getUserOrdes(this.userId).subscribe({
            next: (res) => {
              this.ordersData = res;
              console.log(this.ordersData)

            },
          });
        }
      },
    });
  }

}
