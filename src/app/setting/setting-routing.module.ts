import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReseatPasswordComponent } from './reseat-password/reseat-password.component';

const routes: Routes = [
  {path:'', redirectTo:'reseat', pathMatch:'full'},
  {path:"change", component:ChangePasswordComponent},
  {path:"reseat", component:ReseatPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
