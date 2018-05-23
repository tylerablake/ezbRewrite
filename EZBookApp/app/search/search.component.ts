import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NativeScriptUIDataFormModule, RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Page } from 'tns-core-modules/ui/page/page';
import { DashboardBookingSearch } from '~/data/search/dashboard-search.model';
import { Config } from '~/shared/config';
import { Data } from '~/shared/data';
import { BookingStatus } from '~/data/booking-status/booking-status.model';
import { EquipmentCategory } from '~/data/equipment/equipment-category.model';
import { Market } from '~/data/market/market.model';
import { LocationModel } from '~/data/location/location.model';
import { Customer } from '~/data/customer/customer.model';
import { BookingStatusList, EquipmentCategoriesList } from '~/shared/constants';
import * as applicationModule from "tns-core-modules/application";


@Component({
  selector: 'Search',
  moduleId: module.id,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})


export class SearchComponent implements OnInit, OnDestroy {
  private searchObject: DashboardBookingSearch = this.data.searchOptions;
  private bookingStatusCodesNames: Array<string>;
  private bookingStatusCodes: Array<string>;  
  private equipmentCategories: Array<string>;
  private locationList: Array<string> = this.data.locationStrings;
  private marketList: Array<string> = this.data.marketStrings;
  private customerList: Array<string> = this.data.customerStrings
  public userIsAdmin: boolean = Config.userIsAdmin;

  constructor(private router: Router, private routerExtensions: RouterExtensions, private data: Data) {        
  }



  ngOnInit() {
    this.searchObject = this.data.searchOptions;


    this.bookingStatusCodesNames = BookingStatusList.map((status: BookingStatus) => status.name);
    this.equipmentCategories = EquipmentCategoriesList.map((category: EquipmentCategory) => category.EquipmentCategoryDescription);

    //Convert from codes from search API call to strings for UI
    this.searchObject.BookingStatusCode = BookingStatusList.filter((status: BookingStatus) => status.code === this.data.searchOptions.BookingStatusCode)[0].name;
    this.searchObject.EquipmentSize = EquipmentCategoriesList.filter((category: EquipmentCategory) => category.EquipmentCategoryCode === this.data.searchOptions.EquipmentSize)[0].EquipmentCategoryDescription;
    this.searchObject.MarketCode = this.searchObject.MarketCode ? this.data.marketData.filter((market: Market) => market.LocationMarketCode === this.data.searchOptions.MarketCode)[0].LocationMarketDescription : "";
    this.searchObject.LocationId = this.searchObject.LocationId ? this.data.locationData.filter((loc: LocationModel) => loc.LocationId.toString() === this.data.searchOptions.LocationId)[0].LocationName : "";
    this.searchObject.CustomerId = this.searchObject.CustomerId && this.userIsAdmin ? this.data.customerData.filter((customer: Customer) => customer.CustomerId.toString() === this.data.searchOptions.CustomerId)[0].CustomerName : "";
  }


  onSubmit(): void {
    if (!this.searchObject.DateTo) {
      this.searchObject.DateTo = new Date(this.searchObject.DateTo);
    }

    if (!this.searchObject.DateFrom) {
      this.searchObject.DateFrom = new Date(this.searchObject.DateFrom);
    }

    //Convert from strings to codes for search API call    
    this.searchObject.BookingStatusCode = this.searchObject.BookingStatusCode ? BookingStatusList.filter((status: BookingStatus) => status.name === this.searchObject.BookingStatusCode)[0].code : "";
    this.searchObject.EquipmentSize = this.searchObject.EquipmentSize ? EquipmentCategoriesList.filter((category: EquipmentCategory) => category.EquipmentCategoryDescription === this.searchObject.EquipmentSize)[0].EquipmentCategoryCode : "";
    this.searchObject.MarketCode = this.searchObject.MarketCode ? this.data.marketData.filter((market: Market) => market.LocationMarketDescription === this.searchObject.MarketCode)[0].LocationMarketCode : "";
    this.searchObject.LocationId = this.searchObject.LocationId ? this.data.locationData.filter((loc: LocationModel) => loc.LocationName === this.searchObject.LocationId)[0].LocationId.toString() : "";

    if (this.userIsAdmin) {
      this.searchObject.CustomerId = this.searchObject.CustomerId ? this.data.customerData.filter((customer: Customer) => customer.CustomerName === this.searchObject.CustomerId)[0].CustomerId.toString() : "";
    }
    else {
      this.searchObject.CustomerId = "";
    }

    this.data.searchOptions = this.searchObject;

    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false,      
    };

    //Navigate to orders tab
    this.routerExtensions.navigate(["/tabs/1"], navigationExtras);    
  }

  onClear(): void {
    this.data.isFilteredSearch = false;
    this.searchObject = new DashboardBookingSearch(true);
    this.searchObject.BookingStatusCode = "Open";
    this.data.searchOptions = this.searchObject;
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy executing");
    //If conversion of BookingStatus Code and Name get into a bad state, this should catch it.
    if (this.searchObject.BookingStatusCode.length > 2) {
      this.searchObject.BookingStatusCode = this.searchObject.BookingStatusCode ? BookingStatusList.filter((status: BookingStatus) => status.name === this.searchObject.BookingStatusCode)[0].code : "";
    }
  }
}