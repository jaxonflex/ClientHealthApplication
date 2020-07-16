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
        this.http.get<{message: string, users:UserListModel[]}>('http://localhost:3000/users')
            .subscribe((userListData)=>{
                console.log("user list is: " + userListData.users)
                console.log("message" + userListData.message)
                this.userList = userListData.users;
                console.log("userList" + this.userList)
                this.userListUpdated.next([...this.userList]);
            });
    }

    getUserListUpdatedListener() {
        return this.userListUpdated.asObservable();//we set the subject as an observable. The subject will actively notify app of new user
    }

    addUserToList(newUser) {
        this.http.post<{message:string}>('http://localhost:3000/users',newUser)
            .subscribe((responseData)=> {
                console.log(responseData.message)
                this.userList.push(newUser);
                this.userListUpdated.next([...this.userList]);
            });

    }
}