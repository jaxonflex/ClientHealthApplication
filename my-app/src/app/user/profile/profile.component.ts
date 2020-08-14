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
  inputLicenseType='';
  inputPayment='';
  inputLatestResponse='';
  inputQBR='';
  inputUseCase='';

  private mode = 'create';
  private accountID: string;
  userList: UserListModel;

  licenseTypeDropDown = ["Services","Enterprise"];
  
  

  
  constructor(public userListService: UserListService, public route: ActivatedRoute){}

  ngOnInit() {
    //onInit check the url and if there is an account ID update inputs in html
    //and set the mode to edit
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
            this.inputLicenseType = this.userList.licenseType;
            this.inputQBR=this.userList.QBR;
            this.inputLatestResponse=this.userList.latestResponse;
            this.inputUseCase=this.userList.useCase;

        }
        //no account id means that we are creating a new user/account
        else {
          this.mode='create';
          this.accountID=null;
        }
    });
  }



  onSaveNewUser() {
    //create a newUserList that will be passed into parameter
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
      licenseType:      this.inputLicenseType,
      payment:          this.inputPayment,

    };
    //if we are doing create we are passing newUserList and then clearing out the values
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
      
      this.inputCasesURL='';
      this.inputLastContactDate='';
      this.inputLicenseType='';
      this.inputPayment='';
      this.inputQBR='';
      this.inputLatestResponse='';
      this.inputUseCase='';
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
      this.userList.licenseType = this.inputLicenseType;
      this.userList.payment = this.inputPayment;

      //call update fomr user-list.service.ts and then passing in the account id and userList array
      this.userListService.updateSpecificAccount(this.userList.accountID, this.userList);
      
    }


  }
}