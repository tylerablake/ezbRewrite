import { BookingFee } from "~/data/customer-booking/customer-booking-fee.model";

export class LongTermOrderFee {
  LockedForEdit: boolean;
  LongTermOrderFeeId: number;
  LongTermBookingId: number;
  BookingFeeId: number;
  Amount: number;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingFee: BookingFee;
}