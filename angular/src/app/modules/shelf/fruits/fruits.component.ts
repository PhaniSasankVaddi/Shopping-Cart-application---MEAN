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
  comments = [];
  score : number = 0;

  constructor(private appservice: AppService, private router: Router) { 
    this.appservice.getRequest("/fruit/load").subscribe((item:any) =>{
      item.forEach(product =>{
        this.fruits.push(product);
      })
    });
    
    /*this.appservice.getRequest("/user/loadComments").subscribe((feedback:any) =>{
      if(feedback){
      feedback.forEach(comment =>{
        this.comments.push(comment);
      })
      }
    })*/
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
      this.appservice.postRequest("/user/addtoCart",itemjson).subscribe();
    }
  }
  
  addtoWishlist(itemName){
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      var itemjson = {
        'fruitName':itemName
      }
      this.appservice.postRequest("/user/addtoFav",itemjson).subscribe();
    }
  }
  
  addcomment(fruitName,commentField){
    
  }



}

