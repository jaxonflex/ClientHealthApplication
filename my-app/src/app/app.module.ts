import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProfileComponent} from './user/profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import {UserListComponent} from './user-list/user-list.component';
import { AccountComponent } from './user/account/account.component';
import {AccountService} from './user/account/account.service';
import { MatConfirmDialogComponent } from './dialog/mat-confirm-dialog/mat-confirm-dialog.component';




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
    BrowserAnimationsModule,
    MatIconModule,
    
  ],
  providers: [AccountService],
  entryComponents:[MatConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
