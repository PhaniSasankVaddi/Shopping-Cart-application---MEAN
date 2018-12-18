import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.scss']
})
export class FruitsComponent implements OnInit {
  
  fruits = [];
  
  loadFruitsUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/fruit/load";
  addtoCartUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/addtoCart";
  addtoFavUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/user/addtoFav";
  

  constructor(private appservice: AppService, private router: Router) { 
    this.appservice.getRequest(this.loadFruitsUrl).subscribe((item:any) =>{
      console.warn(item);
      item.forEach(product =>{
        this.fruits.push(product);
      })
    });
  }

  ngOnInit() {
    
  }
  
  addtoCart(itemName){
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      var itemjson = {
        'fruitName':itemName
      }
      this.appservice.postRequest(this.addtoCartUrl,itemjson).subscribe();
    }
  }
  
  addtoWishlist(itemName){
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      var itemjson = {
        'fruitName':itemName
      }
      this.appservice.postRequest(this.addtoFavUrl,itemjson).subscribe();
    }
  }

}
