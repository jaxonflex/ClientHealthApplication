import { Component} from '@angular/core';
import { UserListService } from 'src/app/user-list/user-list.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
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
  

  
  constructor(public userListService: UserListService){}
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