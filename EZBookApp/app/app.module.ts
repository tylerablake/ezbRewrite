import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";

//Rxjs
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

//Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "~/login/login.component";
import { RegisterComponent } from "~/register/register.component";
import { RecoverPasswordComponent } from "~/recover-password/recover-password.component";
import { TabsComponent } from "~/tabs/tabs.component";


//Services
import { AccountService } from "~/services/account.service";
import { AuthenticationService } from "~/services/authentication.service";
import { HttpHelperService } from "~/services/http-helper.service";
import { OrderService } from "~/services/order.service";
import { Data } from "~/shared/data";





@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,        
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        HttpModule        
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        TabsComponent,
        RegisterComponent,
        RecoverPasswordComponent
    ],
    providers: [
        AuthenticationService,
        AccountService,
        HttpHelperService,
        OrderService,
        Data    
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
