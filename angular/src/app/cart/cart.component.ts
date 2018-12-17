import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    localStorage.clear();
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }
  }

}
