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

    //variables that are from the userlistmodel
    textAccountID ='';
    textAccountName = '';
    textAccountEmail = '';
    textAccountLastContactDate = '';
    textQBR='';
    textLatestResponse='';
    textUseCase='';

    inputNote = '';
    textDateOfNote = '';
    

    ngOnInit() {
        //checking for the account ID. We will be using account ID to get general account information and notes associated
        //with the specific account. 
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('accountID')) {
                this.paramID = paramMap.get('accountID');
                //getting the userlist information associated with the account
                this.userList = this.userListService.getSpecificAccount(this.paramID);
                this.textAccountID = this.userList.accountID;
                this.textAccountName = this.userList.accountName;
                this.textAccountEmail = this.userList.email;
                this.textAccountLastContactDate = this.userList.lastContactDate;
                


                this.accountService.getAccountNotes(this.paramID);
                //getting notes associated with the account
                this.noteSub = this.accountService.getAccountNotesUpdatedAsListener()
                .subscribe((data: AccountModel[])=> {
                    //ordering by most recently completed
                    data.reverse();
                    this.accountNotes = data;
                })


            }

        });
    }
    //this calls the post request from the account.service.ts
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