import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/data';
import { Config } from '../shared/config';
import * as dialogs from "ui/dialogs";
import { AccountService } from '~/services/account.service';
import { AuthenticationService } from '~/services/authentication.service';
import { UserDetails } from '~/data/user/user-details.model';
import { UserAccount } from '~/data/user/user-account.model';

@Component({
  selector: 'Account',
  moduleId: module.id,
  templateUrl: './account.component.html',
  styleUrls: ["./account.component.scss"],
  providers: [AccountService]  
})

export class AccountComponent implements OnInit {
  private accountInformation: UserAccount = new UserAccount();
  private shouldSeeBasicInformation: boolean = true;
  private accentHex: string = Config.tracBlueHex;
  constructor(private data:Data, private accountService: AccountService, private authService: AuthenticationService) { }

  ngOnInit() {     
    let userInfo = this.accountService.getUserDetails(this.data.userProfile.ApplicationUserId).subscribe((details : UserDetails) =>{
      this.accountInformation.UserID = details.ApplicationUserName;
      this.accountInformation.FirstName = details.ApplicationUserFirstName;
      this.accountInformation.LastName = details.ApplicationUserLastName;
      this.accountInformation.Email = details.ApplicationUserEmail;
      this.accountInformation.PhoneNumber = details.ApplicationUserPhone;
      this.accountInformation.SCAC = this.data.userProfile.ScacCode;
    });            
  }

  onBasicInformationTapped(){
   this.shouldSeeBasicInformation = true; 
  }

  onChangePasswordTapped(){
    this.shouldSeeBasicInformation = false;
  }

  onBasicInformationSubmit(){    
    this.accountService.updateUser(this.accountInformation).subscribe((result) => {
      if(result){        
        dialogs.alert({
          title: "Update Successful",
          message: "Your account has been updated",
          okButtonText: "Ok"
        });
      }

    }, (error => {
        dialogs.alert({
          title: "Update Failed",
          message: "Please try again",
          okButtonText: "Ok"
        });
    }));

  }

  onChangePasswordSubmit(){

    if(this.accountInformation.NewPassword !== this.accountInformation.ConfirmPassword){
      dialogs.alert("New Password and Confirm Password must match.");
      return;
    }
    else{
      this.accountService.changePassword(this.accountInformation).subscribe((result) => {
        if(result){        
          this.authService.logout(false);        
        }
  
      }, (error => {
        dialogs.alert({
          title: "Update Failed",
          message: "Please try again",
          okButtonText: "Ok"
        });          
      }));
    }  
  }
}