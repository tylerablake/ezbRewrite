import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { Subscription } from "rxjs/Subscription";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { AuthenticationService } from "~/services/authentication.service";
import { CheckAvailability } from "~/data/availability/check-availability.model";
import { Data } from "~/shared/data";

@Component({
    selector: "TabsComponent",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {
    private _title: string;
    private routerSubscription: Subscription;
    @ViewChild("tabView") tabView: ElementRef;

    constructor(private pageRoute: PageRoute, private page:Page, private data:Data, private authService: AuthenticationService, private routerExtensions: RouterExtensions) {
        if (isAndroid) {
            page.actionBarHidden = false;                        
        }        
    }

    ngOnInit(): void {        

        // Init your component properties here.
        this.pageRoute.activatedRoute
        .switchMap((activatedRoute) => activatedRoute.params)
        .forEach((params) => {
            //Auto select dashboard tab if coming from submitting a search
            if (params.id) {
                console.log("Navigating to tab " + params.id);
                this.tabView.nativeElement.selectedIndex = params.id;
            }
        });
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
        }
    }

    getIconSource(icon: string): string {        
        return isAndroid ? "" : "res://tabIcons/" + icon;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        this.authService.refreshToken();
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.authService.refreshToken();


        if (selectedTabViewItem.title === "Booking") {
            //Clear search form data
            this.data.availabilitySearchOptions = new CheckAvailability();


            //Clear Booking Autocompletes                
            let bookingResponsiblePartyTypeFilterSelect = <any>this.page.getViewById('bookingResponsiblePartyTypeFilterSelect');
            if (bookingResponsiblePartyTypeFilterSelect) {
                bookingResponsiblePartyTypeFilterSelect.Clear();
            }
                         
            let bookingMarketFilterSelect = <any>this.page.getViewById('bookingMarketFilterSelect');
            if (bookingMarketFilterSelect) {
                bookingMarketFilterSelect.Clear();
            }

            let bookingMotorCarrierFilterSelect = <any>this.page.getViewById('bookingMotorCarrierFilterSelect');
            if (bookingMotorCarrierFilterSelect) {
                bookingMotorCarrierFilterSelect.Clear();
            }

            let bookingResponsiblePartyFilterSelect = <any>this.page.getViewById('bookingResponsiblePartyFilterSelect');
            if (bookingResponsiblePartyFilterSelect) {
                bookingResponsiblePartyFilterSelect.Clear();
            }
        }

        if (selectedTabViewItem.title === "Reuse") {
            this.data.reuseSearchOptions = new CheckAvailability();

            //Clear Reuse Autocompletes        

            let reuseResponsiblePartyTypeFilterSelect = <any>this.page.getViewById('reuseResponsiblePartyTypeFilterSelect');
            if (reuseResponsiblePartyTypeFilterSelect) {
                reuseResponsiblePartyTypeFilterSelect.Clear();
            }

            let reuseMarketFilterSelect = <any>this.page.getViewById('reuseMarketFilterSelect');
            if (reuseMarketFilterSelect) {
                reuseMarketFilterSelect.Clear();
            }

            let reuseMotorCarrierFilterSelect = <any>this.page.getViewById('reuseMotorCarrierFilterSelect');
            if (reuseMotorCarrierFilterSelect) {
                reuseMotorCarrierFilterSelect.Clear();
            }

            let reuseResponsiblePartyFilterSelect = <any>this.page.getViewById('reuseResponsiblePartyFilterSelect');
            if (reuseResponsiblePartyFilterSelect) {
                reuseResponsiblePartyFilterSelect.Clear();
            }
        }



        //TODO: Remove after testing
        // if (selectedTabViewItem.title == "Reuse") {
        //     console.log("Presetting search form data for: " + selectedTabViewItem.title);

        //     //{"MarketCode":"ATL","EquipmentSize":"Chassis.20","Reuse":false,"ResponsiblePartyId":12531,"ResponsiblePartyType":"MC","IncludeZeroInventory":true,"CustomerId":12531};
        //     let sampleSearch = new CheckAvailability();
        //     sampleSearch.MarketCode = "BAL";
        //     //sampleSearch.EquipmentSize = "Chassis.40";
        //     sampleSearch.Reuse = true;
        //     sampleSearch.ResponsiblePartyType = "MC";

        //     //Electro America Exports LLC
        //     //sampleSearch.ResponsiblePartyId = 8691;

        //     //L & A Forwarding Inc.
        //     sampleSearch.ResponsiblePartyId = 13469;

        //     //sampleSearch.IncludeZeroInventory = true;
        //     //sampleSearch.CustomerId = 12531;
        //     sampleSearch.MotorCarrierId = 13469;
        //     sampleSearch.BookingNumber = "Abc";
        //     //sampleSearch.ResponsiblePartyId = this.data.userProfile.CustomerId;
        //     //sampleSearch.ResponsiblePartyType = this.data.userProfile.CustomerClass;

        //     //this.data.availabilitySearchOptions = sampleSearch;  

        //     this.data.reuseSearchOptions = sampleSearch;

        //     this.routerExtensions.navigate(["/reusable-chassis"],
        //         {
        //             animated: true,
        //             transition: {
        //                 name: "slide",
        //                 duration: 400,
        //                 curve: "ease"
        //             }
        //         });

        // }

        this.title = selectedTabViewItem.title;
    }

    onSearch(): void {
        this.routerExtensions.navigate(["/search"],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 400,
                    curve: "ease"
                }
            });
    }

    onMyAccountButtonTap():void{ 
        this.routerExtensions.navigate(["/account"],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });       
    }
    onLogoutButtonTap() {
        this.authService.logout();
    }
}
