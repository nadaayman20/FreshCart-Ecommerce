import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reseat-password',
  templateUrl: './reseat-password.component.html',
  styleUrls: ['./reseat-password.component.css']
})
export class ReseatPasswordComponent implements OnInit{
  forgetPassword !:FormGroup
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  first: boolean = true;
  seconde: boolean = false;
  done: boolean = false;
  isloader=false;

  @ViewChild('form1') form1!: ElementRef;
  @ViewChild('form2') form2!: ElementRef;
  @ViewChild('form3') form3!: ElementRef;
  errMsg:any;
  email: string = '';

  constructor( private _authServices: AuthService , private router:Router){}
  ngOnInit(): void {
    this.forgetPassword = new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
    })

    this.verifyCode = new FormGroup({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ]),
    });

    this.resetPassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [ Validators.required, Validators.pattern(/^\w{6,}$/),
      ]),
    });
  }
ForgetPassword(form:FormGroup){
  this.isloader = true;
  if (form.valid) {
    console.log(form.value);
    this._authServices.ForgotPassword(form.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusMsg === 'success') {
          this.errMsg = response.message;
          this.isloader = false;
          form.disable();

          this.email = form.get('email')?.value;
          this.first = false;
          this.seconde = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isloader = false;
      },
    });
  }
}

handleVerifyResetCode(verifyCode:FormGroup): void {
  this.isloader = true;
  if (verifyCode.valid) {
    console.log(verifyCode.value);
    this._authServices.VerifyResetCode(verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.errMsg = res.status;
          this.isloader = false;
          this.verifyCode.disable();
          this.seconde = false;
          this.done = true;
          this.resetPassword.get('email')?.setValue(this.email);
          this.resetPassword.get('email')?.disable();
        }
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isloader = false;
      },
    });
  }
}
handleResetPassword(resetPassword:FormGroup): void {
  this.isloader = true;
  if (resetPassword.valid) {
    console.log(resetPassword.value);
    const userData = {
      email: this.email,
      newPassword: resetPassword.get('newPassword')?.value,
    };
    this._authServices.ResetPassword(userData).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.token) {
          this.errMsg = res.message;
          localStorage.setItem('_token', res?.token);
          this._authServices.getUserData();
          this.isloader = false;
          resetPassword.disable();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isloader = false;
      },
    });
  }
}
}
