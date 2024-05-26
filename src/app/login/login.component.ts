import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Property } from '../properties/property.model';
import { PropertyService } from '../shared/property.service';
import { Login } from '../login/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formValue: any;
  loginModelObj:Login =new Login();
  constructor(private router: Router,private fb:FormBuilder,private api:PropertyService){
  
 }

 ngOnInit(){
  this.formValue = this.fb.group({
    email :['',[Validators.email,Validators.required]],
    password :['',[Validators.required,Validators.minLength(8)]],

  })
 }
  redirect(){
    this.router.navigate(['/signup']);
  }
  login(){
    console.log('Here is the data', this.formValue.value)
    if(this.formValue.value.email && this.formValue.value.password){
      this.loginModelObj.email = this.formValue.value.email;
      this.loginModelObj.password = this.formValue.value.password;
      this.api.addUser(this.loginModelObj).subscribe((res:any)=>{
        console.log('res', res);
        let ref =document.getElementById('clear');
        ref?.click();
        this.router.navigate(['/property']);
        this.formValue.reset();
      }, err =>{
        console.log('Err',err)
      })
    }else{
      alert('Enter the Credentials!!')
    }
    
  }
}
