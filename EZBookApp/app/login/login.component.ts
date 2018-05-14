import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
//import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import { Page } from "ui/page";
import * as platformModule from "tns-core-modules/platform";
import { Config } from "../shared/config";
import { AuthenticationService } from "~/services/authentication.service";
import * as dialogs from "ui/dialogs";

@Component({
  selector: "Login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  private username: string;
  private password: string;  
  private logoImageSrc: string;  
  private isAndroid: boolean;

  constructor(private page:Page, private router: Router, private routerExtensions:RouterExtensions, private authService: AuthenticationService) {
    if(platformModule.isAndroid){
      page.actionBarHidden = true;
      this.isAndroid = true;
      this.logoImageSrc = "res://ezbooklogo";
    }
    if(platformModule.isIOS){
      this.isAndroid = false;
      this.logoImageSrc = "res://ezbooklogo.png";
    }
  }

  ngOnInit(): void {
    //TODO: Remove after testing
    this.username = "ezbapp1";
    this.password = "App12345";
  }

  onSignIn(): void {    
    this.authService.login(this.username, this.password)
      .subscribe((result) => {
        console.log(`Login response => ${result}`);
        if(result === true){          
          this.routerExtensions.navigate(["/tabs"], {clearHistory: true});
        }
        else{          
          dialogs.alert("Invalid Credentials, please try again.");
          //TNSFancyAlert.showError("Invalid Credentials!", "", "Try Again");  
        }        
      }, (error) => {
        dialogs.alert("Something went wrong, please try again.");
        //TNSFancyAlert.showError("Oops!", "Something went wrong, please try again.", "Dismiss");        
      });
  } 
  onForgotPasswordTap():void{
    this.routerExtensions.navigate(["/recoverPassword"],
    {
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
  }  

  onRegisterTap():void{
    this.routerExtensions.navigate(["/register"],
    {
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
  }

  goToSearch(){
        this.routerExtensions.navigate(["/search"],
    {
        animated: true,
        transition: {
            name: "fade",
            duration: 1200,
            curve: "ease"
        }
    });
  }

  testLogout():void{
    this.authService.logout();    
  }
}