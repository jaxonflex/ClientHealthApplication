import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {UserListModel} from '../user-list/user-list.model';
import { UserListService } from './user-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  // users = [
  //   {
  //     accountID: '1234', 
  //     contactEmail: '1@234.com', 
  //     accountName: 'Nintendo', 
  //     contactName: 'mr Sir', 
  //     salesforceURL:'www.google.com',
  //     startDate:'1/2/2020',
  //     clientHealth:'Bad',
  //     renewalDate:'1/3/2021',
  //     casesURL:'www.you.rock'
  // }
  // ];
  users:UserListModel[]=[];
  private userListSub: Subscription;
  userListService: UserListService;

  constructor(userListService:UserListService) {
    this.userListService = userListService;
  }
  ngOnInit(){
    this.users = this.userListService.getUserList();
    this.userListSub = this.userListService.getUserListUpdatedListener()
    .subscribe((userList:UserListModel[]) => {
      this.users = userList;
    });
  }

  ngOnDestroy() {
    this.userListSub.unsubscribe();
  }
}