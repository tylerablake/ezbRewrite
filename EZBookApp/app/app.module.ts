import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIListViewModule, RadListViewComponent, TKListViewItemDirective, TKListViewItemSwipeDirective } from "nativescript-ui-listview/angular";

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
import { SearchComponent } from "~/tabs/search/search.component";


//Services
import { AccountService } from "~/services/account.service";
import { AuthenticationService } from "~/services/authentication.service";
import { HttpHelperService } from "~/services/http-helper.service";
import { OrderService } from "~/services/order.service";
import { Data } from "~/shared/data";
import { HelperService } from "~/services/helper.service";
import { HomeComponent } from "~/tabs/home/home.component";
import { DashboardComponent } from "~/tabs/dashboard/dashboard.component";







@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        HttpModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        TabsComponent,
        RegisterComponent,
        RecoverPasswordComponent,
        SearchComponent,
        HomeComponent,
        DashboardComponent
    ],
    providers: [
        AuthenticationService,
        AccountService,
        HttpHelperService,
        HelperService,
        OrderService,
        Data
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
