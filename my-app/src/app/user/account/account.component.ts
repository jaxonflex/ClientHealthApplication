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
    account : AccountModel[] = [];
    userList: UserListModel;
    private sub:Subscription;
    constructor(public userListService: UserListService, public route: ActivatedRoute, public accountService:AccountService){}
    
    private paramID: string;

    textAccountID ='';
    

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('accountID')) {
                this.paramID = paramMap.get('accountID');
                this.userList = this.userListService.getSpecificAccount(this.paramID);
                this.textAccountID = this.userList.accountID;
                // this.inputAccountID = this.userList.accountID;
                // console.log(this.inputAccountID);

                this.accountService.getAccountWithID(this.paramID)
                .subscribe((data: AccountModel[])=> {
                    this.account = data;
                })


            }

        });
    }


}