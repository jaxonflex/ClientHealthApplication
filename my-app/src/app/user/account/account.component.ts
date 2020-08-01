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
                console.log("the result is: " + result);
                var result = this.userListService.getSpecificAccount(this.paramID);
                this.returnInfo(this.getAccountInfo,this.assignInfo);
                console.log(result.accountID);

            }

        });
    }

    getAccountInfo(){
        console.log("get account called");
        return this.userListService.getSpecificAccount(this.paramID)
    }
    assignInfo(results){
        console.log(results);
    }
    returnInfo(getInfo,assignInfo){
        console.log("reutrn info called");
        var results = getInfo();
        console.log("get info is done: " + results);
        assignInfo(results);
    }

}