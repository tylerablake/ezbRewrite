import { Injectable } from '@angular/core';
import { Config } from '~/shared/config';
import { isAndroid } from 'tns-core-modules/platform/platform';
import { Data } from '~/shared/data';

@Injectable()
export class HelperService {

  constructor(private data:Data) { }

  getStatusDescriptionColor(statusDescription: string): string {
    if (!statusDescription) {
      return "white";
    }

    if (statusDescription === "Fulfilled") {
      return "green";
    }

    if (statusDescription === "Cancelled") {
      return "red";
    }

    if (statusDescription === "Closed") {
      return "gray";
    }

    if (statusDescription === "Expired") {
      return "#F59517";
    }

    return Config.tracBlueHex;
  }

  getAvailableChassisButtonColor(isChassisSelected: boolean) {
    if (isAndroid) {
      if (isChassisSelected) {
        return "res://semitruckblue";
      }
      else {
        return "res://semitruck";
      }
    }
    else {
      if (isChassisSelected) {
        return "res://semiTruckBlue.png";
      }
      else {
        return "res://semiTruck.png";
      }
    }
  }

  getChassisEquipmentString(equipmentSize: string, equipmentClass: string = ""): string {
    if (!equipmentSize) {
      return " ";
    }
    var size = equipmentSize.slice(-2);

    var dotIndex = equipmentSize.indexOf('.');

    var classString = equipmentSize.substring(0, dotIndex);

    return size + "` " + classString;
  };

  getLocationOperatingHours(locationId: number){
    var location = this.data.locationData.filter(loc => loc.LocationId === locationId)[0];

    if(location){
      return location.OperatingHours;
    }

  }


  addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + (days * (1000 * 60 * 60 * 24)));
  }
}