import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';

const routes: Routes = [
  {path:'', component:WishlistPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
