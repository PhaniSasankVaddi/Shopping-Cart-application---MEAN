import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  loginPref;
  email1;
  password1;
  loginfail:boolean;
  loginMsg;
  
  
  loginUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/signin";
  adminloginUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/signin"

  constructor(private authservice : AuthService,
              private router : Router) { 
                
  }

  ngOnInit() {
  }
  
  onSubmit(){
    let userjson = {
      'email': this.email1,
      'password': this.password1
    }
    if(this.loginPref == "admin"){
        this.authservice.login(this.adminloginUrl,userjson).subscribe((data:any) =>{
          if(data){
            this.loginfail = false;
            this.loginMsg = "!!!Login Failed";
          }else{
            this.loginfail = true;
            this.router.navigate(['/adminActions']);
          }
        });
    }
    else{
      this.authservice.login(this.loginUrl,userjson).subscribe((data:any) =>{
        if(data){
          this.loginfail = false;
          this.loginMsg = "!!!Login Failed";
        }else{
          this.loginfail = true;
          this.router.navigate(['/items']);
        }
      });
    }
    
    
  }

}