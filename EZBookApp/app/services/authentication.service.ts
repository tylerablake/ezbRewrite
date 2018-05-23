import { Injectable, OnDestroy } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { JwtHelper, tokenNotExpired, AuthHttp } from "angular2-jwt";
import * as  base64 from "base-64";
import * as utf8 from "utf8";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { RouterExtensions } from "nativescript-angular/router";
//import { TNSFancyAlert } from 'nativescript-fancyalert';
//import { SubmitRecoverPassword } from "../../recover-password/submit-recover-password.model";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Config } from "~/shared/config";
import { HttpHelperService } from "~/services/http-helper.service";
import { Data } from "~/shared/data";
import { UserProfile } from "~/data/user/user.profile.model";
import { UserClaims } from "~/data/user/user.claims.model";
import * as dialogs from "ui/dialogs";
import { DashboardBookingSearch } from "~/data/search/dashboard-search.model";


@Injectable()
export class AuthenticationService implements OnDestroy{    
    private userProfileSubscription: Subscription;

    constructor(private http: Http, private router: Router, private httpHelper:HttpHelperService, private routerExtensions:RouterExtensions, private data:Data) {         
    }

    login(username: string, password: string): Observable<boolean> {
        const url: string = Config.proxyUrl + Config.securityUrl;
        
        const options = this.httpHelper.getLoginHeaders(username,password);
                
        return this.http.get(url, options)
            .map((response: Response) => {                                
                const token = response.json() && response.json().token;                

                if (token) {                    
                    Config.token = token;
                    this.isInternalUser();   
                    this.data.userClaims = this.getCurrentUserClaims();  

                    this.userProfileSubscription = this.getCurrentUserProfile().subscribe((profile: UserProfile) => {                        
                        this.data.userProfile = profile;
                    }, (error) => {
                        this.handleErrors(error);
                    });

                    this.data.searchOptions.BookingStatusCode = "OP";
                    console.log('Login Successful!');
                    return true;
                } else {
                    console.log(response.status + ": " + response.statusText);
                    return false;
                }
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.of(false);
            })
            ;

    }

    private handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    refreshToken() {
        console.log("Refreshing token!")
        const url: string = Config.proxyUrl + Config.securityUrl;

        const options = this.httpHelper.getCommonAuthHeaders(); 
        
        if(Config.token === ""){
            return false;
        }

        return this.http.get(url, options)
            .map((response: Response) => {
                
                const token = response.json() && response.json().token;
                if (token) {                    

                    Config.token = token;                    
                    return true;

                } else {
                    return false;                    
                }
            })
            .catch((error: any) => {
                return Observable.of(false);
            })
            ;
    }

    isAuthenticated():boolean {
        if (Config.token == null) {
            return false;
        }
        const claims = this.getClaimsFromToken();
        let userId: string | null | undefined;
        userId = claims.UserId;

        if ((claims.exp - (new Date().getTime() / 1000)) < 0) {
            return false;
        }

        if (userId) {
            return true;
        }

        return false;
    }

    isAuthorized(entityType, demandPermissions):boolean {
        if (Config.token == null) {
            return false;
        }
        const claims = this.getClaimsFromToken();

        if (!claims) {
            return false;
        }

        // get the claim matching the entity type
        const claimValue = claims[entityType];
        if (claimValue == null) { return false; }

        let permissions = 0;
        if (!isNaN(claimValue)) {
            permissions = parseInt(claimValue, 10);
        }
        // tslint:disable-next-line:no-bitwise
        const authorized = (demandPermissions & permissions) === demandPermissions;

        return authorized;
    }

    getCurrentUserClaims():UserClaims {
        if (this.isAuthenticated()) {
            const claims = this.getClaimsFromToken();
            if (claims) {
                const userClaims:UserClaims = {
                    UserId: claims.UserId,
                    UserFullName: claims.UserFullName,
                    UserName: claims.sub,
                    ModuleIdOwned: claims.ModuleIdOwned,
                    RoleRank: claims.RoleRank
                };

                return userClaims;
            }
        }

        return undefined;
    }
    
    getCurrentUserProfile(): Observable<any>{
        const url = Config.proxyUrl + Config.userProfileUrl;
        const options = this.httpHelper.getCommonAuthHeaders();                                                                        

          const profile: Observable<UserProfile> =
          <Observable<UserProfile>>
                  
            this.http.get(
            url, options)            
            .map(res => res.json())
            .catch(err => {
                console.log("Error on getCurrentUserProfile(): " + err)
                return Observable.of(false);
            })
            ;

            return profile;                    
    }

    isInternalUser(): boolean {
        if (this.isAuthenticated()) {
            const claims = this.getClaimsFromToken();
            if (claims.CustomerBookingAdditionalCapabilities) {
                Config.userIsAdmin = true;                
                console.log("User is admin.");
                return true;
            }
            Config.userIsAdmin = false;
            console.log("User is not an admin.");
            return false;
        }
        Config.userIsAdmin = false;
        return undefined;
    }

    loggedIn() {
        return tokenNotExpired("token");
    }

    logout(sessionTimeout?: boolean): void {
        Config.token = "";
        this.data.searchOptions = new DashboardBookingSearch(false);
        this.routerExtensions.navigate(["/login"], {clearHistory: true});

        if(sessionTimeout){
            dialogs.alert({
                title: "Timeout",
                message: "You were idle too long. You need to login to access the application.",
                okButtonText: "Ok"
            });
            //dialogs.alert("You were idle too long. You need to login to access the application");
            //TNSFancyAlert.showError("Session Timeout", "You were idle too long. You need to login to access the application.", "Dismiss");    
            
        }
        else if(sessionTimeout === true){
            dialogs.alert({
                title: "Success!",
                message: "Please log in using your new password",
                okButtonText: "Ok"
            });
            //dialogs.alert("Success! Please log in using your new password");
            //TNSFancyAlert.showSuccess("Success!","Please log in using your new password.");
        }
        else{
            dialogs.alert({
                title: "",                
                message: "Logout successful!",
                okButtonText: "Ok"
            
            });
            //dialogs.alert("Logout successful!");
            //TNSFancyAlert.showSuccess("Logout Successful!", "", "Dismiss");                    
        }        
    }

    passwordChangeLogout():void{
        Config.token = "";
        this.data.searchOptions = new DashboardBookingSearch(false);
        this.routerExtensions.navigate(["/login"], {clearHistory: true});
    }

    private getClaimsFromToken() {
        const jwtHelper = new JwtHelper();
        const jwt = jwtHelper.decodeToken(Config.token);

        return jwt;
    }

    recoverPassword(username:string, scac:string): Observable<boolean>{        
        return Observable.of(false);
        // if (!username && !scac) {
        //     return;
        // }
        // const url = Config.proxyUrl + Config.recoverPasswordUrl;
        
        // const options = this.httpHelper.getCommonAuthHeaders();

        // const recoverPasswordModel:SubmitRecoverPassword = new SubmitRecoverPassword(username, scac);               

        //     return this.http.post(url, JSON.stringify(recoverPasswordModel), options)            
        //     .map((response: Response) => {                                                
        //         return true;
        //     }).catch((error: any) => {                
        //         return Observable.of(false);
        //     });
    }

    ngOnDestroy():void{        
        //this.userProfileSubscription.unsubscribe();
    }
}