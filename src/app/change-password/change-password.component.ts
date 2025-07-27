import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';
  username = localStorage.getItem('user') || '';

  constructor(private http: HttpClient) { }

  changePassword() {
    this.http
      .post('http://localhost:3001/change-password', {
        username: JSON.parse(this.username).username,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
      .subscribe({
        next: (res: any) => {
          alert(res.message);
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
  }
}
