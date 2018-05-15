import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Router, NavigationStart } from "@angular/router";
import { AuthenticationService } from "~/services/authentication.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    private routerSubscription: Subscription

    constructor( private router:Router, private authService:AuthenticationService){
        this.routerSubscription = this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event:NavigationStart) => {                
                this.authService.refreshToken();
            });                                                
    }    
 }
