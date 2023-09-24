import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartId:string="";
sippingAddres:FormGroup = new FormGroup({
  details : new FormControl(null,[Validators.required, Validators.minLength(5)]),
  phone : new FormControl(null, [Validators.required]),
  city : new FormControl(null, [Validators.required])
})
constructor(private _cartService:CartService, private router:Router, private _activatedRoute:ActivatedRoute){
  this._activatedRoute.paramMap.subscribe((res:any)=>{
    this.cartId=res.params.cartId
  })
}
handelOnline(){
 this._cartService.onlinePayment(this.cartId,this.sippingAddres.value).subscribe({
  next:(res)=>{
    if(res.status=="success"){
      console.log(res.session.url)
      window.location.href= res.session.url
      this.router.navigate(['/allorders'])

    }
  }
 })
}
}
