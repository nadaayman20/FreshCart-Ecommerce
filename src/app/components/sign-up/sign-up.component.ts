import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isloader=false;
  apiError:any;
  constructor( private _authServices: AuthService , private router:Router){}

registerForm:FormGroup= new FormGroup({
  name:new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null, [Validators.required, Validators.email]),
  password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{3,8}$/)]),
  rePassword:new FormControl(null, [Validators.required, Validators.pattern(/^[A-za-z0-9]{3,8}$/)]),
  phone:new FormControl(null, [ Validators.required, Validators.minLength(10), Validators.maxLength(13)])
})
register(form:FormGroup){
  if(form.valid){
    this.isloader=true;
    this._authServices.register(form.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.isloader=false;
        this.router.navigate(['/login'])
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
