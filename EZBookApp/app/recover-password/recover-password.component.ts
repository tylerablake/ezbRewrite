import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '~/services/authentication.service';
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from 'rxjs/Subscription';
import * as dialogs from "ui/dialogs";
import { Config } from '~/shared/config';

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
  private tracBlueHex: string = Config.tracBlueHex;
  private recoverPasswordSubscription: Subscription;

  constructor(private authService:AuthenticationService, private routerExtensions:RouterExtensions) { }

  ngOnInit() { }

  onRecoverPasswordSubmit(){
    this.authService.recoverPassword(this.username, this.scac).subscribe((success:boolean) => {      
      if(success){
        this.username = "";
        this.scac = "";
        this.routerExtensions.navigate(["/login"], {clearHistory: true});
        dialogs.alert({
          title: "Success",
          message: "Your temporary password has been sent to you by email",
          okButtonText: "Ok"
        });        
      } else{        
        dialogs.alert({
          title: "Error",
          message: "User/SCAC combination don't match",
          okButtonText: "Try Again"
        });        
        }
      });
  }

  ngOnDestroy(){
    if(this.recoverPasswordSubscription){
      this.recoverPasswordSubscription.unsubscribe();
    }    
  }
}