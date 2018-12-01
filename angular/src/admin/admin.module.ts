import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [AddComponent, UpdateComponent, DeleteComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
