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
            this.userList = this.userListService.getSpecificAccount(this.accountID)
            this.inputAccountID = this.userList.accountID;
            this.inputAccountName= this.userList.accountName;
            this.inputContactName = this.userList.contactName;
            this.inputEmail = this.userList.email;
            this.inputSalesforceURL = this.userList.salesforceURL;
            this.inputRenewalDate = this.userList.renewalDate;
            this.inputLicenseStartDate = this.userList.licenseStartDate;
            this.inputClientHealth = this.userList.clientHealth;
            this.inputCasesURL = this.userList.casesURL;
            this.inputLastContactDate = this.userList.lastContactDate;

        }
        else {
          this.mode='create';
          this.accountID=null;
        }
    });
  }



  onSaveNewUser() {
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
    
    if(this.mode==="create")
    {
      console.log("Should not be called");
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
    else {
      this.userList.accountID = this.inputAccountID;
      this.userList.accountName = this.inputAccountName;
      this.userList.contactName = this.inputContactName;
      this.userList.email = this.inputEmail;
      this.userList.salesforceURL = this.inputSalesforceURL;
      this.userList.licenseStartDate = this.inputLicenseStartDate;
      this.userList.renewalDate = this.inputRenewalDate;
      this.userList.clientHealth = this.inputClientHealth;
      this.userList.renewalDate = this.inputRenewalDate;
      this.userList.lastContactDate = this.inputLastContactDate;
      this.userList.casesURL = this.inputCasesURL;


      this.userListService.updateSpecificAccount(this.userList.accountID, this.userList);
      //this.userListService.updateSpecificAccount(newUserList);
    }


  }
}