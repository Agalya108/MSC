import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  user: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  dropdownOpen = false;

toggleDropdown(event: Event): void {
  event.preventDefault();
  this.dropdownOpen = !this.dropdownOpen;
}
routeHome(){
  this.router.navigate(['/dashboard']);
}
changePassword(){
  this.router.navigate(['/change-password']);
}
}
