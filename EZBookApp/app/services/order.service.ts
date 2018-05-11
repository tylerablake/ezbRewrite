import { Injectable, OnDestroy } from "@angular/core";
import { Config } from "~/shared/config";

// import { Injectable, NgZone, OnDestroy } from "@angular/core";
// import { Http, Response, Request, Headers } from "@angular/http";
// import { Observable } from "rxjs/Observable";
// import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
// import { Subscription } from "rxjs/Subscription";
// import * as dialogs from "ui/dialogs";

// import { Config } from "../shared/config";
// import { HttpHelperService } from "../shared/http-helper.service";
// import { Order } from "./order.model";
// import { Data } from "../shared/data";

// import { DashboardBookingSearch } from "../search/dashboard-order-search.model";
// import { CustomerBookingDetails } from "./customer-booking-details.model";
// import { OrderDetail } from "./order-detail/order-detail.model";
// import { Market } from "../shared/markets/market.model";
// import { LocationModel } from "../shared/locations/location.model";
// import { AuthenticationService } from "../shared/user/authentication.service";
// import { Customer } from "./customer.model";
// import { CreateBooking } from "../shared/booking/create-booking.model";
// import { Availability } from "../shared/booking/availability.model";
// import { CheckAvailabilityApiObject } from "../shared/booking/check-availability-api-object.model";
// import { LoadingIndicator } from "nativescript-loading-indicator";
// import { SubmitBooking } from "../shared/booking/submit-booking.model";
// import { AvailabilityViewModel } from "../availability/availability.viewmodel";
// import { SubmitBookingOrder } from "../shared/booking/submit-booking-order.model";
// import { ConfirmBookingOrder } from "../shared/booking/confirm-booking-order.model";
// import { ConfirmBooking } from "../shared/booking/confirm-booking.model";
// import { CheckAvailability } from "../shared/booking/check-availability.model";
// import { ReusableChassisLocationData } from "../reusable-chassis/reuseable-chassis-location-data.model";
// import { ConfirmReuse } from "../confirm-reuse/confirm-reuse.model";
// import { SubmitRecoverPassword } from "../recover-password/submit-recover-password.model";
// import { SubmitReuse } from "../shared/reuse/submit-reuse.model";
// import { EditBookingRequest } from "./order-detail-edit/edit-booking-request.model";
// import { EditBookingResponse } from "./order-detail-edit/edit-booking-response.model";
// import { CancelBookingResponse } from "../shared/booking/cancel-booking-response.model";
// import { CancelBookingRequest } from "../shared/booking/cancel-booking-request.model";
// import { ValidateChassisResponse } from "../reusable-chassis/validate-chassis-response.model";



@Injectable()
export class OrderService implements OnDestroy {
    private url = Config.proxyUrl + Config.dashboardUrl;
    // private ordersSubscription: Subscription;
    // private _orders: ObservableArray<Order>;

    // private loaderOptions = {
    //     message: 'Loading application data',
    //     //progress: 0.65,
    //     android: {
    //         indeterminate: true,
    //         cancelable: false,
    //         cancelListener: function (dialog) { console.log("Loading cancelled") },
    //         max: 100,
    //         progressNumberFormat: "%1d/%2d",
    //         progressPercentFormat: 0.53,
    //         progressStyle: 1,
    //         secondaryProgress: 1
    //     },
    //     ios: {
    //         //details: "Loading application data",
    //         margin: 10,
    //         //dimBackground: true,
    //         //color: "#000", // color of indicator and labels
    //         // background box around indicator
    //         // hideBezel will override this if true
    //         //backgroundColor: "yellow",
    //         hideBezel: false, // default false, can hide the surrounding bezel
    //         //view: UIView, // Target view to show on top of (Defaults to entire window)
    //         //mode: // see iOS specific options below
    //     }
    // };

    // constructor(private http: Http, private httpHelper: HttpHelperService, private data: Data, private authService: AuthenticationService) {
    // }

    // load(orderSearch: DashboardBookingSearch = new DashboardBookingSearch(false)): Observable<any> {
    //     this.authService.refreshToken();
    //     const url = Config.proxyUrl + Config.dashboardUrl + "/search";
    //     const options = this.httpHelper.getCommonAuthHeaders();

    //     const orderList: Observable<Order[]> =
    //         <Observable<Order[]>>

    //         this.http.post(
    //             url,
    //             JSON.stringify(orderSearch), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on load(): " + err)
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return orderList;
    // }

    // getOrderDetailsByBookingNumber(orderNumber: string) {

