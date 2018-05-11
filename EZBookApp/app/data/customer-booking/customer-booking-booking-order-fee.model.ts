import { BookingFee } from "~/data/customer-booking/customer-booking-fee.model";

export class BookingOrderFee {
  BookingOrderFeeId: number;
  BookingFeeId: number;
  BookingOrderId: number;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  BookingFee: BookingFee;
}