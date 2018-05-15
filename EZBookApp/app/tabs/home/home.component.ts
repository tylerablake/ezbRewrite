import { Component, OnInit } from "@angular/core";
import * as platformModule from "tns-core-modules/platform";
@Component({
    selector: "HomeTab",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent {
    private logoImageSrc:string = "res://ezbooklogo.png";

    constructor() {
        if(platformModule.isAndroid){            
            this.logoImageSrc = "res://ezbooklogo";
          }          
    }
}
