import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { TokenModel } from 'nativescript-ui-autocomplete';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { PartyFilterSelectItem } from '~/data/party/party-filter-select-item.model';
import { MarketFilterSelectItem } from '~/data/market/market-filter-select-item.model';
import { Data } from '~/shared/data';
import { OrderService } from '~/services/order.service';
import { PartyTypeList, EquipmentCategoriesList } from '~/shared/constants';
import { ReuseSearch } from '~/data/reuse/reuse-search.model';

@Component({
  selector: 'ReuseTab',
  moduleId: module.id,
  templateUrl: './reuse.component.html'

})

export class ReuseComponent implements OnInit {
  private reuseSearchModel: ReuseSearch = new ReuseSearch();
  private equipmentCategories: string[] = EquipmentCategoriesList.map(equip => equip.EquipmentCategoryDescription);
  private responsiblePartyTypeList: string[] = PartyTypeList.map(type => type.name);
  private responsiblePartyTypeSelectList: ObservableArray<PartyFilterSelectItem> = new ObservableArray<PartyFilterSelectItem>();
  private responsiblePartyList: string[];
  private responsiblePartySelectList: ObservableArray<PartyFilterSelectItem> = new ObservableArray<PartyFilterSelectItem>();
  private marketList: string[] = [""];
  private marketFilterSelectList: ObservableArray<MarketFilterSelectItem> = new ObservableArray<MarketFilterSelectItem>();
  private motorCarrierFilterSelectList: ObservableArray<PartyFilterSelectItem> = new ObservableArray<PartyFilterSelectItem>();
  private previousDataResponsiblePartyType: string;
  private previousDataResponsiblePartyId: number;
  private formIsValid: boolean = false;
  private displayValidationErrors: boolean = false;
  public item_template = `
  <GridLayout class="item" columns="*"> 
  <Label col="0" height="50" fontSize="16" class="text-center" text="{{ text || name }}" textWrap="true" />   
  </GridLayout>
  `;


  constructor(private data: Data, private routerExtensions: RouterExtensions, private page: Page, private orderService: OrderService) {  
    this.reuseSearchModel = new ReuseSearch();    
    this.formIsValid = false;
  }

  ngOnInit() {
    this.initFormData();
    this.initMotorCarrierTokens();
  }

  initFormData(): void {
    this.initResponsiblePartyTypeTokens();
    this.reuseSearchModel.BookingNumber = this.data.reuseSearchOptions.BookingNumber;
    this.reuseSearchModel.Reuse = true;
  }

  initResponsiblePartyTypeTokens(): void {
    for (var i = 0; i < PartyTypeList.length; i++) {
      if (PartyTypeList[i].name != "") {
        this.responsiblePartyTypeSelectList.push(new PartyFilterSelectItem(PartyTypeList[i].id, PartyTypeList[i].name));
      }
    }
  }

