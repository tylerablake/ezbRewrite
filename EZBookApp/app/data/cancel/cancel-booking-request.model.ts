export class CancelBookingRequest{
  BookingOrderId: number;
  AdditionalEmails: string;
  constructor(){
    this.BookingOrderId = 0;
    this.AdditionalEmails = "";
  }
}