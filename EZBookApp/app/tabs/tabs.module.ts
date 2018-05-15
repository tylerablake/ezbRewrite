import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TabsRoutingModule } from "./tabs-routing.module";


import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { TabsComponent } from "./tabs.component";
import { DashboardComponent } from "~/tabs/dashboard/dashboard.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule
    ],
    declarations: [
        TabsComponent
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
