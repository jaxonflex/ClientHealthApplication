import { Component, OnInit} from '@angular/core';
import { UserListService } from 'src/app/user-list/user-list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {UserListModel} from '../../user-list/user-list.model'
import { AccountModel } from './account.model';
import {Subscription} from 'rxjs';
import { AccountService } from './account.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogService } from 'src/app/dialog/dialog.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit{
    accountNotes : AccountModel[] = [];
    userList: UserListModel;
    private noteSub:Subscription;
    
    constructor(
        public userListService: UserListService,
        public route: ActivatedRoute, 
        public accountService:AccountService,
        public dialogService:DialogService,
        ){}
    
    private paramID: string;

    //variables that are from the userlistmodel
    textAccountID ='';
    textAccountName = '';
    textAccountEmail = '';
    textAccountLastContactDate = '';
    textQBR='';
    textUseCase='';
    isQBR=false;
    isUseCase=false;
    inputNote = '';
    textDateOfNote = '';
    textOustandingTask="don't try it";
    textOustandingTaskDate='Right now';
    
    

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
                this.textQBR=this.userList.QBR;
                this.textUseCase = this.userList.useCase;

                


                this.accountService.getAccountNotes(this.paramID);
                //getting notes associated with the account
                this.noteSub = this.accountService.getAccountNotesUpdatedAsListener()
                .subscribe((data: AccountModel[])=> {
                    console.log(data);
                    //ordering by most recently completed
                    data.reverse();
                    this.accountNotes = data;
                })


            }
            //checking to see if the QBR has a value for pulling up the input box or not
            if(this.textQBR.length>1 )
            {
                this.isQBR=true;
            }
            else {
                this.isQBR=false;
            }

            //checking to see if useCase has value for pulling up input box
            if(this.textUseCase.length>1 )
            {
                this.isUseCase=true;
            }
            else {
                this.isUseCase=false;
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
        this.accountService.addNoteToUser(newNote);
    }
    onUpdateAdditionalAccountInfo(){
        const newTask = {
            date:this.textOustandingTaskDate,
            task:this.textOustandingTask,

        }
        this.userList.QBR = this.textQBR;
        this.userList.useCase=this.textUseCase;
        this.userList.outstandingTasks = newTask;
        this.userListService.updateSpecificAccount(this.userList.accountID,this.userList);
    }



    //This is calling the onDeleteConfirm in the dialog.service.ts file. 
    onDeleteConfirm(noteID){
        console.log(noteID);
        this.dialogService.openConfirmDialog(noteID);
    }
}