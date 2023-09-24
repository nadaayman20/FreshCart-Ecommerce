import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FilterCartPipe } from './filter-cart.pipe';


@NgModule({
  declarations: [
    CartPageComponent,
    FilterCartPipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
