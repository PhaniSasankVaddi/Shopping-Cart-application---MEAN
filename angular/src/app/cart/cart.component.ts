import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  products = [];
  
  fetchcartUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/fetchCart";
  
  @ViewChild('quantity')
  quantity: ElementRef
  
  constructor(private router : Router, private appservice: AppService, private elementRef: ElementRef) { 
    let el = this.elementRef.nativeElement;
    console.log(el);
  }

  ngOnInit() {
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      this.appservice.getRequest(this.fetchcartUrl).subscribe((items:any) =>{
        items.forEach(product =>{
        this.products.push(product);
      })
      })
    }
  }
  
  ngAfterViewInit(){
    //console.log(this.quantity);
  }
  
  buyNow(){
    
  }

}
