import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EquipmentCategoriesList, PartyTypeList } from '../../shared/constants';
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";
import { Data } from "../../shared/data";
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, Observable, isIOS } from 'tns-core-modules/ui/page/page';
import { Config } from '../../shared/config';
import { TokenModel } from 'nativescript-ui-autocomplete';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { isAndroid } from 'tns-core-modules/platform/platform';
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { filter } from 'rxjs/operator/filter';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '~/services/order.service';
import { PartyFilterSelectItem } from '~/data/party/party-filter-select-item.model';
import { CreateBooking } from '~/data/booking/create-booking.model';
import { Availability } from '~/data/availability/availability.model';
import { MarketFilterSelectItem } from '~/data/market/market-filter-select-item.model';
import { CheckAvailability } from '~/data/availability/check-availability.model';
import { EquipmentCategory } from '~/data/equipment/equipment-category.model';

elementRegistryModule.registerElement("FilterSelect", () => require("nativescript-filter-select").FilterSelect);

@Component({
  selector: 'BookingTab',
  moduleId: module.id,
  templateUrl: './booking.component.html',
  providers: [OrderService]
})


export class BookingComponent implements OnInit {    
  private createBookingObject: CreateBooking = new CreateBooking();
  private equipmentCategories: string[] = EquipmentCategoriesList.map(equip => equip.EquipmentCategoryDescription);
  private chassisAvailabilities: Availability[];
  private responsiblePartyTypeList: string[] = PartyTypeList.map(type => type.name);    
  private responsiblePartyTypeSelectList: ObservableArray<PartyFilterSelectItem> = new ObservableArray<PartyFilterSelectItem>();

  private responsiblePartyList: string[];  
  private responsiblePartySelectList: ObservableArray<PartyFilterSelectItem> = new ObservableArray<PartyFilterSelectItem>();

  private marketList: string[] = [""];  
  private marketFilterSelectList: ObservableArray<MarketFilterSelectItem> = new ObservableArray<MarketFilterSelectItem>();  

  private motorCarrierFilterSelectList: ObservableArray<PartyFilterSelectItem> = new ObservableArray<PartyFilterSelectItem>();
  private previousDataResponsiblePartyType: string;
  private previousDataResponsiblePartyId: number;
  private twentyChassisSelected: boolean;
  private fortyChassisSelected: boolean;
  private fortyFiveChassisSelected: boolean;
  private formIsValid: boolean = false;
  private displayValidationErrors: boolean = false;
  private accentHex: string = Config.tracBlueHex;
  private truckImageSrc = "res://semiTruck.png";
  private listItemTemplate = "";
  public item_template = `
  <GridLayout class="item" columns="*"> 
  <Label col="0" height="50" fontSize="16" class="text-center" text="{{ text || name }}" textWrap="true" />   
  </GridLayout>
  `;
  
  constructor(private orderService: OrderService, private data: Data, private routerExtensions: RouterExtensions, private page: Page) {
    if (isAndroid) {
      this.truckImageSrc = "res://semiTruck";
    }    
  }
  

  ngOnInit() {
    this.initFormData();    
  }

  initFormData() {    
    this.initResponsiblePartyTypeAutoComplete();
    this.initMotorCarrierTokens();
    this.fortyChassisSelected = false;
    this.fortyFiveChassisSelected = false;
    this.twentyChassisSelected = false;
    this.createBookingObject.EquipmentSize = this.data.availabilitySearchOptions.EquipmentSize;
    this.createBookingObject.Reuse = false;
    this.createBookingObject.IncludeZeroInventory = false;
    this.createBookingObject.BookingNumber = this.data.availabilitySearchOptions.BookingNumber;

    //Clear search form data
    this.data.availabilitySearchOptions = new CheckAvailability();

  }

  initResponsiblePartyTypeAutoComplete(): void {
    for (var i = 0; i < PartyTypeList.length; i++) {
      if(PartyTypeList[i].name != ""){
        this.responsiblePartyTypeSelectList.push(new PartyFilterSelectItem( PartyTypeList[i].id, PartyTypeList[i].name));                 
      }      
    }
  }

  initResponsiblePartyTokens(partyList: string[]): void {
    this.responsiblePartySelectList = new ObservableArray<PartyFilterSelectItem>();
    console.log("Populating ResponsibleParty autocomplete with  '" + partyList.length + "' tokens.");
    for (var i = 0; i < partyList.length; i++) {
      this.responsiblePartySelectList.push(new PartyFilterSelectItem( i, partyList[i]));            
    }
    this.initMotorCarrierTokens();
  }

  initMarketTokens(marketList: string[]): void {
    this.marketFilterSelectList = new ObservableArray<MarketFilterSelectItem>();
    if (this.marketFilterSelectList.length <= 0) {
      console.log("Populating Market autocomplete with  '" + marketList.length + "' tokens.");
      for (var i = 0; i < marketList.length; i++) {      
        this.marketFilterSelectList.push(new MarketFilterSelectItem(i, marketList[i]));
      }
    }
  }

