import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  
  products=[];
  successMsg;
  successInd:boolean;
  
  constructor(private router : Router,private appservice: AppService) { }

  ngOnInit() {
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      this.appservice.getRequest("/user/fetchFav").subscribe((items:any) =>{
        items.forEach(product =>{
        this.products.push(product);
      })
      })
    }
  }
    
    movetoCart(item){
      let itemjson = {
        'fruitName': item
      }
      this.appservice.postRequest("/user/movetoCart",itemjson).subscribe((items:any) =>{
        if(items){
          this.successInd = true;
          this.successMsg = "Item moved to cart";
        }else{
          this.successInd = false;
          this.successMsg = "!!!There is some problem in moving the item to cart";
        }
      });
    }

}
