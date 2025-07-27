import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router,
    private commonService: CommonService
  ) { }

  onLogin() {
    // const mockUser = {
    //   username: 'admin',
    //   password: 'password123'
    // };

    // if (this.username === mockUser.username && this.password === mockUser.password) {
    //   localStorage.setItem('user', JSON.stringify({ username: this.username }));
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   alert('Invalid username or password');
    // }
    let payload = {
      username: this.username, password: this.password
    }

    this.commonService.login(payload).subscribe((res: any) => {
      console.log(res);
      if(res.code == 200){
         localStorage.setItem('user', JSON.stringify({ username: this.username }));
        this.router.navigate(['/dashboard']);
      }
    })
  }
  signUp(){
    console.log('signing');
    
    this.router.navigate(['/signup']);
  }
}
