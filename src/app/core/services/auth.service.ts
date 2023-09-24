import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import  JwtDecode  from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData:BehaviorSubject<any>= new BehaviorSubject("");
  token:string | null ;
  constructor(private _httpClient:HttpClient , private router:Router) {
    this.token= localStorage.getItem("userToken");
    if(this.token != null){
      this.getUserData()
    }
   }

  getUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let encoded= JwtDecode(encodedToken);
    console.log(encoded)
    this.UserData.next(encoded);
  }

  register(data:any): Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  login(data:any): Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }
  ForgotPassword(data:any): Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }
  VerifyResetCode(data:any): Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }
  ResetPassword(data:any): Observable<any>{
    return this._httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  }
  updatePassword(data:any): Observable<any>{
    return this._httpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',data,
    {
      headers:{
        token: `${this.token}`
      }
     }
    )
  }
  logOut(){
    localStorage.removeItem("userToken");
    this.UserData.next(null);
    this.router.navigate(['/login'])
  }

}
