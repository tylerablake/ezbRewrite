export class ReuseSearch{
  PickUpDate: Date;
  ResponsiblePartyType: string;
  ResponsiblePartyId: number;
  ResponsiblePartyName: string;
  MarketCode: string;
  MarketName: string;
  MotorCarrierId?: number;
  MotorCarrier?: string;
  OceanCarrierId?: number;
  OceanCarrier?: string;
  BookingNumber?: string;
  Reuse: boolean;  

  constructor(){
    this.PickUpDate = new Date();
    this.Reuse = true;
    this.BookingNumber = "";
  }
}