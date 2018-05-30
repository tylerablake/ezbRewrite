import { ReuseBookingOrder } from "~/data/reuse/reuse-booking-order.model";
import { Customer } from "~/data/customer/customer.model";
import { ConfirmReusePendingDetails } from "~/data/reuse/confirm-reuse-pending-details.model";


export class ConfirmReuse{
  BookingOrder: ReuseBookingOrder;
  MotorCarrier: Customer;
  PendingDetails: ConfirmReusePendingDetails[]
}