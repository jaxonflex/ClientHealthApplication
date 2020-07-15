import {UserListModel} from './user-list.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn:'root'})
export class UserListService {
    private userList:UserListModel[] = [];
    private userListUpdated = new Subject<UserListModel[]>();

    constructor(private http: HttpClient){}
    
    getUserList(){
        this.http.get<{message: string, userList:UserListModel[]}>('http://localhost:3000/posts')
            .subscribe((userListData)=>{
                console.log("message" + userListData.message)
                this.userList = userListData.userList;
                console.log("userList" + this.userList)
                this.userListUpdated.next([...this.userList]);
            });
    }

    getUserListUpdatedListener() {
        return this.userListUpdated.asObservable();//we set the subject as an observable. The subject will actively notify app of new user
    }

    addUserToList(newUser) {
        this.userList.push(newUser);
        this.userListUpdated.next([...this.userList]);
    }
}