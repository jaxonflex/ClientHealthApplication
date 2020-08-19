import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProfileComponent} from './user/profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import {UserListComponent} from './user-list/user-list.component';
import { AccountComponent } from './user/account/account.component';
import {AccountService} from './user/account/account.service';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    UserListComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,

  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
