import { Injectable } from '@angular/core';
import { AccountModel } from './account.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class AccountService {
    constructor(private http:HttpClient){}

    getAccountWithID(accountID){
        return this.http.get(`http://localhost:4000/account/${accountID}`);
    }
}