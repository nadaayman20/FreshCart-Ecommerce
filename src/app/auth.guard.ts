import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private _router: Router) {

}
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

  if(localStorage.getItem("userToken") != null){
    return true;
  }
  else{
    this._router.navigate(['/login']);
    return false;
  }
}
}
