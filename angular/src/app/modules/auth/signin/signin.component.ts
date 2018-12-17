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
  @Output() onLogin: EventEmitter<any> = new EventEmitter();
  
  
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
        this.authservice.login(this.adminloginUrl,userjson,this.loginPref);
          if(this.authservice.successInd){
            console.log(localStorage.getItem('jwt'));
            this.loginfail = false;
            this.onLogin.emit();
            this.router.navigate(['/adminActions']);
          }
    }
    else{
      this.authservice.login(this.loginUrl,userjson,this.loginPref);
        if(this.authservice.successInd){
          this.loginfail = false;
          this.onLogin.emit();
          this.router.navigate(['/items']);
        }
    }
    if(!this.authservice.successInd){
      this.loginfail = true;
      this.loginMsg = "!!!Login Failed";
    }
    
    
  }

}
