import { Injectable } from '@angular/core';
import { AccountModel } from './account.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class AccountService {
    constructor(private http:HttpClient){}

    getAccountNotes(accountID){
        return this.http.get(`http://localhost:3000/account/${accountID}`);
    }

    addNoteToUser(newNote){
        this.http.post<{message:string}>('http://localhost:3000/account', newNote)
        console.log(newNote)
    }
}