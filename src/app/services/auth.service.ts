import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

let apiUrl = "http://127.0.0.1:8000/";
/* let apiUrl = "http://192.168.1.4:8000/"; */


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data_provider:any;
  constructor(public http:HttpClient) {

   }

  postData(data, type){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Access-Control-Allow-Origin' :  '*',
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
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
      .pipe(
    
      );
  }

  private handleError(error: Response | any) {  
    console.error(error.message || error);  
    return Observable.throw(error.status);  
  }  

  getData(type, access_token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Access-Control-Allow-Origin' :  '*',
        'Authorization': 'Bearer ' + access_token
      })
    };
    return this.http.get(apiUrl+type, httpOptions)
    .pipe(
      map(res => {
        if (res['success'] == false) {
          throw new Error('Value expected!');
        }
        //console.log(res['data'])
        return res;
      }),
      catchError(this.handleError)
   );
  }
  
  isAuthenticated(){
    return localStorage.getItem('userProvider');
  }
}
