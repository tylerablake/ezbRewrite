import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/data';
import { Config } from '../shared/config';
//import { Subscription } from 'rxjs/Subscription';
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from 'nativescript-angular/router';
import { OrderService } from '~/services/order.service';
import { SubmitBooking } from '~/data/booking/submit-booking.model';
import { Observable } from "rxjs/Observable"; 
import { ConfirmBookingOrderVM } from '~/data/booking/confirm-booking-order-vm.model';
import { ConfirmBooking } from '~/data/booking/confirm-booking.model';
import { Availability } from '~/data/availability/availability.model';
import { ConfirmBookingOrder } from '~/data/booking/confirm-booking-order.model';
import { CheckAvailability } from '~/data/availability/check-availability.model';
import { HelperService } from '~/services/helper.service';

@Component({
  selector: 'ConfirmBooking',
  moduleId: module.id,
  templateUrl: './confirm-booking.component.html',
  styleUrls: ["./confirm-booking.component.scss"],
  providers: [OrderService]
})

export class ConfirmBookingComponent implements OnInit {
  private bookingVMs: ObservableArray<ConfirmBookingOrderVM>;
  private pendingVMs: ObservableArray<ConfirmBookingOrderVM>;
  private submitBookingModel: SubmitBooking = this.data.submitCustomerBookingModel;
  private submitBookingResultData: ConfirmBooking = new ConfirmBooking();  
  private accentColor: string = Config.tracBlueHex;
  private confirmBookingOrder: ConfirmBookingOrder = new ConfirmBookingOrder();
  private isLoading: boolean = true;  
  private availableUnits: Availability[];  
  private comment: Observable<string> = Observable.of("");
  private responsiblePartyName: string = "";
  private motorCarrierName: string = "";

  constructor(private data:Data, private orderService: OrderService, private routerExtensions:RouterExtensions, private helperService: HelperService) {
    this.isLoading = true;
    
    this.orderService.submitCustomerBooking(this.submitBookingModel)
            .finally(() => this.isLoading = false)
            .subscribe((submitBookingResult: ConfirmBooking) => {
              this.submitBookingResultData = submitBookingResult;
              console.log("Retrieved BookingOrderCode: " + submitBookingResult.BookingOrder.BookingOrderCode);                          
              console.log("Retrieved '" + submitBookingResult.BookingVMs.length + "' BookingVMs");
              console.log("Retrieved '" + submitBookingResult.PendingVMs.length + "' PendingVMs");            
                this.responsiblePartyName = this.data.customerData.filter(cust => cust.CustomerId == this.submitBookingResultData.BookingOrder.ResponsiblePartyId)[0].CustomerName;              
                this.motorCarrierName = this.data.customerData.filter(cust => cust.CustomerId == this.submitBookingResultData.BookingOrder.MotorCarrierId)[0].CustomerName;              
                this.confirmBookingOrder = submitBookingResult.BookingOrder;           
                this.comment = submitBookingResult.BookingOrder.BookingOrderComment;       
                this.bookingVMs = new ObservableArray(submitBookingResult.BookingVMs);                   
                this.pendingVMs = new ObservableArray(submitBookingResult.PendingVMs);                      
                
                this.bookingVMs.map(booking => {
                  let location = this.data.locationData.filter(loc => loc.LocationId == booking.LocationId)[0];
                  console.log(`BookingVM.EquipmentSize = ${booking.EquipmentSize}`);
                  console.log(`BookingVM.EquipmentClass = ${booking.EquipmentClass}`);
                  console.log(`BookingVM.EquipmentTypeDescription = ${booking.EquipmentTypeDescription}`);
                  booking.LocationOperatingHours = location.OperatingHours;
                });

                this.pendingVMs.map(booking => {
                  let location = this.data.locationData.filter(loc => loc.LocationId == booking.LocationId)[0];
                  console.log(`PendingVM.EquipmentSize = ${booking.EquipmentSize}`);
                  console.log(`PendingVM.EquipmentClass = ${booking.EquipmentClass}`);
                  console.log(`PendingVM.EquipmentTypeDescription = ${booking.EquipmentTypeDescription}`);
                  booking.LocationOperatingHours = location.OperatingHours;
                });
            });   
   }

  ngOnInit() {    
             
   }

   onOrderItemTap(args):void{
     
   }

   getChassisEquipmentString(equipmentSize: string, equipmentClass: string): string{
    return this.helperService.getChassisEquipmentString(equipmentSize, equipmentClass); 
   }

   onCreateNewBooking():void{
    this.data.availabilitySearchOptions = new CheckAvailability();
    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false    
    };
  //Navigate to booking tab
  this.routerExtensions.navigate(["/tabs/2"], navigationExtras);
  
   }

   onViewOrders():void{
    this.data.availabilitySearchOptions = new CheckAvailability();
    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false     
    };
  //Navigate to orders tab
  this.routerExtensions.navigate(["/tabs/1"], navigationExtras);
   }

}