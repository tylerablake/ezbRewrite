import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { CustomerBookingDetail } from "~/data/customer-booking/customer-booking-detail.model";

export class ReuseCustomerBooking {
  BookingId: number;
  EligibleForNotification: boolean;
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  RequestTypeCode?: any;
  RequestTypeFailure?: any;
  CustomerBookingId: number;
  CustomerBookingCode: string;
  CustomerBookingVersion: number;
  LocationId: number;
  EquipmentClass?: any;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  UnavailableCount?: any;
  BookingOrderId: number;
  BookingStatusCode: string;
  RailTerminalReleaseNumber?: any;
  InventoryOrgCode?: any;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingStatus: BookingStatus;
  CustomerBookingDetails: CustomerBookingDetail[];
  LocationName: string;
  LocationOperatingHours?: any;
  LocationStreet1: string;
  LocationStreet2?: any;
  LocationStreet3?: any;
  LocationCity: string;
  LocationStateProvince: string;
  LocationZipCode: string;
  
  
}