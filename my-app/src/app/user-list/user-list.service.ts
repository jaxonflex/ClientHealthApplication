import {UserListModel} from './user-list.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn:'root'})
export class UserListService {
    private userList:UserListModel[] = [];
    private userListUpdated = new Subject<UserListModel[]>();
    
    getUserList(){
        return [...this.userList];
    }

    getUserListUpdatedListener() {
        return this.userListUpdated.asObservable();//we set the subject as an observable. The subject will actively notify app of new user
    }

    addUserToList(newUser) {
        this.userList.push(newUser);
        this.userListUpdated.next([...this.userList]);
    }
}