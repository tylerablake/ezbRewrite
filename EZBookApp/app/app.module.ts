import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";

//Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "~/login/login.component";


//Services
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
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        AuthenticationService,
        HttpHelperService,
        OrderService,
        Data    
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
