import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http : HttpClient) { 
    
  }
  
  adminAction(baseurl,itemjson){
    this.http.post(baseurl,itemjson,httpOptions).subscribe();
  }
  
}
