import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorsComponent} from "./shop/authors/authors.component";
import {UsersComponent} from "./shop/user/users/users.component";
import {UserEditComponent} from "./shop/user/user-edit/user-edit.component";



const routes: Routes = [
  {path: 'author', component: AuthorsComponent},
  {path: 'user', component: UsersComponent},
  {path: 'user-edit/:id', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
