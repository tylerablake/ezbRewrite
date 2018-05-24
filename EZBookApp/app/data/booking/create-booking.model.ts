export class CreateBooking{
  RequestingPartyType: string;
  RequestingPartyId?: number;
  ResponsiblePartyType: string;
  ResponsiblePartyId: number;
  MarketCode: string;
  IncludeZeroInventory: boolean;
  EquipmentSize?: string;
  MotorCarrier: string;
  MotorCarrierId: number;
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
    this.IncludeZeroInventory = false;    
    this.EquipmentSize = "";
    this.BookingNumber = "";  
    this.MotorCarrier = "";
    this.MotorCarrierId = 0;
  }
  
}