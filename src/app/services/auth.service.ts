import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

let apiUrl = "http://127.0.0.1:8000/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data_provider:any;
  constructor(public http:HttpClient) {
    const data  = localStorage.getItem('providerData');
    this.data_provider = JSON.parse(data);
   }

  postData(data, type){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer ' + this.data_provider['access_token']
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
    .pipe(
      
    );
  }

  login(data, type): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer ' + this.data_provider['access_token']
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
      .pipe(
    
      );
  }

  
  isAuthenticated(){
    return localStorage.getItem('adminData');
  }
}
