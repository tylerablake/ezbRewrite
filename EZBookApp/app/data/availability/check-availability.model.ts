export class CheckAvailability{
  RequestingPartyType: string;
  RequestingPartyId?: number;
  ResponsiblePartyType: string;
  ResponsiblePartyId: number;
  MarketCode: string;
  IncludeZeroInventory: boolean;
  EquipmentSize?: string;
  MotorCarrier?: string;
  MotorCarrierId?: number;
  OceanCarrier?: string;
  OceanCarrierId?: number;
  BookingNumber?: string;
  PickUpDate: Date;
  CustomerId?: number;
  Reuse: boolean;
  PickUpDateString?: string;

  constructor(){    
    this.PickUpDate = new Date();  
    this.PickUpDateString = this.PickUpDate.toLocaleDateString(); 
    this.RequestingPartyId = 0;
    this.RequestingPartyType = "";
    this.ResponsiblePartyId = 0;
    this.ResponsiblePartyType = "";
    this.MarketCode = "";
    this.Reuse = false;
    this.IncludeZeroInventory = true;    
    this.EquipmentSize = "";
    this.BookingNumber = ""; 
    
    this.MotorCarrier = "";
    this.MotorCarrierId = 0;
    this.OceanCarrier = "";
    this.OceanCarrierId = 0;
  }
}