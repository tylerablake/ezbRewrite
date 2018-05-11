import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { LongTermRedeliveryDetail } from "~/data/customer-booking/customer-booking-long-term-redelivery-detail.model";

export class LongTermRedelivery {
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  EligibleForNotification: boolean;
  OnHireCriteria: string;
  LongTermRedeliveryId: number;
  LongTermRedeliveryCode: string;
  LongTermRedeliveryVersion: number;
  BookingOrderId: number;
  BookingStatusCode: string;
  ContractId: string;
  LocationId: number;
  EffectiveDate: Date;
  EffectiveTo: Date;
  Comments: string;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  PurchaseOptionOverride: string;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingStatus: BookingStatus;
  LongTermRedeliveryDetails: LongTermRedeliveryDetail[];
  IsSwapRedelivery: string;
}