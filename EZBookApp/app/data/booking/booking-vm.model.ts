import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";

export class BookingVM {
  CustomerBooking: CustomerBooking;
  LocationId: number;
  AvailableQuantity: number;
  MarketCode: string;
  LocationCode: string;
  LocationName: string;
  EquipmentCategoryCode: string;
  EquipmentClass: string;
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
  Chassis: string;
  CountryName: string;
  InventoryOrgCode: string;
  InventoryOrgDesc: string;  
  LocationOperatingHours: string;  
}