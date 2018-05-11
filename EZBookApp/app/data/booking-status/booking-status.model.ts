export class BookingStatus{
  public code: string;
  public name: string;
  public createDate: Date;
  public updateDate: Date;
  public createUser: string;
  public updateUser: string;

  constructor(code:string, name:string){
    this.code = code;
    this.name = name;
  }
}
