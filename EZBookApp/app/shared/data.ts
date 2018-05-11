import { Injectable } from '@angular/core';
import { UserClaims } from '~/data/user/user.claims.model';
import { UserProfile } from '~/data/user/user.profile.model';
import { DashboardBookingSearch } from '~/data/search/dashboard-search.model';
import { Market } from '~/data/market/market.model';
import { Customer } from '~/data/customer/customer.model';
import { EquipmentCategory } from '~/data/equipment/equipment-category.model';
// import { DashboardBookingSearch } from "../search/dashboard-order-search.model";
// import { EquipmentCategory } from './equipment/equipment-category.model';
// import { EquipmentService } from './equipment/equipment.service';
// import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
// import { LocationModel } from "../shared/locations/location.model";
// import { Market } from './markets/market.model';
// import { Customer } from '../orders/customer.model';
// import { UserClaims } from './user/user.claims.model';
// import { UserProfile } from './user/user.profile.model';
// import { CreateBooking } from './booking/create-booking.model';
// import { Availability } from './booking/availability.model';
// import { AvailabilityViewModel } from '../availability/availability.viewmodel';
// import { SubmitBooking } from './booking/submit-booking.model';
// import { SubmitBookingOrder } from './booking/submit-booking-order.model';
// import { ReuseSearch } from '../tabs/reuse/reuse-search.model';
// import { CheckAvailability } from './booking/check-availability.model';
// import { ReuseAvailabilityViewModel } from '../reusable-chassis/reuse-availability-view.model';
// import { SubmitReuse } from './reuse/submit-reuse.model';
// import { EditBookingRequest } from '../orders/order-detail-edit/edit-booking-request.model';
// import { EditBookingResponse } from '../orders/order-detail-edit/edit-booking-response.model';
// import { EditBookingReviewData } from './edit-booking/edit-booking-review-data.model';
// import { SubmitEditBookingRequest } from './edit-booking/submit-edit-booking-request.model';
// import { CancelBookingRequest } from './booking/cancel-booking-request.model';

@Injectable()
export class Data {

  public searchOptions: DashboardBookingSearch = new DashboardBookingSearch(true);

  // public availabilitySearchOptions: CheckAvailability = new CheckAvailability();

  // public reuseSearchOptions: CheckAvailability = new CheckAvailability();

  public equipmentCategories: EquipmentCategory[] = new Array<EquipmentCategory>();    

  public isFilteredSearch: boolean = false;

  public locationData: Location[];

  public locationStrings: string[] = new Array<string>();

  public marketData: Market[];

  public marketStrings: string[] = new Array<string>();

  public filteredMarketData: Market[];

  public filteredMarketStrings: string[] = new Array<string>();

  public customerData: Customer[];

  public customerStrings: string[] = new Array<string>();

  public userClaims: UserClaims = new UserClaims();

  public userProfile: UserProfile = new UserProfile();

  // public poolBookingUnits:AvailabilityViewModel[] = new Array<AvailabilityViewModel>();

  // public reuseBookingUnits: ReuseAvailabilityViewModel[] = new Array<ReuseAvailabilityViewModel>();

  // public submitCustomerBookingModel: SubmitBooking = new SubmitBooking();

  // public submitReuseBookingModel: SubmitReuse = new SubmitReuse();

  // public editBookingRequestModel: EditBookingRequest = new EditBookingRequest();

  // public reviewEditBookingData: EditBookingReviewData = new EditBookingReviewData();

  // public submitEditBookingModel: SubmitEditBookingRequest = new SubmitEditBookingRequest();

  // public cancelOrderData: CancelBookingRequest = new CancelBookingRequest();


  // public constructor(private equipmentService:EquipmentService) {
  //     this.equipmentService.getEquipmentCategories().subscribe((data: Array<EquipmentCategory>) => {
  //         console.log(JSON.stringify(data));
  //         this.equipmentCategories = data;
  //     }).unsubscribe();
  //  }
}