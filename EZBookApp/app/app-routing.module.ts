import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "~/login/login.component";
import { TabsComponent } from "~/tabs/tabs.component";
import { RegisterComponent } from "~/register/register.component";
import { RecoverPasswordComponent } from "~/recover-password/recover-password.component";
import { SearchComponent } from "~/search/search.component";
import { AccountComponent } from "~/account/account.component";
import { ReuseComponent } from "~/tabs/reuse/reuse.component";
import { OrderDetailComponent } from "~/order-detail/order-detail.component";
import { SettingsComponent } from "~/settings/settings.component";
import { AvailableBookingsComponent } from "~/available-bookings/available-bookings.component";
import { ReviewBookingComponent } from "~/review-booking/review-booking.component";
import { ConfirmBookingComponent } from "~/confirm-booking/confirm-booking.component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },    
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent},
    { path: "recoverPassword", component: RecoverPasswordComponent},     
    { path: "search", component: SearchComponent},   
    { path: "settings", component: SettingsComponent},
    { path: "tabs", component: TabsComponent},
    { path: "tabs/:id", component: TabsComponent},
    { path: "account", component: AccountComponent},
    { path: "reuse", component: ReuseComponent},
    { path: "order-detail/:id", component: OrderDetailComponent },
    { path: "order-detail/:id/orderNumber/:orderNumber", component: OrderDetailComponent},
    //{ path: "order-detail-edit/:id", component: OrderDetailEditComponent }, 
    { path: "available-bookings", component: AvailableBookingsComponent},
    { path: "review-booking", component: ReviewBookingComponent},
    { path: "confirm-booking", component: ConfirmBookingComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
