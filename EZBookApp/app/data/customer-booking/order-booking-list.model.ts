import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";

export class OrderBookingList{
  CustomerBooking: CustomerBooking;
  LocationId: number;
  AvailableQuantity: number;
  MarketCode: number;
  LocationCode: number;
  LocationName: string;
  EquipmentCategoryCode: number;
  EquipmentClass: any;
  EquipmentTypeDescription: string;
  Market: string;
  Region: string;
  SubRegion: string;
  LocationStreet1: string;
  LocationStreet2: string;
  LocationStreet3: string;
  City: string;
  LocationStateProvince: string;
  LocationZipCode: string;
  Chassis: any;
  CountryName: string;
  InventoryOrgCode: string;
  InventoryOrgDesc: string;
}