    //     if (!orderNumber) {
    //         return;
    //     }
    //     this.authService.refreshToken();
    //     const url = Config.proxyUrl + Config.dashboardUrl + "/search";
    //     const options = this.httpHelper.getCommonAuthHeaders();

    //     var orderSearch: DashboardBookingSearch = new DashboardBookingSearch(false);

    //     orderSearch.DateFrom = this.addDays(new Date, -7);
    //     orderSearch.DateTo = new Date();
    //     orderSearch.OrderNumber = orderNumber;

    //     const order: Observable<Order> =
    //         <Observable<Order>>

    //         this.http.post(
    //             url,
    //             JSON.stringify(orderSearch), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return order;
    // }

    // getCustomerBookingDetailsById(id: number): Observable<CustomerBookingDetails> {
    //     if (!id) {
    //         return;
    //     }
    //     this.authService.refreshToken();
    //     const url = Config.proxyUrl + Config.customerBookingUrl + "/" + id.toString();

    //     const options = this.httpHelper.getCommonAuthHeaders();

    //     const customerBookingDetails: Observable<CustomerBookingDetails> =
    //         <Observable<CustomerBookingDetails>>

    //         this.http.get(
    //             url, options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return customerBookingDetails;

    // }

    // getOrderById(id: string): Order {
    //     if (!id) {
    //         return;
    //     }

    //     return this._orders.filter((order) => {
    //         var test = order;
    //         return order.BookingOrderId.toString() === id;
    //     })[0];
    // }

    // getOrderDetails(id: number): Observable<OrderDetail[]> {
    //     if (!id) {
    //         return;
    //     }
    //     this.authService.refreshToken();
    //     const url = Config.proxyUrl + Config.dashboardDetailsUrl + "/" + id.toString();

    //     const options = this.httpHelper.getCommonAuthHeaders();

    //     const orderDetails: Observable<OrderDetail[]> =
    //         <Observable<OrderDetail[]>>

    //         this.http.get(
    //             url, options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return orderDetails;
    // }

    // searchOrders(searchOptions: DashboardBookingSearch): void {

    // }

    // checkAvailability(availabilitySearchOptons: CheckAvailability): Observable<AvailabilityViewModel[]> {
    //     this.authService.refreshToken();
    //     const url = Config.proxyUrl + Config.checkAvailabilityUrl;
    //     const options = this.httpHelper.getCommonAuthHeaders();

    //     var params = new CheckAvailabilityApiObject(availabilitySearchOptons);

    //     if (this.data.userProfile.CustomerId) {
    //         params.CustomerId = this.data.userProfile.CustomerId;
    //     }

    //     console.log('Params: ' + JSON.stringify(params));

    //     const availabilities: Observable<AvailabilityViewModel[]> =
    //         <Observable<AvailabilityViewModel[]>>
    //         this.http.post(
    //             url, JSON.stringify(params), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return availabilities;
    // }

    // update(order: Order) {
    // }

    // uploadImage(remoteFullPath: string, localFullPath: string) {
    // }

    // private addDays(date: Date, days: number): Date {
    //     return new Date(date.getTime() + (days * (1000 * 60 * 60 * 24)));
    // }

    // getLocationData(): Subscription {
    //     console.log("Starting getLocationData()");
    //     this.authService.refreshToken();
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.lookupLocationsUrl;

    //     if (!this.data.locationData) {

    //         var loader = new LoadingIndicator();
    //         loader.show(this.loaderOptions);

    //         return this.http.get(url, options)
    //             .map((res: Response) => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false)
    //             })
    //             .subscribe((result: LocationModel[]) => {
    //                 console.log(`Retrieved ${result.length} location's data.`);
    //                 this.data.locationData = result;
    //                 this.data.locationStrings = this.data.locationData.map((location: LocationModel) => location.LocationName);

    //             },
    //                 (error: Error) => console.log("Error getting location data: " + error),
    //                 () => {
    //                     console.log("All location data received!");
    //                     loader.hide();
    //                 });
    //     }
    // }

    // getMarketData(): Subscription {
    //     console.log("Starting getMarketData()");
    //     this.authService.refreshToken();
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.lookupMarketsUrl;

    //     if (!this.data.marketData) {

    //         var loader = new LoadingIndicator();
    //         loader.show(this.loaderOptions);

    //         return this.http.get(url, options)
    //             .map((res: Response) => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false)
    //             })
    //             .subscribe((result) => {
    //                 console.log(`Retrieved ${result.length} market's data.`);
    //                 this.data.marketData = result;
    //                 this.data.marketStrings = this.data.marketData.map((market: Market) => market.LocationMarketDescription);
    //             },
    //                 (error: Error) => console.log("Error getting market data: " + error),
    //                 () => {
    //                     console.log("All market data received!");
    //                     loader.hide();
    //                 });
    //     }
    // }

