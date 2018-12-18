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
  
  fetchcartUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/fetchCart";
  updateItemsUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/updateItems";
  clearcartUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/clearCart";
  
  constructor(private router : Router, private appservice: AppService) { 
    
  }

  ngOnInit() {
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      this.appservice.getRequest(this.fetchcartUrl).subscribe((items:any) =>{
        if(items){
        items.forEach(product =>{
        this.products.push(product);
      })
      })
      }else{
        setInterval(() => {this.router.navigate[('/items')]}, 5000);
        
      }
      }
    }
  }
  
  ngAfterViewInit(){
    //console.log(this.quantity);
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
    this.appservice.postRequest(this.updateItemsUrl,itemjson).subscribe((items:any) =>{
      this.clearCart();
      localStorage.clear();
    })
  }
  
  clearCart(){
    this.appservice.postRequest(this.clearcartUrl,'').subscribe();
      this.router.navigate(['/items']);
  }

}
