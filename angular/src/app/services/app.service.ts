import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('jwt')
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http : HttpClient) { 
    
  }
  
  postRequest(baseurl,itemjson){
    return this.http.post(baseurl,itemjson,httpOptions);
  }
  
  putRequest(baseurl,itemjson){
    return this.http.put(baseurl,itemjson,httpOptions);
  }
  
  deleteRequest(baseurl,itemjson){
    return this.http.delete(baseurl,itemjson);
  }
  
  getRequest(baseurl){
    return this.http.get(baseurl,httpOptions);
  }
}
