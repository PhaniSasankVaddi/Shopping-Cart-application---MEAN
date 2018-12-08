import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitsComponent } from './fruits/fruits.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [FruitsComponent, SearchComponent],
  imports: [
    CommonModule
  ]
})
export class ShelfModule { }
