import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs/Subscription";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Observable } from "rxjs/Observable";
import * as dialogs from "ui/dialogs";
import * as moment from 'moment';
import { OrderService } from "~/services/order.service";
import { Order } from "~/data/order/order.model";
import { CustomerBookingDetails } from "~/data/customer-booking/customer-booking-details.model";
import { OrderDetail } from "~/data/order/order-detail.model";
import { Data } from "~/shared/data";
import { CancelBookingRequest } from "~/data/cancel/cancel-booking-request.model";
import { Config } from "~/shared/config";
import { HelperService } from "~/services/helper.service";

@Component({
    selector: "OrderDetail",
    moduleId: module.id,
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.scss"],
    providers: [OrderService]
})

export class OrderDetailComponent implements OnInit, OnDestroy {
    private isOrderLoading: boolean = true;
    private isBookingsLoading: boolean = true;
    private isDataLoading: boolean = true;

    private orderSubscription: Subscription;
    private order: Order = new Order(null, null, null, null, null, null, null);

    private _customerBookingDetails: CustomerBookingDetails;
    private orderDetails: OrderDetail[];
    private orderDetailsSubscription: Subscription;
    private customerBookingDetailsSubscription: Subscription;
    private orderId: number;
    private orderNumber: string;

    constructor(
        private _orderService: OrderService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private data: Data,
        private helperService: HelperService
    ) { }

    ngOnInit(): void {
        this.isDataLoading = true;
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this.orderId = params.id;
                this.orderNumber = params.orderNumber;
            });

        this.getOrder();
        this.getOrderDetails();

    }

    getOrder() {
        this.orderSubscription = this._orderService.getOrderDetailsByBookingNumber(this.orderNumber)
            .finally(() => this.isOrderLoading = false)
            .subscribe((orders: Order) => {
                this.order = orders["ResultSet"][0];
                this.isOrderLoading = false;
                this.updateLoadingIndicator();
            });
    }

    getOrderDetails() {
        this.orderDetailsSubscription = this._orderService.getOrderDetails(this.orderId)
            .finally(() => this.isBookingsLoading = false)
            .subscribe((orders: Array<OrderDetail>) => {
                this.orderDetails = orders;
                this.isBookingsLoading = false;
                this.updateLoadingIndicator();
            });
    }

    updateLoadingIndicator() {
        if (!this.isBookingsLoading && !this.isOrderLoading) {
            this.isDataLoading = false;
        }
        else {
            this.isDataLoading = true;
        }
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onCancelOrderTap(): void {
        console.log(`Cancel order pressed for Order: ${this.orderId}`);
        dialogs.confirm({
            title: "Cancel Order",
            message: "Are you sure you want to cancel the order?",
            okButtonText: "Yes",
            cancelButtonText: "No"
        }).then(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {

                //Check if the order is over 1 hour old.
                let orderTime = moment(this.order.CreateDate);
                let now = moment(new Date());
                let minutesSinceOrder = now.diff(orderTime, 'minutes');

                if (minutesSinceOrder < 60) {

                    let cancelBookingData = new CancelBookingRequest();
                    cancelBookingData.BookingOrderId = this.orderId;
                    this.data.cancelOrderData = cancelBookingData;
                    if (this.order.IsReUseBooking) {
                        this._routerExtensions.navigate(["confirm-edit-booking/" + this.orderId + '/isReuse/' + 1],
                            {
                                animated: true,
                                transition: {
                                    name: "slide",
                                    duration: 400,
                                    curve: "ease"
                                }
                            });
                    }
                    else {
                        this._routerExtensions.navigate(["/confirm-edit-booking/", this.orderId],
                            {
                                animated: true,
                                transition: {
                                    name: "slideTop",
                                    duration: 200,
                                    curve: "ease"
                                }
                            });
                    }
                }
                else {
                    dialogs.alert({
                        title: "",
                        message: "Your requests are not yet confirmed and are currently under review by Customer Support",
                        okButtonText: "Ok"
                    });
                    return;
                }





            }
        });
    }

    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/orders/order-detail-edit", this.orderId],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    getChassisEquipmentString(equipmentSize: string): string {
      return this.helperService.getChassisEquipmentString(equipmentSize);        
    };

    getColor(statusDescription: string): string {
      return this.helperService.getStatusDescriptionColor(statusDescription);
    }

    ngOnDestroy() {
        if (this.orderSubscription) {
            this.orderSubscription.unsubscribe();
        }

        if (this.orderDetailsSubscription) {
            this.orderDetailsSubscription.unsubscribe();
        }
    }
}
