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
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { layout } from "utils/utils";


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

  @ViewChild("myListView") listViewComponent: RadListViewComponent;

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
        console.log(`Found ${orders.length} orders.`);
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


  // public onSwipeCellStarted(args: ListViewEventData):void {
  //     var swipeLimits = args.data.swipeLimits;
  //     var swipeView = args['object'];
  //     var rightItem = swipeView.getViewById<View>('delete-view');
  //     //Disable left swipe
  //     swipeLimits.left = 0;
  //     //Disable right swipe for now
  //     //swipeLimits.right = 0;
  //     swipeLimits.right = rightItem.getMeasuredWidth();
  //     //swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  // }

  // public onCellSwiping(args: ListViewEventData):void {
  //     var swipeLimits = args.data.swipeLimits;
  //     var currentItemView = args.object;
  //     var currentView;

  //     if (args.data.x > 200) {
  //         console.log("Notify perform left action");
  //     } else if (args.data.x < -200) {
  //         console.log("Notify perform right action");
  //     }
  // }

  // public onSwipeCellFinished(args: ListViewEventData):void {
  // }

  // public onRightSwipeClick(args):void {
  //     console.log("Right swipe click");
  // }

  // onOrderItemTap(args: ListViewEventData): void {
  // }

  // onOrderEditTap(args: ListViewEventData): void {
  //     const tappedOrderItem = args.view.bindingContext;        

  //     this._routerExtensions.navigate(["order-detail/" + tappedOrderItem.BookingOrderId + '/orderNumber/' + tappedOrderItem.BookingOrderCode],
  //         {
  //             animated: true,
  //             transition: {
  //                 name: "slide",
  //                 duration: 400,
  //                 curve: "ease"
  //             }
  //         });
  // }

     // >> angular-listview-swipe-action-thresholds
     public onCellSwiping(args: ListViewEventData) {
      var swipeLimits = args.data.swipeLimits;
      var swipeView = args['swipeView'];
      var mainView = args['mainView'];
      //var leftItem = swipeView.getViewById('mark-view');
      var rightItem = swipeView.getViewById('delete-view');

      // if (args.data.x > swipeView.getMeasuredWidth() / 4 && !this.leftThresholdPassed) {
      //     console.log("Notify perform left action");
      //     //var markLabel = leftItem.getViewById('mark-text');
      //     this.leftThresholdPassed = true;
      // } else if (args.data.x < -swipeView.getMeasuredWidth() / 4 && !this.rightThresholdPassed) {
      //     var deleteLabel = rightItem.getViewById('delete-text');
      //     console.log("Notify perform right action");
      //     //this.rightThresholdPassed = true;
      // }
      // if (args.data.x > 0) {
      //     // var leftDimensions = View.measureChild(
      //     //     leftItem.parent,
      //     //     leftItem,
      //     //     layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
      //     //     layout.makeMeasureSpec(mainView.getMeasuredHeight(), layout.EXACTLY));
      //     // View.layoutChild(leftItem.parent, leftItem, 0, 0, leftDimensions.measuredWidth, leftDimensions.measuredHeight);
      // } else {
      //     var rightDimensions = View.measureChild(
      //         rightItem.parent,
      //         rightItem,
      //         layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
      //         layout.makeMeasureSpec(mainView.getMeasuredHeight(), layout.EXACTLY));

      //     View.layoutChild(rightItem.parent, rightItem, mainView.getMeasuredWidth() - rightDimensions.measuredWidth, 0, mainView.getMeasuredWidth(), rightDimensions.measuredHeight);
      // }
  }
  // << angular-listview-swipe-action-thresholds

  // >> angular-listview-swipe-action-thresholds-limits
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
  // << angular-listview-swipe-action-thresholds-limits

  // >> angular-listview-swipe-actions-execute
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
  // << angular-listview-swipe-actions-execute

  public onLeftSwipeClick(args: ListViewEventData) {
      console.log("Left swipe click");
      //this.listViewComponent.listView.notifySwipeToExecuteFinished();
  }

  public onRightSwipeClick(args) {
      console.log("Right swipe click");
      //this.orders.splice(this.orders.indexOf(args.object.bindingContext), 1);
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
