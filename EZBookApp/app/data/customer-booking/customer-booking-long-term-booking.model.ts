import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { LongTermOrderFee } from "~/data/customer-booking/customer-booking-long-term-order-fee.model";

export class LongTermBooking {
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  LongTermBookingId: number;
  LongTermBookingCode: string;
  LongTermBookingVersion: number;
  LocationId: number;
  EquipmentSize: string;
  EquipmentClass: string;
  ContractLineId: number;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  BookingOrderId: number;
  BookingStatusCode: string;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingStatus: BookingStatus;
  BookingComment: string;
  LongTermOrderFees: LongTermOrderFee[];
  IsSwapBooking: string;
}