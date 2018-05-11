import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from 'rxjs/Subscription';
import * as dialogs from "ui/dialogs";
import { AuthenticationService } from '~/services/authentication.service';
//import { TNSFancyAlert } from 'nativescript-fancyalert';


@Component({
  selector: "RecoverPassword",
  moduleId: module.id,
  templateUrl: "./recover-password.component.html",
  styleUrls: ["./recover-password.component.scss"],
  providers: [AuthenticationService]
})

export class RecoverPasswordComponent implements OnInit, OnDestroy {
  private username:string;
  private scac:string;
  private recoverPasswordSubscription: Subscription;

  constructor(private authService:AuthenticationService, private routerExtensions:RouterExtensions) { }

  ngOnInit() { }

  onRecoverPasswordSubmit(){
    
    this.authService.recoverPassword(this.username, this.scac).subscribe((success:boolean) => {      
      if(success){
        this.username = "";
        this.scac = "";
        this.routerExtensions.navigate(["/login"], {clearHistory: true});
        dialogs.alert("Success, your temporary password has been sent to you by email");
        //TNSFancyAlert.showSuccess("Success!", "Your temporary password has been sent to you by email", "Dismiss");
      } else{        
        dialogs.alert("User/SCAC combination don't match, please try again.");
        //TNSFancyAlert.showError("Error!", "User/SCAC combination don't match", "Try Again");
        }
      });
  }

  ngOnDestroy(){
    if(this.recoverPasswordSubscription){
      this.recoverPasswordSubscription.unsubscribe();
    }    
  }
}