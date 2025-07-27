import { Component,NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 user = {
    name: '',
    email: '',
    username: '',
    password: ''
  };
  constructor(private router: Router,private commonService: CommonService) {}
  onSubmit() {
    console.log('User details:', this.user);
    this.commonService.signUp(this.user).subscribe((res:any)=>{
      console.log(res);
      if(res.code ==200){
       console.log('Signup success:', res);
        alert('Signup successful!');
        this.router.navigate(['/login']);
      }
    })
  }
  login(){
    this.router.navigate(['/login']);
  }
}
