export class RegisterUserRequest {
  ApplicationUserName: string;
  ApplicationUserPassword: string;
  ApplicationUserEmail: string;
  ApplicationUserPhone: string;
  ApplicationUserFirstName: string;
  ApplicationUserLastName: string;
  UserCustomerSCACCode: string;
  RecaptchaToken: string;

  constructor(){
    this.RecaptchaToken = null;
  }
}