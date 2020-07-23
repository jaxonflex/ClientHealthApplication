import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './user/profile/profile.component';


const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'create',component:ProfileComponent},
  {path: 'edit', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
