import { ConfirmBookingOrder } from "~/data/booking/confirm-booking-order.model";
import { ConfirmBookingOrderVM } from "./confirm-booking-order-vm.model";

export class ConfirmBooking {
  BookingOrder: ConfirmBookingOrder;
  BookingVMs: ConfirmBookingOrderVM[];
  PendingVMs: ConfirmBookingOrderVM[];
  MotorCarrierCustomer?: any;
  BookingActivity: number;
}