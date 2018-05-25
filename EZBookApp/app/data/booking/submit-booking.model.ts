import { SubmitBookingOrder } from "~/data/booking/submit-booking-order.model";
import { SubmitBookingOrderVM } from "~/data/booking/submit-booking-order-vm.model";


export class SubmitBooking{
  BookingOrder: SubmitBookingOrder;  
  BookingVMs: SubmitBookingOrderVM[];
  PendingVMs: SubmitBookingOrderVM[];  

  constructor(){
    this.BookingOrder = new SubmitBookingOrder;      
    this.BookingVMs = new Array<SubmitBookingOrderVM>();  
    this.PendingVMs = new Array<SubmitBookingOrderVM>();    
  }
}


