import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MainCategoriesComponent } from './components/main-categories/main-categories.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',canActivate:[AuthGuard], component:HomeComponent },
  {path:'about',canActivate:[AuthGuard], component:AboutComponent},
  {path:'brand',canActivate:[AuthGuard], component:BrandComponent},
  {path:'brandDetails/:id',canActivate:[AuthGuard], component:BrandDetailsComponent},
  {path:'categories',canActivate:[AuthGuard], component:CategoriesComponent},
  {path:'MainCategories',canActivate:[AuthGuard], component:MainCategoriesComponent},
  {path:'categoryDetails/:id',canActivate:[AuthGuard], component:CategoryDetailsComponent},
  {path:'products',canActivate:[AuthGuard], component:ProductsComponent},
  {path:'productsDetails/:id',canActivate:[AuthGuard], component:ProductDetailsComponent},
  {path:'login', component:SignInComponent},
  {path:'signup', component:SignUpComponent},
  {path:'checkout/:cartId',canActivate:[AuthGuard], component:CheckoutComponent},
  {path:'allorders',canActivate:[AuthGuard], component:OrdersComponent},
  {path:'setting',canActivate:[AuthGuard], loadChildren:()=>import('./setting/setting.module').then(s=>s.SettingModule)},
  {path:'cart', loadChildren:()=>import('./cart/cart.module').then(c => c.CartModule)},
  {path:'wishlist' , canActivate:[AuthGuard],loadChildren:()=>import('./wishlist/wishlist.module').then(w=>w.WishlistModule)},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
