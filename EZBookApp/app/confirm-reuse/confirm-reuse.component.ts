import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/data';
import { Config } from '../shared/config';
import { ObservableArray } from "data/observable-array";
import { OrderService } from '~/services/order.service';
import { SubmitReuse } from '~/data/reuse/submit-reuse.model';
import { ConfirmReuse } from '~/data/reuse/confirm-reuse.model';
import { ReuseCustomerBooking } from '~/data/reuse/reuse-customer-booking.model';
import { ConfirmReusePendingDetailsViewModel } from '~/data/reuse/confirm-reuse-pending-details-view.model';
import { RouterExtensions } from 'nativescript-angular/router';
import * as dialogs from "ui/dialogs";
import { ConfirmReuseBooking } from '~/data/reuse/confirm-reuse-booking.model';
import { CheckAvailability } from '~/data/availability/check-availability.model';
import { HelperService } from '~/services/helper.service';

@Component({
  selector: 'ConfirmReuse',
  moduleId: module.id,
  templateUrl: './confirm-reuse.component.html',
  styleUrls: ["./confirm-reuse.component.scss"],
  providers: [OrderService]
})

export class ConfrimReuseComponent implements OnInit {
  private submitReuseModel: SubmitReuse = this.data.submitReuseBookingModel;
  private submitReuseResultData: ConfirmReuse = new ConfirmReuse();
  private accentColor: string = Config.tracBlueHex;
  private isLoading: boolean = true;
  private bookingVMs: ObservableArray<ReuseCustomerBooking> = new ObservableArray<ReuseCustomerBooking>();
  private pendingVMs: ObservableArray<ReuseCustomerBooking> = new ObservableArray<ReuseCustomerBooking>();
  private customerBookings: ObservableArray<ReuseCustomerBooking> = new ObservableArray<ReuseCustomerBooking>();
  private responsiblePartyName: string = "";
  private motorCarrierName: string = "";
  private pendingDetails: ObservableArray<ConfirmReusePendingDetailsViewModel> = new ObservableArray<ConfirmReusePendingDetailsViewModel>();
  private showPendingMessage: boolean = false;

  constructor(private data: Data, private orderService: OrderService, private routerExtensions: RouterExtensions, private helperService: HelperService) {
    this.isLoading = true;

    this.orderService.submitCustomerReuse(this.submitReuseModel)
      .finally(() => this.isLoading = false)
      .subscribe((confirmedBookingOrderNumber: number) => {
        if (confirmedBookingOrderNumber > 0) {
          this.orderService.getSubmittedCustomerReuseInfo(confirmedBookingOrderNumber)
            .finally(() => this.isLoading = false)
            .subscribe((data: ConfirmReuse) => {
              console.log(`Result from getSubmittedCustomerReuseInfo(): ${JSON.stringify(data)}`);
              if (data) {
                this.submitReuseResultData = data;
                this.motorCarrierName = this.data.customerData.filter(cust => cust.CustomerId == data.BookingOrder.MotorCarrierId)[0].CustomerName;
                this.responsiblePartyName = this.data.customerData.filter(cust => cust.CustomerId == data.BookingOrder.ResponsiblePartyId)[0].CustomerName;
                this.pendingDetails = new ObservableArray(data.PendingDetails);

                //Set location data for pending details
                this.pendingDetails.map(detail => {
                  let locationData = this.data.locationData.filter(loc => loc.LocationId === detail.LocationId)[0];
                  detail.InventoryOrgCode = detail.InventoryOrgName;
                  detail.LocationStreet1 = locationData.LocationStreet1;
                  detail.LocationCity = locationData.LocationCity;
                  detail.LocationStateProvince = locationData.LocationStateProvince;
                  detail.LocationOperatingHours = locationData.OperatingHours;
                });


                //Get Bookings
                var bookings = new ObservableArray(this.submitReuseResultData.BookingOrder.CustomerBookings);
                var confirmedBookings: ObservableArray<ConfirmReuseBooking> = new ObservableArray<ConfirmReuseBooking>();
                //Get Confirmed Bookings
                bookings.map(b => {
                  if (b.BookingOrderId) {
                    let confirmedBooking: ReuseCustomerBooking = new ReuseCustomerBooking();
                    confirmedBooking = b;
                    this.bookingVMs.push(confirmedBooking);
                  }
                })
              }
              else {
                dialogs.alert({
                  title: "Error Occurred",
                  message: "An error occurred, please try again.",
                  okButtonText: "Dismiss"
                });
                this.showPendingMessage = true;
              }
            }, (error) => {
              dialogs.alert({
                title: "Error Occurred",
                message: "An error occurred, please try again.",
                okButtonText: "Dismiss"
              });
            });
        }
      });
  }

  onBackTapped() {
    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false,
    };
    //Navigate to booking tab
    this.routerExtensions.navigate(["/review-reuse"], navigationExtras);
  }

  getChassisEquipmentString(equipmentSize: string): string {
    return this.helperService.getChassisEquipmentString(equipmentSize);
  };

  ngOnInit() {

  }

  onCreateNewReuse(): void {
    this.data.reuseSearchOptions = new CheckAvailability();
    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false,
    };
    //Navigate to booking tab
    this.routerExtensions.navigate(["/tabs/3"], navigationExtras);

  }

  onViewOrders(): void {
    this.data.reuseSearchOptions = new CheckAvailability();
    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false,
    };
    //Navigate to orders tab
    this.routerExtensions.navigate(["/tabs/1"], navigationExtras);
  }

  onOrderItemTap(args) {

  }

}