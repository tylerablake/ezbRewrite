import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";

export class SubmitBookingOrderVM{
  CustomerBooking: CustomerBooking;  
  AvailableQuantity: number;
  EquipmentClass?: any;
  EquipmentCategoryCode?: null;  
  EquipmentTypeDescription: null;
  InventoryOrgCode: string;
  InventoryOrgDesc: string;
  IsTouched: boolean;
  LocationCode: null;
  LocationId: number;
  LocationName: string;
  LocationStateProvince: string;
  LocationStreet1: string;
  LocationStreet2: string;
  LocationStreet3: string;
  LocationZipCode: string;
  Market: string;
  MarketCode: string;
  Region: string;
  SubRegion: string;
  City: string;  
}