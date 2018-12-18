import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  itemName1_add; altName1_add; price1_add; availability1_add; tax1_add; description1_add;
  itemName1_update; price1_update; availability1_update; tax1_update; description1_update;
  itemName1_delete;
  
  username1_status; userStatus;
  
  successMsg;
  successInd: boolean;
  
  constructor(private appservice: AppService) { }

  ngOnInit() {
  }
  
  addProduct(){
    let itemjson = {
      'fruitName': this.itemName1_add,
      'alt_name': this.altName1_add,
      'price': this.price1_add,
      'availability': this.availability1_add,
      'tax': this.tax1_add,
      'about': this.description1_add
    }
    this.appservice.postRequest("/admin/addItem",itemjson).subscribe((data:any) =>{
      this.successMsg = data.message;
      if(data){
         this.successInd = true;
      }
    });
  }
  
  updateProduct(){
    let itemjson = {
      'fruitName': this.itemName1_update,
      'price': this.price1_update,
      'availability': this.availability1_update,
      'tax': this.tax1_update,
      'about': this.description1_update
    }
    this.appservice.putRequest("/admin/updateItem",itemjson).subscribe((data:any) =>{
      this.successMsg = data.message;
      if(data){
        this.successInd = true;
      }
    });
  }
  
  deleteProduct(){
    let itemjson = {
      'fruitName': this.itemName1_delete
    }
    this.appservice.postRequest("/admin/deleteItem",itemjson).subscribe((data:any) =>{
      this.successMsg = data.message;
      if(data){
        this.successInd = true;
      }
    });
  }
  
  statusChange(){
    let userjson = {
      'email':this.username1_status,
      'action' : this.userStatus
    }
    this.appservice.putRequest("/admin/userStatus",userjson).subscribe((data:any) =>{
      this.successMsg = data.message;
      if(data){
        this.successMsg = true;
      }
    });
  }
  
  makeAdmin(){
    let userjson = {
      'email':this.username1_status
    }
    this.appservice.postRequest("/admin/makeAdmin",userjson).subscribe((data:any) =>{
      if(data){
        this.successMsg = true;
      }
    });
  }
}
