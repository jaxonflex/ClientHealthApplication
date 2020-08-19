import { Injectable } from '@angular/core';
import { AccountModel } from './account.model';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
    providedIn:'root'
})
export class AccountService {
    constructor(private http:HttpClient){}
    private accountNotes: AccountModel[] = [];
    private accountNotesUpdated = new Subject<AccountModel[]>();

    getAccountNotesUpdatedAsListener(){
        return this.accountNotesUpdated.asObservable();
            
    }
    getAccountNotes(accountID){
        this.http.get<{message:string,notes:AccountModel[]}>(`http://localhost:3000/account/${accountID}`)
            .subscribe((accountNotesData)=>{
                this.accountNotes = accountNotesData.notes;
                this.accountNotesUpdated.next([...this.accountNotes])
            });
    }

    addNoteToUser(newNote){
        console.log("new Note")
        console.log(newNote);
        this.http.post<{message:string}>('http://localhost:3000/account', newNote)
            .subscribe((responseData)=>{
                console.log(responseData);
            });
        
    }

    deleteNote(noteID){
        this.http.delete<{message:string}>(`http://localhost:3000/account/${noteID}`)
            .subscribe((responseData)=>{
                console.log(responseData);
            })
    }
}