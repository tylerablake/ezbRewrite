import { Component, OnInit } from "@angular/core";
import * as platformModule from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page/page";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    private logoImageSrc:string = "res://ezbooklogo.png"
    constructor(private page:Page) {
        if(platformModule.isAndroid){            
            this.logoImageSrc = "res://ezbooklogo";
          }          
    }

    ngOnInit(): void {        
    }
}
