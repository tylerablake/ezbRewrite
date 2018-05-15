import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "~/login/login.component";
import { TabsComponent } from "~/tabs/tabs.component";
import { RegisterComponent } from "~/register/register.component";
import { RecoverPasswordComponent } from "~/recover-password/recover-password.component";
import { SearchComponent } from "~/search/search.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },    
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent},
    { path: "recoverPassword", component: RecoverPasswordComponent},     
    { path: "search", component: SearchComponent},   
    { path: "tabs", component: TabsComponent},
    { path: "tabs/:id", component: TabsComponent}    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
