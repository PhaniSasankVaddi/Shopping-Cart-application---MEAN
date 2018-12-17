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
export class AuthService {
  
  successInd: boolean;

  constructor(private http : HttpClient) {
    
  }
  
  userRegistration(regUrl, userInfo){
    this.http.post(regUrl,userInfo,httpOptions).subscribe();
  }
  
  login(baseUrl,credentials){
     return this.http.post(baseUrl,credentials,httpOptions).subscribe((data:any) =>{
        if(data){
          this.successInd = true;
          localStorage.setItem('jwt',data);
        }else{
          this.successInd = false;
        }
      });
  }
  
}                                                                   
