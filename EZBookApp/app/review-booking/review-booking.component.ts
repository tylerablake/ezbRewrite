import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/data';
import { RouterExtensions } from 'nativescript-angular/router';
import { Availability } from '~/data/availability/availability.model';
import { OrderService } from '~/services/order.service';
import { SubmitBookingOrderVM } from '~/data/booking/submit-booking-order-vm.model';
import { SubmitBooking } from '~/data/booking/submit-booking.model';
import { SubmitBookingOrder } from '~/data/booking/submit-booking-order.model';
import { HelperService } from '~/services/helper.service';


@Component({
  selector: 'ReviewBooking',
  moduleId: module.id,
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.scss'],
  providers: [OrderService]
})


export class ReviewBookingComponent implements OnInit {
  private totalRequestedChassis: number = 0;
  private requestedChassisCountMessage: string = "";
  private availableUnits: Availability[] = this.data.poolBookingUnits;
  private contactName: string;
  private confirmationEmail: string;
  private comments: string;

  constructor(private orderService: OrderService, private data: Data, private routerExtensions: RouterExtensions, private helperService: HelperService) {
    this.availableUnits.map(unit => {      
      this.totalRequestedChassis += unit.RequestedQuantity;
    });

    this.requestedChassisCountMessage = "You are requesting " + this.totalRequestedChassis + " chassis.";
    console.log("Review Booking for '" + this.totalRequestedChassis + "' requested units.")
  }

  ngOnInit() {

  }

  getChassisEquipmentString(equipmentSize: string): string{
   return this.helperService.getChassisEquipmentString(equipmentSize); 
  }

  onOrderItemTap() { }

  onSubmitReviewBooking(): void {
    let submitBookingModel = new SubmitBooking();

    let submitBookingOrder = new SubmitBookingOrder();
    submitBookingOrder.EquipmentSize = this.data.availabilitySearchOptions.EquipmentSize;    
    submitBookingOrder.MarketCode = this.data.availabilitySearchOptions.MarketCode;
    submitBookingOrder.MotorCarrierId = this.data.availabilitySearchOptions.MotorCarrierId;

    submitBookingOrder.RequestingPartyId = this.data.userProfile.CustomerId;
    submitBookingOrder.RequestingPartyType = this.data.userProfile.CustomerClass;
    submitBookingOrder.ResponsiblePartyId = this.data.availabilitySearchOptions.ResponsiblePartyId;
    submitBookingOrder.ResponsiblePartyType = this.data.availabilitySearchOptions.ResponsiblePartyType;   
    submitBookingOrder.BookingOrderComment = this.comments;
    submitBookingOrder.ContactName = this.contactName;
    submitBookingOrder.EmailAddresses = this.confirmationEmail;      
    if(this.data.availabilitySearchOptions.BookingNumber){
      submitBookingOrder.BillOfLading = this.data.availabilitySearchOptions.BookingNumber;
    }

    submitBookingModel.BookingOrder = submitBookingOrder;

    this.availableUnits.map(unit => {
      var bookingVM = new SubmitBookingOrderVM();      

      bookingVM.CustomerBooking = unit.CustomerBooking;
      bookingVM.CustomerBooking.UnitsRequestedCount = unit.RequestedQuantity;
      bookingVM.AvailableQuantity = unit.AvailableQuantity;
      bookingVM.EquipmentClass = unit.EquipmentClass;      
      bookingVM.LocationId = unit.LocationId;
      bookingVM.LocationName = unit.LocationName;      
      bookingVM.LocationStreet1 = unit.LocationStreet1;
      bookingVM.LocationStreet2 = unit.LocationStreet2;
      bookingVM.LocationStreet3 = unit.LocationStreet3;
      bookingVM.LocationZipCode = unit.LocationZipCode;
      bookingVM.LocationStateProvince = unit.LocationStateProvince;
      bookingVM.City = unit.City;
      bookingVM.InventoryOrgCode = unit.InventoryOrgCode;
      bookingVM.InventoryOrgDesc = unit.InventoryOrgDesc;
      bookingVM.Market = unit.Market;
      bookingVM.Region = unit.Region;
      bookingVM.SubRegion = unit.SubRegion;
      //TODO: Not sure if we should auto set this to true or not..
      bookingVM.IsTouched = true;

     
      submitBookingModel.BookingVMs.push(bookingVM);
    });
    
    submitBookingModel.BookingOrder.EmailAddresses = this.confirmationEmail;
    submitBookingModel.BookingOrder.ContactName = this.contactName;
    submitBookingModel.BookingOrder.BookingOrderComment = this.comments;

    console.log(JSON.stringify(submitBookingModel));
    this.data.submitCustomerBookingModel = submitBookingModel;

    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false,
      animated: true,
      transition: {
        name: "slide",
        duration: 400,
        curve: "ease"
      }
    };

    this.routerExtensions.navigate(["/confirm-booking"], navigationExtras);    
  }
}