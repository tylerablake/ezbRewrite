import { BookingStatus } from "~/data/booking-status/booking-status.model";

export class RepositionRedelivery {
  CancelBooking: boolean;
  ChasssOutgated: boolean;
  RepositionBookingId: number;
  RepositionRedeliveryCode: string;
  RepositionRedeliveryVersion: number;
  BookingStatusCode: string;
  FromLocationId: number;
  ToLocationId: number;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingStatus: BookingStatus;
}