    // getFilteredMarketData(customerId: number, customerClassCode: string): Observable<string[]> {
    //     this.authService.refreshToken();
    //     const url = Config.proxyUrl + Config.lookupFilteredMarketsUrl + "/" + customerId + "?customerClassCode=" + customerClassCode;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     this.authService.refreshToken();
    //     const filteredMarketData: Observable<string[]> =
    //         <Observable<string[]>>
    //         this.http.get(
    //             url, options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return filteredMarketData;
    // }

    // getCustomerData(): Subscription {
    //     console.log("Starting getCustomerData()");
    //     this.authService.refreshToken();
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.lookupCustomersUrl;

    //     if (!this.data.customerData) {

    //         var loader = new LoadingIndicator();
    //         loader.show(this.loaderOptions);

    //         return this.http.get(url, options)
    //             .map((res: Response) => res.json())
    //             .catch(err => {
    //                 this.handleErrors(err);
    //                 return Observable.of(false)
    //             })
    //             .subscribe((result: Customer[]) => {
    //                 console.log(`Retrieved ${result.length} customers' data.`);
    //                 this.data.customerData = result;
    //                 this.data.customerStrings = this.data.customerData.map((cust: Customer) => cust.CustomerName);
    //             },
    //                 (error: Error) => console.log("Error getting customer data: " + error),
    //                 () => {
    //                     console.log("All customer data received!");
    //                     loader.hide();

    //                 });
    //     }
    // }

    // submitCustomerBooking(submitPoolBookingData: SubmitBooking): Observable<ConfirmBooking> {
    //     console.log("Starting submitCustomerBooking()");

    //     this.authService.refreshToken();
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.customerBookingUrl;

    //     const confirmBookingOrderResult: Observable<ConfirmBooking> =
    //         <Observable<ConfirmBooking>>

    //         this.http.post(
    //             url,
    //             JSON.stringify(submitPoolBookingData), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on submitCustomerBooking(): " + err);
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return confirmBookingOrderResult;

    // }

    // getReuseLocations(customerClassCode: string, marketCode: string, customerId: number): Observable<ReusableChassisLocationData[]> {
    //     console.log("Starting getReuseLocations()");
    //     this.authService.refreshToken();
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.getReuseLocationsUrl;

    //     var params = {
    //         "CustomerClassCode": customerClassCode,
    //         "CustomerId": customerId,
    //         "MarketCode": marketCode,
    //         "Reuse": true
    //     };

    //     const locationData: Observable<ReusableChassisLocationData[]> =
    //         <Observable<ReusableChassisLocationData[]>>
    //         this.http.post(
    //             url,
    //             JSON.stringify(params), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on getReuseLocations(): " + err);
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return locationData;


    // }

    // validateReuseChassis(chassisId: string): Observable<ValidateChassisResponse> {
    //     console.log("Starting validateReuseChassis()");
    //     this.authService.refreshToken();
    //     var urlParamsString = `/${chassisId}`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.validateReuseChassisUrl + urlParamsString;

    //     var returnString = "";

    //     const validateResponse: Observable<ValidateChassisResponse> =
    //         <Observable<ValidateChassisResponse>>
    //         this.http.get(url, options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on validateReuseChassis(): " + err);
    //                 return Observable.of(false);
    //             });

    //     return validateResponse;

    // }

    // submitCustomerReuse(submitReuseData: SubmitReuse): Observable<number> {
    //     console.log("Starting submitCustomerReuse()");
    //     console.log(JSON.stringify(submitReuseData));
    //     this.authService.refreshToken();
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.reuseBookingUrl;

    //     const confirmedBookingOrderId: Observable<number> =
    //         <Observable<number>>

    //         this.http.post(
    //             url,
    //             JSON.stringify(submitReuseData), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on submitCustomerReuse(): " + err);
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return confirmedBookingOrderId;

    // }

    // getSubmittedCustomerReuseInfo(bookingOrderId: number): Observable<ConfirmReuse> {
    //     console.log(`Starting getSubmittedCustomerReuseInfo(${bookingOrderId})`);
    //     this.authService.refreshToken();
    //     var urlParamsString = `/${bookingOrderId}`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.reuseBookingUrl + urlParamsString;

    //     var returnString = "";

    //     const confirmReuseResponse: Observable<ConfirmReuse> =
    //         <Observable<ConfirmReuse>>
    //         this.http.get(url, options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on getSubmittedCustomerReuseInfo(): " + err);
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return confirmReuseResponse;
    // }

