import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { RepositionRedelivery } from "~/data/customer-booking/customer-booking-reposition-redelivery.model";

export class RepositionBooking {
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  EligibleForNotification: boolean;
  RepositionBookingId: number;
  RepositionBookingCode: string;
  RepositionBookingVersion: number;
  FromLocationId: number;
  ToLocationId: number;
  EquipmentClass: string;
  BookingReasonId: number;
  BookingComment: string;
  WithRedelivery: string;
  FromInventoryOrgCode: string;
  ToInventoryOrgCode: string;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  BookingOrderId: number;
  BookingStatusCode: string;
  RailTerminalReleaseNumber: string;
  MotorCarrierId: number;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingStatus: BookingStatus;
  RepositionRedelivery: RepositionRedelivery;
}