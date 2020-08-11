import { Component, OnInit} from '@angular/core';
import { UserListService } from 'src/app/user-list/user-list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {UserListModel} from '../../user-list/user-list.model'
import { AccountModel } from './account.model';
import {Subscription} from 'rxjs';
import { AccountService } from './account.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit{
    accountNotes : AccountModel[] = [];
    userList: UserListModel;
    private noteSub:Subscription;
    constructor(public userListService: UserListService, public route: ActivatedRoute, public accountService:AccountService){}
    
    private paramID: string;

    textAccountID ='';
    textAccountName = '';
    textAccountEmail = '';
    textAccountLastContactDate = '';

    inputNote = '';
    textDateOfNote = '';
    

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('accountID')) {
                this.paramID = paramMap.get('accountID');
                this.userList = this.userListService.getSpecificAccount(this.paramID);
                this.textAccountID = this.userList.accountID;
                this.textAccountName = this.userList.accountName;
                this.textAccountEmail = this.userList.email;
                this.textAccountLastContactDate = this.userList.lastContactDate;
                // this.inputAccountID = this.userList.accountID;
                // console.log(this.inputAccountID);

                this.accountService.getAccountNotes(this.paramID);

                this.noteSub = this.accountService.getAccountNotesUpdatedAsListener()
                .subscribe((data: AccountModel[])=> {
                    this.accountNotes = data;
                    console.log("The account notes");
                    console.log(this.accountNotes);
                })


            }

        });
    }

    onAddNewNote(){
        var date = new Date();
        this.textDateOfNote = date.toString();
        
        const newNote = {
            accountID : this.textAccountID,
            note: this.inputNote,
            date: this.textDateOfNote,
        }
        console.log(newNote);

        this.accountService.addNoteToUser(newNote);
        
    }


}