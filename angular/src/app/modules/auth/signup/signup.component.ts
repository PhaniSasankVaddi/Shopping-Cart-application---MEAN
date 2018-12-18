import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  password1;
  confirmPassword1;
  email1;
  username1;
  /*signupPref;*/
  
  signupPref:boolean;
  signupMsg;

  constructor(private authservice: AuthService,
              private router : Router) { }
                
  
  ngOnInit() {
    
  }
  
  validatePassword(){
    if(this.password1==this.confirmPassword1){
      return false;
      
    }else{
      return true;
    }
  }
  
  onSubmit(){
    let userInfo = {
      'email': this.email1,
      'username' : this.username1,
      'password' : this.password1
    }
    /*if(this.signupPref=="admin"){
      this.authservice.userRegistration("/admin/signup",userInfo);
    }else{*/
      this.authservice.userRegistration("/user/signup",userInfo);
      if(!this.authservice.successInd){
        this.signupPref = true;
        this.signupMsg = "!!!Registration Failed"
      }else{
        this.router.navigate(['/auth/login']);
      }
    //}
  }

}