  initMotorCarrierTokens(): void {
    if(this.data.customerData){
      var motorCarrierList = this.data.customerData.filter(cust => cust.CustomerClass === "MC").map(cust => cust.CustomerName);
      console.log(`Populating MotorCarrier autocomplete with: ${motorCarrierList.length} tokens`);
      for (var i = 0; i < motorCarrierList.length; i++) {
        this.motorCarrierFilterSelectList.push(new PartyFilterSelectItem( i, motorCarrierList[i]));
      } 
    }   
  }

  onTwentyChassisSelected() {
    this.fortyChassisSelected = false;
    this.fortyFiveChassisSelected = false;
    this.twentyChassisSelected = true;
    this.createBookingObject.EquipmentSize = "Chassis.20";
    this.checkFormValidation();
  }

  onFortyChassisSelected() {
    this.twentyChassisSelected = false;
    this.fortyFiveChassisSelected = false;
    this.fortyChassisSelected = true;
    this.createBookingObject.EquipmentSize = "Chassis.40";
    this.checkFormValidation();
  }

  onFortyFiveChassisSelected() {
    this.twentyChassisSelected = false;
    this.fortyChassisSelected = false;
    this.fortyFiveChassisSelected = true;
    this.createBookingObject.EquipmentSize = "Chassis.45";
    this.checkFormValidation();
  }

  getChassisColor(isChassisSelected: boolean) {
    if (isAndroid) {
      if (isChassisSelected) {
        return "res://semitruckblue";
      }
      else {
        return "res://semitruck";
      }
    }
    else {
      if (isChassisSelected) {
        return "res://semiTruckBlue.png";
      }
      else {
        return "res://semiTruck.png";
      }
    }
  }


  checkFormValidation(): void {
    console.log("Checking form validation: " + JSON.stringify(this.createBookingObject));
    if (this.createBookingObject.EquipmentSize &&
      this.createBookingObject.ResponsiblePartyId &&
      this.createBookingObject.ResponsiblePartyType &&
      this.createBookingObject.MarketCode &&
      this.createBookingObject.MotorCarrier) {


      if (this.createBookingObject.ResponsiblePartyType === "STEAMSHIP") {

        if (this.createBookingObject.BookingNumber) {
          this.formIsValid = true;
          this.displayValidationErrors = false;
        }
        else {
          this.formIsValid = false;
          this.displayValidationErrors = true;
        }
      }
      else {
        this.formIsValid = true;
        this.displayValidationErrors = false;
      }

    }
    else {
      this.formIsValid = false;
      this.displayValidationErrors = true;
    }
  }

  onResponsiblePartyTypeSelected(args){
    console.log("Party Type Changed");
    this.checkFormValidation();
    //If the textbox has been cleared
    if (!args.selected.name) {      
      console.log("Party Type text is null")
      this.responsiblePartySelectList = new ObservableArray<PartyFilterSelectItem>();
      this.marketFilterSelectList = new ObservableArray<MarketFilterSelectItem>();
      this.motorCarrierFilterSelectList = new ObservableArray<PartyFilterSelectItem>();
      this.createBookingObject.EquipmentSize = "";
      this.clearResponsiblePartySelect();  
      this.clearMarketFilterSelect();  
      this.clearMotorCarrierFilterSelect();
      this.clearBookingNumber(); 
      //this.checkFormValidation();
      return;
    }
    else {
      //If the textbox has text
      //Check for valid text      
        console.log("Party Type text is: " + args.selected.name);
        var partyTypeIndex = PartyTypeList.map(type => type.name).indexOf(args.selected.name);
        console.log('PartyTypeIndex = ' + partyTypeIndex);
        if(partyTypeIndex > -1){          
          var responsiblePartyTypeId = PartyTypeList[partyTypeIndex].id;
          this.createBookingObject.ResponsiblePartyType = PartyTypeList[partyTypeIndex].id;

          let partyList = this.data.customerData.filter(customer => customer.CustomerClass && customer.CustomerClass.toLowerCase() === responsiblePartyTypeId.toLowerCase()).map(cust => cust.CustomerName);

          this.clearResponsiblePartySelect(); 
          this.initResponsiblePartyTokens(partyList);
           
          this.clearMarketFilterSelect();  
          this.clearMotorCarrierFilterSelect(); 
        }             
      }    

    this.checkFormValidation();
  }
  

