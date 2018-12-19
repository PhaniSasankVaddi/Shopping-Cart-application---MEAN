import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  

  constructor(private authservice : AuthService,
              private router : Router) { 
                
  }

  ngOnInit() {
  }
  
  onSubmit(e){
    if(!this.email1 && !this.password1){
      console.log('email ', !this.email1);
      console.log('password1 ', !this.password1);
      this.loginfail = true;
      this.loginMsg = "Username and password are mandatory";
      
    }else{
    let userjson = {
      'email': this.email1,
      'password': this.password1
    }
    if(this.loginPref == "admin"){
        this.authservice.login("/admin/signin",userjson,this.loginPref);
          if(this.authservice.successInd){
            this.loginfail = false;
            this.router.navigate(['/adminActions']);
          }
    }
    else{
      this.authservice.login("/user/signin",userjson,this.loginPref);
        if(this.authservice.successInd){
          this.loginfail = false;
          this.router.navigate(['/items']);
        }
    }
    if(!this.authservice.successInd){
      this.loginfail = true;
      this.loginMsg = "!!!Login Failed";
    }
    
    
  }
  }

}
