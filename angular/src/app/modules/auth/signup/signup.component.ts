import { Component, OnInit } from '@angular/core';
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
  
  regUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/signup";
  adminregUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/signup"

  constructor(private authservice: AuthService) { }
                
  

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
      this.authservice.userRegistration(this.adminregUrl,userInfo);
    }else{*/
      this.authservice.userRegistration(this.regUrl,userInfo);
    //}
  }

}
