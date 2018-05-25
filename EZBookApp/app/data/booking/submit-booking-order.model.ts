export class SubmitBookingOrder {
  EffectiveFrom: Date;
  EffectiveTo: Date;
  RequestingPartyType: string;
  ResponsiblePartyType: string;
  MarketCode: string;
  EquipmentSize: string;
  MotorCarrierId: number;
  RequestingPartyId: number;
  ResponsiblePartyId: number;
  ContactName?: any;
  EmailAddresses?: any;
  BookingOrderComment? : string;
  BillOfLading?: string;
  constructor(){
    this.EffectiveFrom = new Date();
    this.EffectiveTo = new Date();    
  }
}