  onResponsiblePartySelected(args){    
    this.clearMarketFilterSelect();
    this.clearMotorCarrierFilterSelect();

    console.log('selected party is => ' + args.selected.name);
    if(args.selected.name){
      var selectedCustomerData = this.data.customerData.filter(c => c.CustomerName == args.selected.name)[0];
      this.createBookingObject.ResponsiblePartyId = selectedCustomerData.CustomerId;       
           

      this.orderService.getFilteredMarketData(selectedCustomerData.CustomerId, selectedCustomerData.CustomerClass)
      .finally(() => this.initMarketTokens(this.marketList))
      .subscribe(data => {
        console.log(`Found '${data.length}' markets for CustomerId: ${selectedCustomerData.CustomerId}, CustomerClass: ${selectedCustomerData.CustomerClass}`);
        this.marketList = [];        

        data.sort((a, b) => a.localeCompare(b));

        data.forEach((item) => {        
          this.marketList.push(this.data.marketData.filter(market => market.LocationMarketCode == item)[0].LocationMarketDescription);
        });
      });
    
      this.initMotorCarrierTokens();          
    }
    else{
      this.marketFilterSelectList = new ObservableArray<MarketFilterSelectItem>();      
      this.clearMarketFilterSelect();  
      this.motorCarrierFilterSelectList = new ObservableArray<PartyFilterSelectItem>();
      this.clearMotorCarrierFilterSelect(); 
      this.createBookingObject.MarketCode = "";      
    }       
    this.checkFormValidation();
  }


  onMarketItemSelected(args){
    console.log('selected market is => ' + args.selected.name);

    if(args.selected.name){      
      this.createBookingObject.MarketCode = this.data.marketData.filter(m => m.LocationMarketDescription === args.selected.name)[0].LocationMarketCode;      
    }        

    this.checkFormValidation();
  }


  onMotorCarrierSelected(args){
    console.log('selected motorCarrier is => ' + args.selected.name);
    if(args.selected.name){
      this.createBookingObject.MotorCarrier = args.selected.name;
      this.createBookingObject.MotorCarrierId = this.data.customerData.filter(c => c.CustomerName == args.selected.name)[0].CustomerId;      
    }        
    this.checkFormValidation();
  }


  
  openMarketFilterSelect(){
    if(this.page.getViewById('bookingMarketFilterSelect')){
      let marketFilterSelect = <any>this.page.getViewById('bookingMarketFilterSelect');
      marketFilterSelect.open();
    }    
  }

  clearMarketFilterSelect(){
    this.createBookingObject.MarketCode = "";    
    let marketFilterSelect = <any>this.page.getViewById('bookingMarketFilterSelect');
    marketFilterSelect.Clear();
  }

  openMotorCarrierFilterSelect(){    
    let motorCarrierFilterSelect = <any>this.page.getViewById('bookingMotorCarrierFilterSelect');
    motorCarrierFilterSelect.open();
  }

  clearMotorCarrierFilterSelect(){
    this.createBookingObject.MotorCarrier = "";
    this.createBookingObject.MotorCarrierId = 0;
    let motorCarrierFilterSelect = <any>this.page.getViewById('bookingMotorCarrierFilterSelect');
    motorCarrierFilterSelect.Clear();
  }

  clearResponsiblePartySelect(){
    let responsiblePartyFilterSelect = <any>this.page.getViewById('bookingResponsiblePartyFilterSelect');
    responsiblePartyFilterSelect.Clear();
  }

  clearBookingNumber(){
    this.createBookingObject.BookingNumber = "";
  }

  onSearch() {

    if (this.createBookingObject.EquipmentSize.indexOf('.') < 1) {
      this.createBookingObject.EquipmentSize = this.createBookingObject.EquipmentSize ? EquipmentCategoriesList.filter((category: EquipmentCategory) => category.EquipmentCategoryDescription === this.createBookingObject.EquipmentSize)[0].EquipmentCategoryCode : "";
    }

    if (this.createBookingObject.MarketCode) {
      if (this.createBookingObject.MarketCode.length > 3) {
        this.createBookingObject.MarketCode = this.data.marketData.filter(market => market.LocationMarketDescription === this.createBookingObject.MarketCode)[0].LocationMarketCode;
      }
      else {
        this.createBookingObject.MarketCode = this.data.marketData.filter(market => market.LocationMarketCode === this.createBookingObject.MarketCode)[0].LocationMarketCode;
      }
    }

    if (this.createBookingObject.ResponsiblePartyId && typeof (this.createBookingObject.ResponsiblePartyId) == "string") {
      this.createBookingObject.ResponsiblePartyId = this.createBookingObject.ResponsiblePartyId ? this.data.customerData.filter(customer => customer.CustomerName === this.createBookingObject.ResponsiblePartyId.toString())[0].CustomerId : 0;
    }
    
    this.createBookingObject.Reuse = false;
    this.data.availabilitySearchOptions = this.createBookingObject;    

    this.routerExtensions.navigate(["/availability"],
      {
        animated: true,
        transition: {
          name: "slide",
          duration: 400,
          curve: "ease"
        }
      });
  }

  onClear() {
    this.formIsValid = false;
    this.createBookingObject = new CreateBooking();
  }
}