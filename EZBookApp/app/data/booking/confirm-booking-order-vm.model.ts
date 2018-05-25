import { CustomerBooking } from "~/data/customer-booking/customer-booking.model";

export class ConfirmBookingOrderVM {
  CustomerBooking: CustomerBooking;
  LocationId: number;
  AvailableQuantity: number;
  MarketCode?: any;
  LocationCode?: any;
  LocationName?: any;
  EquipmentSize?: any;
  EquipmentClass?: any;
  EquipmentTypeDescription?: any;
  Market?: any;
  Region?: any;
  SubRegion?: any;
  LocationStreet1?: any;
  LocationStreet2?: any;
  LocationStreet3?: any;
  City?: any;
  LocationStateProvince?: any;
  LocationZipCode?: any;
  Chassis?: any;
  CountryName?: any;
  InventoryOrgCode: string;
  InventoryOrgDesc?: any;
  LocationOperatingHours: string;
}