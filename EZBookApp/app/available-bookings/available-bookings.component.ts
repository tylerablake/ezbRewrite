import { Component, OnInit } from '@angular/core';
import { ListPicker } from "ui/list-picker";
import { Data } from '../shared/data';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrderService } from '~/services/order.service';
import { Availability } from '~/data/availability/availability.model';
import { HelperService } from '~/services/helper.service';

@Component({
  selector: 'Availability',
  moduleId: module.id,
  templateUrl: './available-bookings.component.html',
  styleUrls: ['./available-bookings.component.scss'],
  providers: [OrderService]
})

export class AvailableBookingsComponent implements OnInit {
  private availableChassisCount: number = 0;
  private isLoading: boolean;
  private availableUnits: Availability[];
  private totalRequestedQuantity: number = 0;
  constructor(private helperService: HelperService, private orderService: OrderService, private data: Data, private routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.isLoading = true;
    this.orderService.checkAvailability(this.data.availabilitySearchOptions).subscribe((data: Availability[]) => {
      if (data) {
        this.availableUnits = data;
        this.availableChassisCount = this.availableUnits.length;
        this.availableUnits.map(unit => unit.RequestedQuantity = 0);
      }
    }, (error: Error) => {
      console.log("Unable to retrieve chassis availabilities");
    }, () => {
      this.isLoading = false;
    });
  }

  incrementQuantity(locationName: string, inventoryOrgDescription: string, equipmentClass: string): void {
    var unitToIncrement = this.availableUnits.filter(unit => unit.LocationName == locationName && unit.InventoryOrgDesc == inventoryOrgDescription && unit.EquipmentClass == equipmentClass)[0];

    unitToIncrement.RequestedQuantity++;
    this.totalRequestedQuantity++;
  }

  decrementQuantity(locationName: string, inventoryOrgDescription: string, equipmentClass: string): void {
    var unitToDecrement = this.availableUnits.filter(unit => unit.LocationName == locationName && unit.InventoryOrgDesc == inventoryOrgDescription && unit.EquipmentClass == equipmentClass)[0];

    if (unitToDecrement.RequestedQuantity <= 0) {
      return;
    }
    unitToDecrement.RequestedQuantity--;
    this.totalRequestedQuantity--;
  }

  getChassisEquipmentString(equipmentSize: string, equipmentClass:string = null):string{
    return this.helperService.getChassisEquipmentString(equipmentClass, equipmentClass);  
};

  onOrderItemTap() { }

  onSubmitAvailableUnits(): void {
    this.data.poolBookingUnits = this.availableUnits.filter(unit => unit.RequestedQuantity > 0);

    this.routerExtensions.navigate(["/review-booking"],
      {
        animated: true,
        transition: {
          name: "slide",
          duration: 400,
          curve: "ease"
        }
      });

  }

}