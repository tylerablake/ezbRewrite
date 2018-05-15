import { Component, OnInit, OnDestroy, ViewChild, Input, ViewContainerRef } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { Subscription } from "rxjs/Subscription";
import { Data } from "../../shared/data";
import { Config } from "../../shared/config";
import { Page, View } from "tns-core-modules/ui/page/page";
import { DashboardBookingSearch } from "~/data/search/dashboard-search.model";
import { OrderService } from "~/services/order.service";
import { AuthenticationService } from "~/services/authentication.service";
import { Order } from "~/data/order/order.model";
import { HelperService } from "~/services/helper.service";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";


@Component({
  selector: "DashboardTab",
  moduleId: module.id,
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [OrderService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private pageTitle: string;
  private setSearchProperties: number;
  private filterReturnedNoResults: boolean = false;
  private _isLoading: boolean = false;
  private leftThresholdPassed = false;
  private rightThresholdPassed = false;
  private _orders: ObservableArray<Order> = new ObservableArray<Order>([]);
  private ordersSubscription: Subscription;
  private locationsSubscription: Subscription;
  private marketSubscription: Subscription;

  private customerSubscription: Subscription;
  private searchOptions: DashboardBookingSearch = new DashboardBookingSearch(false);

  get orders(): ObservableArray<Order> { return this._orders; }

  get isLoading(): boolean { return this._isLoading; }

  constructor(
    private orderService: OrderService,
    private _routerExtensions: RouterExtensions,
    private authService: AuthenticationService,
    private helperService: HelperService,
    private data: Data,
    private page: Page) {
  }

  ngOnInit(): void {
    if (this.data.userProfile) {
      console.log("setUserProfile() success!, ApplicationUserId: " + this.data.userProfile.ApplicationUserId);
    }
    else {
      console.log("setUserProfile() ERROR!");
    }

    if (this.data.userClaims) {
      console.log("setUserClaims() success!, ClaimsUserId: " + this.data.userClaims.UserId);
    }
    else {
      console.log("setUserClaims() ERROR!");
    }

    this.filterReturnedNoResults = false;
    this.refreshData();
    this.locationsSubscription = this.orderService.getLocationData();
    this.marketSubscription = this.orderService.getMarketData();
    this.customerSubscription = this.orderService.getCustomerData();
  }

  public refreshData(): void {
    this._isLoading = true;
    this.filterReturnedNoResults = false;

    this.searchOptions = this.data.searchOptions;

    if (!this.data.searchOptions.DateTo && !this.data.searchOptions.DateFrom) {
      console.log("Resetting search options.");
      this.searchOptions = new DashboardBookingSearch(false);
    }

    this.ordersSubscription = this.orderService.getDashboardData(this.searchOptions)
      .finally(() => this._isLoading = false)
      .subscribe((orders: Array<Order>) => {     
        this._orders = new ObservableArray(orders["ResultSet"]);
        
        this.setSearchProperties = 0;
        Object.keys(this.data.searchOptions)

        const values = Object.keys(this.data.searchOptions)
          .map(key => this.data.searchOptions[key]);

        values.forEach(element => {
          if (element != "") {
            this.setSearchProperties++;
          }
        });


        if (this.setSearchProperties === 4 && this.data.searchOptions.BookingStatusCode === "OP") {
          this.pageTitle = "Dashboard";
        }
        else {
          this.pageTitle = "Filtered";
        }


        if (this._orders.length <= 0) {
          this.filterReturnedNoResults = true;
        }
        else {
          this.filterReturnedNoResults = false;
        }
        this._isLoading = false;
      });
  }


  getChassisEquipmentString(equipmentSize: string): string {
    return this.helperService.getChassisEquipmentString(equipmentSize);
  };

  getColor(statusDescription: string): string {
    return this.helperService.getStatusDescriptionColor(statusDescription);
  }

  onLogoutButtonTap() {
    this.authService.logout();
  }
  

  public onSwipeCellStarted(args: ListViewEventData):void {
      var swipeLimits = args.data.swipeLimits;
      var swipeView = args['object'];
      var rightItem = swipeView.getViewById<View>('delete-view');
      //Disable left swipe
      swipeLimits.left = 0;
      //Disable right swipe for now
      //swipeLimits.right = 0;
      swipeLimits.right = rightItem.getMeasuredWidth();
      //swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  }

  public onCellSwiping(args: ListViewEventData):void {
      var swipeLimits = args.data.swipeLimits;
      var currentItemView = args.object;
      var currentView;

      if (args.data.x > 200) {
          console.log("Notify perform left action");
      } else if (args.data.x < -200) {
          console.log("Notify perform right action");
      }
  }

  public onSwipeCellFinished(args: ListViewEventData):void {
  }

  public onRightSwipeClick(args):void {
      console.log("Right swipe click");
  }

  onOrderItemTap(args: ListViewEventData): void {
  }

  onOrderEditTap(args: ListViewEventData): void {
      const tappedOrderItem = args.view.bindingContext;        

      this._routerExtensions.navigate(["order-detail/" + tappedOrderItem.BookingOrderId + '/orderNumber/' + tappedOrderItem.BookingOrderCode],
          {
              animated: true,
              transition: {
                  name: "slide",
                  duration: 400,
                  curve: "ease"
              }
          });
  }

  ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }

    if (this.locationsSubscription) {
      this.locationsSubscription.unsubscribe();
    }

    if (this.marketSubscription) {
      this.marketSubscription.unsubscribe();
    }

    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }
}
