export class ChangePasswordRequest{
  ApplicationUserName: string;
  Guid: string;
  NewPassword: string;
  CurrentPassword: string;
  ResetPasswordBySystem: boolean;

  constructor(){
    this.Guid = null;
    this.ResetPasswordBySystem = true;
  }
}