import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as dialogs from 'ui/dialogs';

import { AuthenticationService } from '~/services/authentication.service';
import { AccountService } from '~/services/account.service';
import { Register } from '~/data/register/register.model';



@Component({
  selector: 'Register',
  moduleId: module.id,
  templateUrl: './register.component.html',
  styleUrls: ["./register.component.scss"],
  providers: [AccountService, AuthenticationService]  
})

export class RegisterComponent implements OnInit {
  private registerModel: Register = new Register();
  constructor(private accountService: AccountService, private authService: AuthenticationService, private routerExtensions: RouterExtensions) { }

  ngOnInit() { }

  onRegisterSubmit():void{
    console.log(JSON.stringify(this.registerModel));
    if(this.registerModel.Password !== this.registerModel.ConfirmPassword){
      dialogs.alert("Password and Confirm Password must match.");
      return;
    }
    else{
      this.accountService.registerUser(this.registerModel).subscribe((result) => {
        if(result){                  
          dialogs.confirm("Registration Successful!");

          this.routerExtensions.navigate(["/login"],
          {
              animated: true,
              transition: {
                  name: "slide",
                  duration: 200,
                  curve: "ease"
              }
          });
        }
        else{
          dialogs.alert("Registration failed, please try again.");
        }
  
      }, (error => {
          dialogs.alert("Registration failed, please try again.");
      }));
    } 
  }

}