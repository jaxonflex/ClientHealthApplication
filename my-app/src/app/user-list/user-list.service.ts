import {UserListModel} from './user-list.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class UserListService {
    private userList:UserListModel[] = [];
    private userListUpdated = new Subject<UserListModel[]>();

    constructor(private http: HttpClient){}
    
    getUserList(){
        this.http.get<{message: string, users:UserListModel[]}>('http://localhost:3000/users')
            .subscribe((userListData)=>{
                this.userList = userListData.users;
                this.userListUpdated.next([...this.userList]);
            });
            
    }



    getUserListUpdatedListener() {
        return this.userListUpdated.asObservable();//we set the subject as an observable. The subject will actively notify app of new user
    }



    addUserToList(newUser) {
        this.http.post<{message:string}>('http://localhost:3000/users',newUser)
            .subscribe((responseData)=> {
                this.userList.push(newUser);
                this.userListUpdated.next([...this.userList]);
                
            });

    }

    getSpecificAccount(accountID)  {
        console.log("Called + " + accountID);
        return{...this.userList.find(account=> account.accountID === accountID)};  
    }



    updateSpecificAccount(id, user){
        console.log(user)
        const newUser = user;
        this.http.put('http://localhost:3000/users/' + id,user)
        .subscribe(response => console.log(response));

    }
}