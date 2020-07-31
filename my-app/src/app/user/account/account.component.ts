import { Component, OnInit} from '@angular/core';
import { UserListService } from 'src/app/user-list/user-list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountModel } from './account.model';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit{
    account : AccountModel[] = [];
    constructor(public userListService: UserListService, public route: ActivatedRoute){}
    userList:UserListService;
    private paramID: string;

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('accountID')) {
                this.paramID = paramMap.get('accountID');
                var result = this.userListService.getSpecificAccount(this.paramID);
                console.log("the sreulst is: " + result);

            }

        });
    }

    getAccountIDFromURL(){

    }
}