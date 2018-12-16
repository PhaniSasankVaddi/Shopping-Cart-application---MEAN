import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  itemName1_add; altName1_add; price1_add; availability1_add; tax1_add;
  itemName1_update; price1_update; availability1_update; tax1_update;
  itemName1_delete;
  
  addProUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/addItem";
  updateProUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/updateItem";
  deleteProUrl = "https://ece9065-pvaddi-lab5-pvaddi.c9users.io:8080/admin/deleteItem";

  constructor(private appservice: AppService) { }

  ngOnInit() {
  }
  
  addProduct(){
    let itemjson = {
      'fruitName': this.itemName1_add,
      'alt_name': this.altName1_add,
      'price': this.price1_add,
      'availability': this.availability1_add,
      'tax': this.tax1_add
    }
    this.appservice.adminAction(addProUrl,itemjson);
  }
  
  updateProduct(){
    let itemjson = {
      'fruitName': this.itemName1_update,
      'price': this.price1_update,
      'availability': this.availability1_update,
      'tax': this.tax1_update
    }
    this.appservice.adminAction(updateProUrl,itemjson);
  }
  
  deleteProduct(){
    let itemjson = {
      'fruitName': this.itemName1_delete
    }
    this.appservice.adminAction(deleteProUrl,itemjson);
  }

}
