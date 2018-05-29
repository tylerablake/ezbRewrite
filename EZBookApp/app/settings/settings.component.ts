import { Component, OnInit } from '@angular/core';
import { Config } from '~/shared/config';
import { AuthenticationService } from '~/services/authentication.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'Settings',
  moduleId: module.id,
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})

export class SettingsComponent implements OnInit {
  private tracBlueHex: string;
  constructor(private routerExtensions: RouterExtensions, private authService: AuthenticationService) {
    this.tracBlueHex = Config.tracBlueHex;
   }

  ngOnInit() { }

  onAccountTap():void{
  this.routerExtensions.navigate(["account"],
    {
        animated: true,
        transition: {
            name: "slide",
            duration: 400,
            curve: "ease"
        }
    });
  }

  onSignOutTap():void{
    this.authService.logout();
  }

  onAppSpecsTap():void{

  }

  onHelpTap():void{
    
  }

}