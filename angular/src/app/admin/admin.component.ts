import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  itemName1_add; altName1_add; price1_add; availability1_add; tax1_add; description1_add;
  itemName1_update; price1_update; availability1_update; tax1_update;
  itemName1_delete;
  
  username1_status; userStatus;
  
  successMsg;
  successInd: boolean;
  
  addProUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/addItem";
  updateProUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/updateItem";
  deleteProUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/deleteItem";
  statusChangeUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/userStatus";
  makeAdminUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/makeAdmin";

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
    this.appservice.postRequest(this.addProUrl,itemjson).subscribe((data:any) =>{
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
      'tax': this.tax1_update
    }
    this.appservice.putRequest(this.updateProUrl,itemjson).subscribe((data:any) =>{
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
    this.appservice.postRequest(this.deleteProUrl,itemjson).subscribe();
  }
  
  statusChange(){
    let userjson = {
      'email':this.username1_status,
      'action' : this.userStatus
    }
    this.appservice.putRequest(this.statusChangeUrl,userjson).subscribe();
  }
  
  makeAdmin(){
    let userjson = {
      'email':this.username1_status
    }
    this.appservice.postRequest(this.makeAdminUrl,userjson).subscribe();
  }
}
