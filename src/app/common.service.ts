import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,

  ) { }
  signUp(data:any){
    return this.http.post('http://localhost:3001/signup', data);
  }
  login(data : any){
    return this.http.post('http://localhost:3001/login',data);
  }
  getProducts(){
    return this.http.get('http://localhost:3001/products');
  }
}
