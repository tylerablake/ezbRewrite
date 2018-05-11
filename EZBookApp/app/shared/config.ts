export class Config {
  //QA Base URL
  static proxyUrl = "http://helix3qa.tracintermodal.com";

  //SIT Base Url
  //static proxyUrl = "http://ezbsit.tracintermodal.com:50300";

  static securityUrl = "/trac/api/security/anonymous/authentication/login";

  static refreshTokenUrl = "/trac/api/security/authentication/tokenrefresh";

  static lookupDataUrl = "/trac/api/ezb/Lookup";
  
  static lookupLocationsUrl = "/trac/api/ezb/Lookup/locations";

  static lookupMarketsUrl = "/trac/api/ezb/Lookup/locationmarkets";

  static lookupFilteredMarketsUrl = "/trac/api/ezb/customerbooking/poolbooking/markets";

  static lookupCustomersUrl = "/trac/api/ezb/Lookup/customers";

  static customerBookingUrl = "/trac/api/ezb/customerbooking";

  static checkAvailabilityUrl = "/trac/api/ezb/customerbooking/checkavailability";

  static getReuseLocationsUrl = "/trac/api/ezb/reusebooking/getlocations";

  static validateReuseChassisUrl = "/trac/api/ezb/reusebooking/validate";

  static reuseBookingUrl = "/trac/api/ezb/reusebooking";

  static dashboardUrl = "/trac/api/ezb/dashboard";

  static dashboardDetailsUrl = "/trac/api/ezb/dashboard/details";

  static userProfileUrl = "/trac/api/ezb/user/profile";

  static userDetailsUrl= "/trac/api/ezb/user/userdetails"

  static recoverPasswordUrl = "/trac/api/ezb/user/recoverPassword";

  static resetPasswordUrl= "/trac/api/ezb/user/resetPassword";

  static registerUserUrl= "/trac/api/ezb/user";

  static applicationCode = "00a4c5e7-4106-421c-9f1f-f7ba2ed2e0af";

  static token = "";

  static username = "EBM_ITAdmin";

  static password = "Abcd12345";

  static userIsAdmin = false;

  static accentHex = "#005ABB";
  
  static tracOrangeHex = "#f8a61d";

  static confirmBookingLightBlueHex = "#e6ecf2";
}
