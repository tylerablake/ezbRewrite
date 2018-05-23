import { Injectable } from '@angular/core';
import { Config } from '~/shared/config';

@Injectable()
export class HelperService {

  constructor() { }

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

  getChassisEquipmentString(equipmentSize: string, equipmentClass: string = ""): string {
    if (!equipmentSize) {
      return " ";
    }
    var size = equipmentSize.slice(-2);

    var dotIndex = equipmentSize.indexOf('.');

    var classString = equipmentSize.substring(0, dotIndex);

    return size + "` " + classString;

  };


  addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + (days * (1000 * 60 * 60 * 24)));
  }
}