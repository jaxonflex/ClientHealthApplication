import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ViewAccountComponent } from './account/view-account.component';


const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'view-all', component:UserListComponent},
  {path: 'create',component:ProfileComponent},
  {path: 'edit/:accountID',component:ProfileComponent},
  {path: 'account', component:ViewAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
