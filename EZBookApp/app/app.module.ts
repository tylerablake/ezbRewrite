import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

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
import { HomeComponent } from "~/tabs/home/home.component";
import { DashboardComponent } from "~/tabs/dashboard/dashboard.component";
import { BookingComponent } from "~/tabs/booking/booking.component";
import { SearchComponent } from "~/search/search.component";
import { ReuseComponent } from "~/tabs/reuse/reuse.component";
import { AccountComponent } from "~/account/account.component";
import { OrderDetailComponent } from "~/order-detail/order-detail.component";
import { SettingsComponent } from "~/settings/settings.component";
import { AvailableBookingsComponent } from "~/available-bookings/available-bookings.component";


//Services
import { AccountService } from "~/services/account.service";
import { AuthenticationService } from "~/services/authentication.service";
import { HttpHelperService } from "~/services/http-helper.service";
import { OrderService } from "~/services/order.service";
import { Data } from "~/shared/data";
import { HelperService } from "~/services/helper.service";



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
        DashboardComponent,
        BookingComponent,
        ReuseComponent,
        AccountComponent,
        OrderDetailComponent,
        SettingsComponent,
        AvailableBookingsComponent        
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