    // getEditBookingDetails(bookingOrderId: number): Observable<EditBookingResponse> {
    //     console.log(`Starting getEditBookingDetails(${bookingOrderId})`);
    //     this.authService.refreshToken();
    //     var urlParamsString = `/${bookingOrderId}`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.customerBookingUrl + urlParamsString;
    //     var getEditBookingData = this.data.editBookingRequestModel;


    //     const getEditBookingResponse: Observable<EditBookingResponse> =
    //         <Observable<EditBookingResponse>>
    //         this.http.get(url, options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on getEditBookingDetails(): " + err);
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return getEditBookingResponse;
    // }

    // updateBooking(bookingOrderId: number): Observable<EditBookingResponse> {
    //     console.log(`Starting getEditBookingDetails(${bookingOrderId})`);
    //     this.authService.refreshToken();
    //     var urlParamsString = `/${bookingOrderId}`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.customerBookingUrl + urlParamsString;
    //     var getEditBookingData = this.data.editBookingRequestModel;


    //     const updateBookingResponse: Observable<EditBookingResponse> =
    //         <Observable<EditBookingResponse>>
    //         this.http.put(url, JSON.stringify(getEditBookingData), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on getEditBookingDetails(): " + err);
    //                 this.handleErrors(err);
    //                 return Observable.of(false);
    //             });

    //     return updateBookingResponse;

    // }

    // submitEditBooking(): Observable<EditBookingResponse> {
    //     console.log(`Starting getEditBookingDetails(${this.data.submitEditBookingModel.BookingOrder.BookingOrderId})`);

    //     var urlParamsString = `/${this.data.submitEditBookingModel.BookingOrder.BookingOrderId}`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.customerBookingUrl + urlParamsString;
    //     var getEditBookingData = this.data.submitEditBookingModel;

    //     console.log(JSON.stringify(getEditBookingData));

    //     const updateBookingResponse: Observable<EditBookingResponse> =
    //         <Observable<EditBookingResponse>>
    //         this.http.put(url, JSON.stringify(getEditBookingData), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 console.log("Error on getEditBookingDetails(): " + err)
    //                 return Observable.of(false);
    //             });

    //     return updateBookingResponse;

    // }


    // cancelBooking(cancelBookingData: CancelBookingRequest): Observable<CancelBookingResponse> {
    //     console.log(`Starting cancelBooking()`);
    //     this.authService.refreshToken();
    //     var urlParamsString = `/cancel`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.customerBookingUrl + urlParamsString;


    //     const cancelBookingResponse: Observable<CancelBookingResponse> =
    //         <Observable<CancelBookingResponse>>
    //         this.http.put(url, JSON.stringify(cancelBookingData), options)
    //             .map(res => res.json())
    //             .catch(err => {
    //                 return Observable.of(false);
    //             });

    //     return cancelBookingResponse;
    // }

    // cancelReuse(cancelBookingData: CancelBookingRequest): Observable<ConfirmReuse> {
    //     console.log(`Starting cancelReuse()`);
    //     this.authService.refreshToken();
    //     var urlParamsString = `/cancel`;
    //     const options = this.httpHelper.getCommonAuthHeaders();
    //     const url = Config.proxyUrl + Config.reuseBookingUrl + urlParamsString;

    //     //Cancel the reuse\
    //     this.http.put(url, JSON.stringify(cancelBookingData), options);

    //     //Get reuse details
    //     var getReuseDetailsUrl = Config.proxyUrl + Config.reuseBookingUrl + "/" + cancelBookingData.BookingOrderId;
        
    //     const cancelBookingResponse: Observable<ConfirmReuse> =
    //         <Observable<ConfirmReuse>>
    //         this.http.get(getReuseDetailsUrl, options)
    //         .map(response => response.json())
    //         .catch(err => {                
    //             return Observable.of(false);
    //         });

    //     return cancelBookingResponse;
    // }


    // private handleErrors(error: Response): Observable<any> {
    //     console.log("Error Occured on request => " + error.status + ": " + error.statusText);
    //     if (error.status === 401) {
    //         this.authService.logout(true);
    //     }
    //     else {
    //         if(error.json().ModelState.ErrorMessage[0]){
    //             dialogs.alert(error.json().ModelState.ErrorMessage[0]);
    //         }            
    //     }
    //     return Observable.of(false);
    //     //return Observable.throw(error);
    // }

    ngOnDestroy() {
        // if (this.ordersSubscription) {
        //     this.ordersSubscription.unsubscribe();
        // }
    }
}
