import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";

export class ReuseAvailabilityViewModel{
  CustomerBooking: CustomerBooking;
  LocationId: number;
  AvailableQuantity: number;
  RequestedQuantity?: number;
  MarketCode: string;
  LocationCode: string;
  LocationName: string;
  EquipmentCategoryCode: string;
  EquipmentClass: string;
  EquipmentSize: string;
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
  ChassisId: string;
  ConcatenatedLocationString: string;
  CountryName: string;
  InventoryOrgCode: any;
  InventoryOrgDesc: string; 
  OperatingHours: string;
}