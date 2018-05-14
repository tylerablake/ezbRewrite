export class UserAccount{
  SCAC: number;
  UserID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;

  CurrentPassword:string;
  NewPassword:string;
  ConfirmPassword:string;

  constructor(){
    this.SCAC = 0;
    this.UserID = "";
    this.FirstName = "";
    this.LastName = "";
    this.Email = "";
    this.PhoneNumber = "";


    this.CurrentPassword = "";
    this.NewPassword = "";
    this.ConfirmPassword = "";
  }
}