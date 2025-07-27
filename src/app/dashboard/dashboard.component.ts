import { Component } from '@angular/core';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../common.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopNavComponent,FormsModule,CommonModule,MatTableModule,MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 searchTerm = '';
 products: any[] = [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.commonService.getProducts().subscribe((res: any) => {
     if(res.code == 200){
      this.products = res.data;
     }
    });
  }
}
