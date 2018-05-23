import { BookingOrder } from "~/data/customer-booking/customer-booking-booking-order.model";
import { BookingVM } from "~/data/booking/booking-vm.model";
import { Customer } from "~/data/customer/customer.model";


export class CancelBookingResponse{
  BookingOrder: BookingOrder;
  BookingVMs: BookingVM[];
  PendingVMs: BookingVM[];
  MotorCarrierCustomer: Customer;
  BookingActivity: number;
  constructor(){
    this.BookingOrder = new BookingOrder();
    this.BookingVMs = new Array<BookingVM>();
    this.PendingVMs = new Array<BookingVM>();
    this.MotorCarrierCustomer = new Customer();
    this.BookingActivity = 0;
  }
}