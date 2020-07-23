import { Component } from '@angular/core';
import { UserListService } from '../user-list/user-list.service';
import {UserListModel} from '../user-list/user-list.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
})
export class ViewAccountComponent {
  title = 'view-account';
  users:UserListModel[]=[];
  private userListSub: Subscription;
  userListService: UserListService;

  constructor(userListService:UserListService) {
    this.userListService = userListService;
  }
}