import { Injectable, OnDestroy } from "@angular/core";
import { HttpHelperService } from "./http-helper.service";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import * as dialogs from "ui/dialogs";
import { AuthenticationService } from "~/services/authentication.service";
import { Config } from "~/shared/config";
import { UserDetails } from "~/data/user/user-details.model";
import { UserAccount } from "~/data/user/user-account.model";
import { ChangePasswordRequest } from "~/data/change-password/change-password-request.model";
import { Register } from "~/data/register/register.model";
import { RegisterUserRequest } from "~/data/register/register-user-request.model";
import { UpdateUserRequest } from "~/data/user/update-user-request.model";


@Injectable()
export class AccountService implements OnDestroy {

    constructor(private http: Http, private authService: AuthenticationService, private httpHelper: HttpHelperService) {

    }

    getUserDetails(userId: number) {

        if (!userId) {
            return;
        }
        this.authService.refreshToken();
        const url = Config.proxyUrl + Config.userDetailsUrl + "/" + userId.toString();

        const options = this.httpHelper.getCommonAuthHeaders();

        const userDetails: Observable<UserDetails> =
            <Observable<UserDetails>>

            this.http.get(
                url, options)
                .map(res => res.json())
                .catch(err => {
                    this.handleErrors(err);
                    return Observable.of(false);
                });

        return userDetails;
    }

    changePassword(userAccount: UserAccount): Observable<string> {
        this.authService.refreshToken();

        const url = Config.proxyUrl + Config.resetPasswordUrl;

        const options = this.httpHelper.getCommonAuthHeaders();

        var params = new ChangePasswordRequest();
        params.CurrentPassword = userAccount.CurrentPassword;
        params.NewPassword = userAccount.NewPassword;
        params.ApplicationUserName = userAccount.UserID;

        const resetPasswordResult: Observable<string> =
            <Observable<string>>
            this.http.post(
                url,
                JSON.stringify(params), options)
                .map(res => {  
                    if(res.ok){
                        return Observable.of("Success");
                    }                  
                    else{
                        return Observable.of("");
                    }
                    
                })
                .catch(err => {
                    console.log("Error on changePassword(): " + err);
                    this.handleErrors(err);
                    return Observable.of("");
                });

        return resetPasswordResult;
    }

    registerUser(registerModel: Register){
        this.authService.refreshToken();

        const url = Config.proxyUrl + Config.registerUserUrl;

        const options = this.httpHelper.getCommonAuthHeaders();

        var params = new RegisterUserRequest();
        params.ApplicationUserFirstName = "";
        params.ApplicationUserLastName = "";
        params.ApplicationUserName = registerModel.Username;
        params.ApplicationUserPassword = registerModel.Password;
        params.ApplicationUserEmail = registerModel.Email;
        params.ApplicationUserPhone = registerModel.PhoneNumber;
        params.UserCustomerSCACCode = registerModel.SCAC.toString();        
        

        const registerUserResult: Observable<string> =
            <Observable<string>>
            this.http.post(
                url,
                JSON.stringify(params), options)
                .map(res => {  
                    if(res.ok){
                        return Observable.of("Success");
                    }                  
                    else{
                        return Observable.of("");
                    }
                    
                })
                .catch(err => {
                    console.log("Error on changePassword(): " + err);
                    this.handleErrors(err);
                    return Observable.of("");
                });

        return registerUserResult;
    }

    updateUser(userAccount: UserAccount): Observable<string> {
        console.log(`userAccount info => ${JSON.stringify(userAccount)}`);
        this.authService.refreshToken();

        const url = Config.proxyUrl + Config.updateUserUrl;

        const options = this.httpHelper.getCommonAuthHeaders();

        var params = new UpdateUserRequest();
        params.FirstName = userAccount.FirstName;
        params.LastName = userAccount.LastName;
        params.Email = userAccount.Email;
        params.Phone = userAccount.PhoneNumber;

        const updateUserResponse: Observable<string> =
            <Observable<string>>
            this.http.post(
                url,
                JSON.stringify(params), options)
                .map(res => {  
                    if(res.ok){
                        return Observable.of("Success");
                    }                  
                    else{
                        return Observable.of("");
                    }
                    
                })
                .catch(err => {
                    console.log("Error on updateUser(): " + err);
                    this.handleErrors(err);
                    return Observable.of("");
                });

        return updateUserResponse;
    }

    private handleErrors(error: Response): Observable<any> {
        console.log("Error Occured on request => " + error.status + ": " + error.statusText);
        return Observable.of(false);        
    }

    ngOnDestroy(): void {
    }
}