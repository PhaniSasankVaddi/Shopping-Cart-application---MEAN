import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitsComponent } from './fruits/fruits.component';
import { SearchComponent } from './search/search.component';
import { ShelfRoutingModule } from './shelf-routing.module';

@NgModule({
  declarations: [FruitsComponent, SearchComponent],
  imports: [
    CommonModule,
    ShelfRoutingModule
  ]
})
export class ShelfModule { }
