import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/data';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrderService } from '~/services/order.service';
import { ReuseAvailabilityViewModel } from '~/data/availability/reuse-availability.viewmodel';
import { SubmitReuse } from '~/data/reuse/submit-reuse.model';
import { ReusableChassisDetail } from '~/data/reuse/reusable-chassis-detail.model';
import { ReuseHeader } from '~/data/reuse/reuse-header.model';


@Component({
  selector: 'ReviewReuse',
  moduleId: module.id,
  templateUrl: './review-reuse.component.html',
  styleUrls: ['./review-reuse.component.scss'],
  providers: [OrderService]
})


export class ReviewReuseComponent implements OnInit {
  private totalRequestedChassis: number = 0;
  private requestedChassisCountMessage: string = "";
  private availableUnits: ReuseAvailabilityViewModel[] = this.data.reuseBookingUnits;
  private submitReuseModel: SubmitReuse = new SubmitReuse();
  private contactName: string;
  private confirmationEmail: string;
  private comments: string;

  constructor(private orderService: OrderService, private data: Data, private routerExtensions: RouterExtensions) {
    this.availableUnits.map(unit => {      
      this.totalRequestedChassis = this.availableUnits.length;
    });

    this.requestedChassisCountMessage = "You are requesting " + this.totalRequestedChassis + " chassis.";
  }

  ngOnInit() {

  }

  onOrderItemTap() { }

  onSubmitReviewReuse(): void {    
    
    this.availableUnits.map(unit => {
      let chassisDetail:ReusableChassisDetail = new ReusableChassisDetail();
      chassisDetail.Chassis = unit.ChassisId;      
      chassisDetail.LocationId = unit.LocationId;

      if(unit.EquipmentClass){
        chassisDetail.EquipmentClass = unit.EquipmentClass;
      }
      
      if(unit.EquipmentSize){
        chassisDetail.EquipmentSize = unit.EquipmentSize;
      }
      if(unit.InventoryOrgCode)
      {
        chassisDetail.InventoryOrgCode = unit.InventoryOrgCode;
      }

      this.submitReuseModel.ReuseChassisDetails.push(chassisDetail);
    });

     var reuseHeader = new ReuseHeader();

     reuseHeader.BillOfLading = this.data.reuseSearchOptions.BookingNumber;
     reuseHeader.MarketCode = this.data.reuseSearchOptions.MarketCode;
     reuseHeader.MotorCarrierId = this.data.reuseSearchOptions.MotorCarrierId;
     reuseHeader.RequestingPartyCode = this.data.userProfile.CustomerClass;
     reuseHeader.RequestingPartyId = this.data.userProfile.CustomerId;
     reuseHeader.ResponsiblePartyCode = this.data.reuseSearchOptions.ResponsiblePartyType;
     reuseHeader.ResponsiblePartyId = this.data.reuseSearchOptions.ResponsiblePartyId;
     reuseHeader.UsageType = this.data.reuseSearchOptions.ResponsiblePartyType;
     reuseHeader.Contact = this.contactName;
     reuseHeader.Email = this.confirmationEmail;
     reuseHeader.Comment = this.comments;

     this.submitReuseModel.ReuseHeader = reuseHeader;
    
    this.data.submitReuseBookingModel = this.submitReuseModel;


    const navigationExtras = {
      clearHistory: true,
      backStackVisible: false,
      animated: true,
      transition: {
        name: "slide",
        duration: 400,
        curve: "ease"
      }
    };

    this.routerExtensions.navigate(["/confirm-reuse"], navigationExtras);    
  }
}