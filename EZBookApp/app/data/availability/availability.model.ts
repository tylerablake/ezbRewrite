import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";

export class Availability{
  CustomerBooking: CustomerBooking;
    LocationId: number;
    AvailableQuantity: number;
    MarketCode: string;
    LocationCode: number;
    LocationName: string;
    EquipmentSize: string;
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
    Chassis: any;
    CountryName: string;
    InventoryOrgCode: any;
    InventoryOrgDesc: string; 
    RequestedQuantity: number;
}
