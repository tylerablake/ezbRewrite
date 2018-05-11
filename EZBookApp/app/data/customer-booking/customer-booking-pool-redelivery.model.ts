import { BookingStatus } from "~/data/booking-status/booking-status.model";

export class PoolRedelivery {
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  EligibleForNotification: boolean;
  OnHireCriteria: string;
  PoolRedeliveryId: number;
  BookingOrderId: number;
  InventoryOrg: string;
  LocationId: number;
  RedeliveryNumber: string;
  Quantity: number;
  MotorCarrierId: number;
  RedeliveryReason: string;
  BookingStatusCode: string;
  Comments: string;
  EquipmentClass: string;
  BookingStatus: BookingStatus;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
}