  initResponsiblePartyTokens(partyList: string[]): void {
    this.responsiblePartySelectList = new ObservableArray<PartyFilterSelectItem>();
    console.log("Populating ResponsibleParty autocomplete with  '" + partyList.length + "' tokens.");
    for (var i = 0; i < partyList.length; i++) {
      this.responsiblePartySelectList.push(new PartyFilterSelectItem(i, partyList[i]));
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
    if (this.data.customerData) {
      var motorCarrierList = this.data.customerData.filter(cust => cust.CustomerClass === "MC").map(cust => cust.CustomerName);
      console.log(`Populating MotorCarrier autocomplete with: ${motorCarrierList.length} tokens`);
      for (var i = 0; i < motorCarrierList.length; i++) {
        this.motorCarrierFilterSelectList.push(new PartyFilterSelectItem(i, motorCarrierList[i]));
      }
    }
  }

  onResponsiblePartyTypeSelected(args) {
    console.log("Party Type Text Changed");
    this.checkFormValidation();
    //If the textbox has been cleared
    if (!args.selected.name) {
      console.log("Party Type text is null")
      this.responsiblePartySelectList = new ObservableArray<PartyFilterSelectItem>();
      this.marketFilterSelectList = new ObservableArray<MarketFilterSelectItem>();
      this.motorCarrierFilterSelectList = new ObservableArray<PartyFilterSelectItem>();
      this.clearResponsiblePartySelect();
      this.clearMarketFilterSelect();
      this.clearMotorCarrierFilterSelect();
      this.clearBookingNumber();
      this.checkFormValidation();
      return;
    }
    else {
      //If the textbox has text
      //Check for valid text      
      console.log("Party Type text is: " + args.selected.name);
      var partyTypeIndex = PartyTypeList.map(type => type.name).indexOf(args.selected.name);
      console.log('PartyTypeIndex = ' + partyTypeIndex);
      if (partyTypeIndex > -1) {
        var responsiblePartyTypeId = PartyTypeList[partyTypeIndex].id;
        this.reuseSearchModel.ResponsiblePartyType = PartyTypeList[partyTypeIndex].id;

        let partyList = this.data.customerData.filter(customer => customer.CustomerClass && customer.CustomerClass.toLowerCase() === responsiblePartyTypeId.toLowerCase()).map(cust => cust.CustomerName);

        this.initResponsiblePartyTokens(partyList);

        this.clearResponsiblePartySelect();
        this.clearMarketFilterSelect();
        this.clearMotorCarrierFilterSelect();
      }
      else {
      }
    }

    this.checkFormValidation();
  }



  checkFormValidation(): void {
    this.displayValidationErrors = true;
    console.log("Checking form validation: " + JSON.stringify(this.reuseSearchModel));
    if (this.reuseSearchModel.ResponsiblePartyId &&
      this.reuseSearchModel.ResponsiblePartyType &&
      this.reuseSearchModel.MotorCarrier &&
      this.reuseSearchModel.MarketCode) {
      if (this.reuseSearchModel.ResponsiblePartyType === "STEAMSHIP") {

        if (this.reuseSearchModel.BookingNumber) {
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
      this.formIsValid = true;
    }
    else {
      this.formIsValid = false;
    }
  }


  onResponsiblePartySelected(args) {
    this.clearMarketFilterSelect();
    this.clearMotorCarrierFilterSelect();

    console.log('selected party is => ' + args.selected.name);
    if (args.selected.name) {
      var selectedCustomerData = this.data.customerData.filter(c => c.CustomerName == args.selected.name)[0];
      this.reuseSearchModel.ResponsiblePartyId = selectedCustomerData.CustomerId;
      this.reuseSearchModel.ResponsiblePartyName = args.selected.name;


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
    else {
      this.marketFilterSelectList = new ObservableArray<MarketFilterSelectItem>();
      this.clearMarketFilterSelect();
      this.motorCarrierFilterSelectList = new ObservableArray<PartyFilterSelectItem>();
      this.clearMotorCarrierFilterSelect();
      this.reuseSearchModel.MarketCode = "";
      this.reuseSearchModel.MarketName = "";
    }
    this.checkFormValidation();
  }

  onMarketItemSelected(args) {
    console.log('selected market is => ' + args.selected.name);

    if (args.selected.name) {
      this.reuseSearchModel.MarketCode = this.data.marketData.filter(m => m.LocationMarketDescription === args.selected.name)[0].LocationMarketCode;
      this.reuseSearchModel.MarketName = args.selected.name;
    }

    this.checkFormValidation();
  }


  onMotorCarrierSelected(args) {
    console.log('selected motorCarrier is => ' + args.selected.name);
    if (args.selected.name) {
      this.reuseSearchModel.MotorCarrier = args.selected.name;
      this.reuseSearchModel.MotorCarrierId = this.data.customerData.filter(c => c.CustomerName == args.selected.name)[0].CustomerId;
    }
    this.checkFormValidation();
  }


  openMarketFilterSelect() {
    if (this.page.getViewById('reuseMarketFilterSelect')) {
      let marketFilterSelect = <any>this.page.getViewById('reuseMarketFilterSelect');
      marketFilterSelect.open();
    }
  }

  clearMarketFilterSelect() {
    let marketFilterSelect = <any>this.page.getViewById('reuseMarketFilterSelect');
    this.reuseSearchModel.MarketCode = "";
    this.reuseSearchModel.MarketName = "";
    marketFilterSelect.Clear();
  }

  openMotorCarrierFilterSelect() {
    let motorCarrierFilterSelect = <any>this.page.getViewById('reuseMotorCarrierFilterSelect');
    motorCarrierFilterSelect.open();
  }

  clearMotorCarrierFilterSelect() {    
    let motorCarrierFilterSelect = <any>this.page.getViewById('reuseMotorCarrierFilterSelect');
    this.reuseSearchModel.MotorCarrier = "";
    this.reuseSearchModel.MotorCarrierId = 0;
    motorCarrierFilterSelect.Clear();
  }

  clearResponsiblePartySelect() {
    let responsiblePartyFilterSelect = <any>this.page.getViewById('reuseResponsiblePartyFilterSelect');
    this.reuseSearchModel.ResponsiblePartyName = "";
    this.reuseSearchModel.ResponsiblePartyId = 0;
    responsiblePartyFilterSelect.Clear();
  }

  clearBookingNumber(){
    this.reuseSearchModel.BookingNumber = "";
  }

  onitemselected(args) {
    console.log('this is the selected array => ' + JSON.stringify(args.selected));
  }


  searchSubmit(): void {
    this.data.reuseSearchOptions.BookingNumber = this.reuseSearchModel.BookingNumber;
    this.data.reuseSearchOptions.MarketCode = this.reuseSearchModel.MarketCode;
    this.data.reuseSearchOptions.MotorCarrier = this.reuseSearchModel.MotorCarrier;
    this.data.reuseSearchOptions.MotorCarrierId = this.reuseSearchModel.MotorCarrierId;
    this.data.reuseSearchOptions.OceanCarrier = this.reuseSearchModel.OceanCarrier;
    this.data.reuseSearchOptions.OceanCarrierId = this.reuseSearchModel.OceanCarrierId;
    this.data.reuseSearchOptions.PickUpDate = this.reuseSearchModel.PickUpDate;
    this.data.reuseSearchOptions.ResponsiblePartyId = this.reuseSearchModel.ResponsiblePartyId;
    this.data.reuseSearchOptions.ResponsiblePartyType = this.reuseSearchModel.ResponsiblePartyType;
    this.data.reuseSearchOptions.Reuse = true;

    console.log(`Submit with search options: ${JSON.stringify(this.data.reuseSearchOptions)}`);

    this.routerExtensions.navigate(["/reusable-chassis"],
      {
        animated: true,
        transition: {
          name: "slide",
          duration: 400,
          curve: "ease"
        }
      });
  }
}