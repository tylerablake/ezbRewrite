import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TabsRoutingModule } from "./tabs-routing.module";
import { NativeScriptUIListViewModule, RadListViewComponent } from "nativescript-ui-listview/angular";

import { HomeComponent } from "./home/home.component";
import { TabsComponent } from "./tabs.component";
import { DashboardComponent } from "~/tabs/dashboard/dashboard.component";
import { BookingComponent } from "~/tabs/booking/booking.component";
import { ReuseComponent } from "~/tabs/reuse/reuse.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        TabsComponent,
        RadListViewComponent,
        BookingComponent,
        ReuseComponent
        //,
        //HomeComponent,
        //DashboardComponent,
        //BrowseComponent,
        //SearchComponent        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
