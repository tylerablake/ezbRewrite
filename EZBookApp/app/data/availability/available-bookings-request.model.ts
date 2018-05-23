import { CheckAvailability } from "./check-availability.model";

export class AvailableBookingsRequest{
  MarketCode: string;
  EquipmentSize: string;
  CustomerId: number;
  Reuse: boolean;
  ResponsiblePartyId: number;
  ResponsiblePartyType: string;
  IncludeZeroInventory: boolean;

  constructor(checkAvailabilityModel: CheckAvailability){
    this.MarketCode = checkAvailabilityModel.MarketCode;
    this.EquipmentSize = checkAvailabilityModel.EquipmentSize;
    this.Reuse = checkAvailabilityModel.Reuse;
    this.ResponsiblePartyId = checkAvailabilityModel.ResponsiblePartyId;
    this.ResponsiblePartyType = checkAvailabilityModel.ResponsiblePartyType;
    this.IncludeZeroInventory = checkAvailabilityModel.IncludeZeroInventory;
    this.CustomerId = 0;
  }
}