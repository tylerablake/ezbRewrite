import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../shared/data';
import { Page } from 'tns-core-modules/ui/page/page';
import { TokenModel } from 'nativescript-ui-autocomplete';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { RouterExtensions } from 'nativescript-angular/router';
import { NativeScriptUIListViewModule, RadListViewComponent } from "nativescript-ui-listview/angular";
import { TKListViewItemDirective, TKListViewItemSwipeDirective } from "nativescript-ui-listview/angular";
import { View, isAndroid } from 'ui/core/view';
import * as dialogs from "ui/dialogs";
import { LocationFilterSelectItem } from '~/data/location/location-filter-select-item.model';
import { ReuseAvailabilityViewModel } from '~/data/availability/reuse-availability.viewmodel';
import { OrderService } from '~/services/order.service';

@Component({
  selector: 'ReusableChassis',
  moduleId: module.id,
  templateUrl: './reusable-chassis.component.html',
  styleUrls: ["./reusable-chassis.component.scss"]
})

export class ReusableChassisComponent implements OnInit {
  private isLoading: boolean = false;
  private showErrorMessage: boolean = false;
  private formIsValid: boolean = false;
  private isAndroid: boolean = false;
  private leftThresholdPassed = false;
  private rightThresholdPassed = false;
  private selectedLocationId: number = 0;
  private chassisId: string;
  private disableLocationSearch: boolean = false;
  private validateResponseMessage: string = "";
  private locationSelectList: ObservableArray<LocationFilterSelectItem> = new ObservableArray<LocationFilterSelectItem>();
  private location
  private availableUnits: ReuseAvailabilityViewModel[] = new Array<ReuseAvailabilityViewModel>();
  public item_template = `
  <GridLayout class="item" columns="*">
  <Label col="0" height="50" fontSize="16" class="text-center" text="{{ name }}" textWrap="true"/>   
  </GridLayout>
  `;

  @ViewChild("myListView") listViewComponent: RadListViewComponent;

  constructor(private orderService: OrderService, private data: Data, private page: Page, private routerExtensions: RouterExtensions) {
    if(isAndroid){
      this.isAndroid = true;
    }
   }

  ngOnInit() {
    this.getLocationData();
  }

  getLocationData() {
    this.orderService.getReuseLocations(this.data.reuseSearchOptions.ResponsiblePartyType, this.data.reuseSearchOptions.MarketCode, this.data.reuseSearchOptions.ResponsiblePartyId)
      .finally(() => this.isLoading = false)
      .subscribe(data => {
        console.log(`Found '${data.length}' locations for CustomerId: ${this.data.reuseSearchOptions.ResponsiblePartyId}, MarketCode: ${this.data.reuseSearchOptions.MarketCode}, CustomerClass: ${this.data.reuseSearchOptions.ResponsiblePartyType}`);
        data.forEach((location) => {
          this.locationSelectList.push(new LocationFilterSelectItem(location.LocationId, `${location.LocationName}, (${location.LocationStreet1}, ${location.LocationZipCode})`));
        });
      });
  }

  checkToggleLocationDropdownEnabled() {
    if (this.selectedLocationId > 0 && this.availableUnits.length > 0) {
      this.disableLocationSearch = true;
    }
    else {
      this.disableLocationSearch = false;
    }
  }

  onMarketListItemSelected() {
    let marketFilterSelect = <any>this.page.getViewById('reusableChassisMarketFilterSelect');
    marketFilterSelect.Clear();
  }

  openMarketFilterSelect() {
    if (this.page.getViewById('reusableChassisMarketFilterSelect')) {
      let marketFilterSelect = <any>this.page.getViewById('reusableChassisMarketFilterSelect');
      marketFilterSelect.open();
    }
  }

  clearMarketFilterSelect() {
    let marketFilterSelect = <any>this.page.getViewById('reusableChassisMarketFilterSelect');
    marketFilterSelect.Clear();
  }

  onMarketItemSelected(args) {
    console.log('selected market is => ' + args.selected.name);
    if (args.selected.name) {
      this.selectedLocationId = this.data.locationData.filter(loc => `${loc.LocationName}, (${loc.LocationStreet1}, ${loc.LocationZipCode})` == args.selected.name)[0].LocationId;
      //this.reuseSearchModel.MarketCode = this.data.marketData.filter(m => m.LocationMarketCode === args.selected.text)[0].LocationMarketCode;      
      this.checkToggleLocationDropdownEnabled();
    }
  }

  onMarketTapped(args) {
    console.log("Market tapped");
    this.checkToggleLocationDropdownEnabled();
  }

