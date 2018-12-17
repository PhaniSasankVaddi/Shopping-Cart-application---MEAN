import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.scss']
})
export class FruitsComponent implements OnInit {
  
  fruits = [];
  
  loadFruitsUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/fruit/load";
  

  constructor(private appservice: AppService) { 
    this.appservice.getFruits(this.loadFruitsUrl).subscribe((item:any) =>{
      console.warn(item);
      item.forEach(product =>{
        this.fruits.push(product);
      })
    });
  }

  ngOnInit() {
    
  }
  
  addtoCart(itemName){
    console.warn(itemName);
  }
  
  addtoWishlist(itemName){
    
  }

}
