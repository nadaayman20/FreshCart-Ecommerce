import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isloader=false;
  apiError:any;
  constructor( private _authServices: AuthService , private router:Router){}

loginForm:FormGroup= new FormGroup({
  email:new FormControl(null, [Validators.required, Validators.email]),
  password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{3,8}$/)]),
})
login(form:FormGroup){
  if(form.valid){
    this.isloader=true;
    this._authServices.login(form.value).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.isloader=false;
        localStorage.setItem('userToken', data.token)
        this._authServices.getUserData();
        this.router.navigate(['/home'])
      },
      error:(err:any)=>{
        console.log(err.error.message);
        this.apiError=err.error.message;
      }
    })
  }
  else{

  }

}

ngOnInit(): void {

}
}