  onAddChassis() {
    console.log(`Attempting to add chassis: ${this.chassisId}`);

    if (this.availableUnits.findIndex(unit => unit.ChassisId == this.chassisId) > -1) {
      return;
    }

    if (this.chassisId && this.selectedLocationId > 0) {
      this.checkToggleLocationDropdownEnabled();
      this.orderService.validateReuseChassis(this.chassisId.toUpperCase())
        .subscribe(data => {
          console.log(`Validate response: '${data}' for ChassisId: ${this.chassisId}`);

          if (data) {
            console.log("Chassis is valid");
            this.validateResponseMessage = "";
            let selectedLocation = this.data.locationData.filter(loc => loc.LocationId == this.selectedLocationId)[0];
            let validatedChassis = new ReuseAvailabilityViewModel();
            validatedChassis.LocationId = this.selectedLocationId;
            validatedChassis.ChassisId = this.chassisId;
            validatedChassis.EquipmentSize = data.CategoryCode;
            validatedChassis.EquipmentClass = data.ChassisClass || "Chassis";
            validatedChassis.EquipmentTypeDescription = data.CategoryCode.slice(-2) + "` " + validatedChassis.EquipmentClass;
            validatedChassis.LocationCode = selectedLocation.LocationCode.toString();
            validatedChassis.LocationName = selectedLocation.LocationName;
            validatedChassis.LocationStreet1 = selectedLocation.LocationStreet1;
            validatedChassis.LocationStreet2 = selectedLocation.LocationStreet2;
            validatedChassis.LocationStreet3 = selectedLocation.LocationStreet3;
            validatedChassis.City = selectedLocation.LocationCity;
            validatedChassis.LocationStateProvince = selectedLocation.LocationStateProvince;
            validatedChassis.LocationZipCode = selectedLocation.LocationZipCode.toString();
            validatedChassis.OperatingHours = selectedLocation.OperatingHours;
            validatedChassis.InventoryOrgCode = data.InventoryOrgCode;
            validatedChassis.InventoryOrgDesc = data.InventoryOrgDescription;
            this.availableUnits.push(validatedChassis);
            this.chassisId = "";
          }
          else {
            this.showErrorMessage = true;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000);
            console.log("Chassis is not valid");
            this.validateResponseMessage = "Chassis is not elegible for reuse. If you have any questions please contact TRAC customer service."
          }
        });
    }
  }

  onOrderItemTap(args: ListViewEventData): void {

  }

  public onCellSwiping(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['swipeView'];
    var mainView = args['mainView'];
    //var leftItem = swipeView.getViewById('mark-view');
    var rightItem = swipeView.getViewById('delete-view');
  }

  public onSwipeCellStarted(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['object'];
    //var leftItem = swipeView.getViewById('mark-view');      
    var rightItem = swipeView.getViewById<View>('delete-view');
    //swipeLimits.left = swipeLimits.right = args.data.x > 0 ? swipeView.getMeasuredWidth() / 2 : swipeView.getMeasuredWidth() / 2;
    swipeLimits.left = 0;
    swipeLimits.right = swipeView.getMeasuredWidth() * 0.3;
    swipeLimits.threshold = swipeView.getMeasuredWidth() * 0.2;
  }


  public onSwipeCellFinished(args: ListViewEventData) {
    var swipeView = args['object'];
    //var leftItem = swipeView.getViewById('mark-view');
    var rightItem = swipeView.getViewById('delete-view');
    if (this.leftThresholdPassed) {
      console.log("Perform left action");
    } else if (this.rightThresholdPassed) {
      console.log("Perform right action");
    }
    this.leftThresholdPassed = false;
    this.rightThresholdPassed = false;
  }
  
  public onLeftSwipeClick(args: ListViewEventData) {
    console.log("Left swipe click");
    //this.listViewComponent.listView.notifySwipeToExecuteFinished();
  }

  public onRightSwipeClick(args) {
    console.log("Right swipe click");
    this.availableUnits.splice(this.availableUnits.indexOf(args.object.bindingContext), 1);
  }

  onRemoveClicked(chassisId: string) {
    console.log(`Clicked to remove ChassisId: ${chassisId}`);
    let indexToRemove = this.availableUnits.findIndex(unit => unit.ChassisId == chassisId);
    this.availableUnits.splice(indexToRemove, 1);
  }

  onNextClick() {
    this.data.reuseBookingUnits = this.availableUnits;

    this.routerExtensions.navigate(["/review-reuse"],
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