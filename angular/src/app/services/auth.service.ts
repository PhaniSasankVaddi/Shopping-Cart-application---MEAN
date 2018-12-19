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
  info;
  
  baseUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080";

  constructor(private http : HttpClient) {
    
  }
  
  userRegistration(route, userInfo){
    this.http.post(this.baseUrl+route,userInfo).subscribe((data:any) =>{
      if(data){
        this.successInd = true;
        this.info = data.message;
      }else{
        this.successInd = false;
        this.info  = "Error occured while registration";
      }
    });
  }
  
  login(route,credentials, loginPref){
     return this.http.post(this.baseUrl+route,credentials).subscribe((data:any) =>{
        if(data){
          this.successInd = true;
          this.info = data.message;
          localStorage.setItem('jwt',data);
          if(loginPref == "admin"){
              localStorage.setItem('isAdmin', 'true');
          }else{
            localStorage.setItem('isAdmin', 'false');
          }
        }else{
          this.successInd = false;
          this.info = "Error occured while logging in";
        }
      });
  }
  
}                                                                   
