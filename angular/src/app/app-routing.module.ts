import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
{
  path:'items', loadChildren: './modules/shelf/shelf.module#ShelfModule',  
},
{
  path:'adminActions', component: AdminComponent
},
{
  path:'wishlist', component: FavouriteComponent
},
{
  path:'cart', component: CartComponent
},
{
  path:'login', loadChildren: './modules/auth/auth.module#AuthModule'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
