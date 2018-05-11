import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { BookingOrderType } from "~/data/customer-booking/customer-booking-booking-order-type.model";
import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";
import { LongTermBooking } from "~/data/customer-booking/customer-booking-long-term-booking.model";
import { LongTermRedelivery } from "~/data/customer-booking/customer-booking-long-term-redelivery.model";
import { RepositionBooking } from "~/data/customer-booking/customer-booking-reposition-booking.model";
import { BookingOrderFee } from "~/data/customer-booking/customer-booking-booking-order-fee.model";
import { PoolRedelivery } from "~/data/customer-booking/customer-booking-pool-redelivery.model";


export class BookingOrder {
  BookingOrderId: number;
  BookingOrderCode: string;
  BookingOrderVersion: number;
  MarketCode: string;
  EquipmentSize: string;
  MotorCarrierId: number;
  ResponsiblePartyId: number;
  RequestingPartyId: number;
  CustomerId: number;
  ContractId: string;
  ResponsiblePartyType: string;
  RequestingPartyType: string;
  BookingStatusCode: string;
  BookingOrderTypeCode: string;
  EffectiveFrom: Date;
  EffectiveTo: Date;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  UsageType: string;
  BillOfLading: string;
  BookingOrderReuse: string;
  BookingOrderComment: string;
  ContactName: string;
  EmailAddresses: string;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  Source: string;
  BookingStatus: BookingStatus;
  BookingOrderType: BookingOrderType;
  CustomerBookings: CustomerBooking[];
  LongTermBookings: LongTermBooking[];
  LongTermRedeliveries: LongTermRedelivery[];
  RepositionBookings: RepositionBooking[];
  BookingOrderFees: BookingOrderFee[];
  PoolRedeliveries: PoolRedelivery[];
}