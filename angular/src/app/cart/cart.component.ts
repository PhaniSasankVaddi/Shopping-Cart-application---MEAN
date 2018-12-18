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
  grandtotal = 0;
  
  constructor(private router : Router, private appservice: AppService) { 
    
  }

  ngOnInit() {
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      this.appservice.getRequest("/user/fetchCart").subscribe((items:any) =>{
        if(items){
        items.forEach(product =>{
        this.products.push(product);
        })
      }
      })
    }
    
  }
  
  calgrandtotal(){
    for(var k=0;k<this.products.length;k++){
      this.grandtotal = this.grandtotal+ this.products[k].total;
    }
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
  
  buyNow(){
    var itemjson = {
      'items': this.products
    };
    this.appservice.postRequest("/user/updateItems",itemjson).subscribe((items:any) =>{
      this.clearCart();
      localStorage.clear();
    })
  }
  
  clearCart(){
    this.appservice.postRequest("/user/clearCart",'').subscribe();
      this.router.navigate(['/items']);
  }

}
