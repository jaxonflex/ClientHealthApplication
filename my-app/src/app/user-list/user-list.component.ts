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

  users:UserListModel[]=[];
  private userListSub: Subscription;
  userListService: UserListService;

  constructor(userListService:UserListService) {
    this.userListService = userListService;
  }
  ngOnInit(){
    this.userListService.getUserList();
    
    this.userListSub = this.userListService.getUserListUpdatedListener()
    .subscribe((userList:UserListModel[]) => {
      
      this.users = userList;
    });
  }

  ngOnDestroy() {
    this.userListSub.unsubscribe();
  }
}