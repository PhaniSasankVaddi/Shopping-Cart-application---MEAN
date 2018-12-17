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
    this.http.post(regUrl,userInfo).subscribe((data:any) =>{
      if(data){
        this.successInd = true;
      }else{
        this.successInd = false;
      }
    });
  }
  
  login(baseUrl,credentials, loginPref){
     return this.http.post(baseUrl,credentials).subscribe((data:any) =>{
        if(data){
          this.successInd = true;
          localStorage.setItem('jwt',data);
          if(loginPref == "admin"){
              localStorage.setItem('isAdmin', 'true');
          }else{
            localStorage.setItem('isAdmin', 'false');
          }
        }else{
          this.successInd = false;
        }
      });
  }
  
}                                                                   
