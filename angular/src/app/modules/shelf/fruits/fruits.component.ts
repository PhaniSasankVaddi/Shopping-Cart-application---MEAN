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
  commentField;
  ratingField;
  successInd;
  successMsg;state;
  

  constructor(private appservice: AppService, private router: Router) { 
    this.appservice.getRequest("/fruit/load").subscribe((item:any) =>{
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
  
  addcomment(fruitName,commentField,ratingField){
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }else{
      console.log(!commentField);
      if(!commentField){
        this.successInd = true;
        this.successMsg = "Please enter comment";
        this.state = "danger";
        if(!ratingField){
          this.ratingField=3;
        }
      }else{
      var commentjson = {
        'fruitName':fruitName,
        'rating':ratingField,
        'comment':commentField
      }
      this.appservice.postRequest("/user/addComment",commentjson).subscribe((comment:any) =>{
        if(comment){
          this.commentField = "";
          this.ratingField = 0;
          this.successInd = true;
          this.successMsg = comment.message;
          this.state = "success";
        }
      })
    }
    }
    
  }
  
  getComments(fruit){
    this.comments = [];
    var fruitInfo = {
      'fruitName':fruit
    }
    this.appservice.postRequest("/user/loadComments",fruitInfo).subscribe((reviews:any) =>{
      if(reviews){
        reviews.forEach(review =>{
        this.comments.push(review.comment+"      - Rating="+review.rating);
      })
      }
    });
  }
}

