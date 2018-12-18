import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toggleMenu = false;
  authName;
  
  constructor(private router : Router) {
    setInterval(() => {
      this.ngOnInit();
    }, 3000);}
  
  ngOnInit() {
    if(localStorage.getItem('jwt')){
      this.authName = 'SignOut';
    }else{
      this.authName = 'SignIn';
    }
  }
  
  movetoLogin(){
    if(localStorage.getItem('jwt')){
      localStorage.clear();
      this.ngOnInit();
    }
    this.router.navigate(['/auth/login']);
  }
  
}
