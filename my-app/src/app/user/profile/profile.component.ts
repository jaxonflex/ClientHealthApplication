import { Component, OnInit} from '@angular/core';
import { UserListService } from 'src/app/user-list/user-list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserListModel } from 'src/app/user-list/user-list.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  title = 'app-profile';
  inputAccountID='';
  inputAccountName='';
  inputContactName='';
  inputEmail ='';
  inputSalesforceURL = '';
  inputLicenseStartDate='';
  inputClientHealth = '';
  inputRenewalDate='';
  calcDaysTillRenewal='';
  inputCasesURL='';
  inputLastContactDate='';

  private mode = 'create';
  private accountID: string;
  userList: UserListModel;
  

  
  constructor(public userListService: UserListService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has('accountID')) {
            this.mode='edit';
            this.accountID = paramMap.get('accountID');
            this.userList == this.userListService.getSpecificAccount(this.accountID);
            console.log(this.userList.email);
        }
        else {
          this.mode='create';
          this.accountID=null;
        }
    });
  }

  onCreateNewUser() {
    const newUserList = {
      accountID:        this.inputAccountID,
      accountName:      this.inputAccountName,
      contactName:      this.inputContactName,
      email:            this.inputEmail,
      salesforceURL:    this.inputSalesforceURL,
      licenseStartDate: this.inputLicenseStartDate,
      clientHealth:     this.inputClientHealth,
      renewalDate:      this.inputRenewalDate,
      daysTillRenewal:  this.calcDaysTillRenewal,
      casesURL:         this.inputCasesURL,
      lastContactDate:  this.inputLastContactDate,

    };
    this.userListService.addUserToList(newUserList);
    this.inputAccountID='';
    this.inputAccountName='';
    this.inputContactName='';
    this.inputEmail ='';
    this.inputSalesforceURL = '';
    this.inputLicenseStartDate='';
    this.inputClientHealth = '';
    this.inputRenewalDate='';
    //this.inputDaysTillRenewal='';
    this.inputCasesURL='';
    this.inputLastContactDate='';
  }
}