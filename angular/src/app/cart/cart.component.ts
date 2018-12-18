import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  products:any = [];
  
  fetchcartUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/fetchCart";
  
  constructor(private router : Router, private appservice: AppService) { 
    
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
  
  changeQuantity(event){
      for(var k=0;k<this.products.length;k++){
        if(event.target.id==this.products[k].fruitName){
          this.products[k].quantity = event.target.value;
          let withoutTax = (event.target.value)*(this.products[k].price);
          let tax = (withoutTax*this.products[k].tax)/100;
          this.products[k].total = tax+withoutTax;
        }
      }
  }
  
  deleteItem(itemName){
    for(var k=0;k<this.products.length;k++){
      if(itemName == this.products[k].fruitName){
        this.products.splice(k,1);
      }
    }
  }

}
