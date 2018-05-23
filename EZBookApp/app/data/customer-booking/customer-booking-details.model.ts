import { BookingOrder } from "~/data/customer-booking/customer-booking-booking-order.model";
import { OrderBookingList } from "~/data/customer-booking/order-booking-list.model";
import { Customer } from "~/data/customer/customer.model";

export class CustomerBookingDetails{
  BookingOrder: BookingOrder;
  BookingVMs: OrderBookingList[];
  MotorCarrierCustomer: Customer;
}