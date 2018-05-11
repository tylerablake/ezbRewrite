import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "~/login/login.component";
import { TabsComponent } from "~/tabs/tabs.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },    
    { path: "login", component: LoginComponent },
    { path: "tabs", component: TabsComponent},
    { path: "tabs/:id", component: TabsComponent}    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
