import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { CustomerBookingDetail } from "~/data/customer-booking/customer-booking-detail.model";

export class CustomerBooking {
  RequestTypeCode: string;
  RequestTypeFailure: string;
  EligibleForNotification: boolean;
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  CustomerBookingId: number;
  CustomerBookingCode: string;
  CustomerBookingVersion: number;
  LocationId: number;
  EquipmentClass: string;    
  UnitsRequestedCountUntouched :number;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  UnavailableCount: number;
  BookingOrderId: number;
  BookingStatusCode: string;
  RailTerminalReleaseNumber: string;
  InventoryOrgCode: string;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingStatus: BookingStatus;
  CustomerBookingDetails: CustomerBookingDetail[];
}