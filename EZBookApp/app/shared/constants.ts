import { BookingStatus } from "~/data/booking-status/booking-status.model";
import { EquipmentCategory } from "~/data/equipment/equipment-category.model";
import { PartyType } from "~/data/party/party-type.model";


export const BookingStatusList: Array<BookingStatus> = Array(
  new BookingStatus("", "All"),
  new BookingStatus("OP", "Open"),
  new BookingStatus("CL", "Closed"),
  new BookingStatus("CN", "Cancelled"),
  new BookingStatus("FF", "Fulfilled"),
  new BookingStatus("EX", "Expired")
);

export const EquipmentCategoriesList : Array<EquipmentCategory> = Array(
  new EquipmentCategory("", ""),  
  new EquipmentCategory("Chassis.20", "20 Foot Chassis"),
  new EquipmentCategory("Chassis.40", "40 Foot Chassis"),
  new EquipmentCategory("Chassis.45", "45 Foot Chassis"),
  new EquipmentCategory("Chassis.48", "48 Foot Chassis"),  
  new EquipmentCategory("Chassis.53", "53 Foot Chassis"),
  new EquipmentCategory("Container.40", "40 Foot Container"),
  new EquipmentCategory("Container.53", "53 Foot Container"),  
  new EquipmentCategory("Trailer.45", "45 Foot Trailer")
)

export const PartyTypeList : Array<PartyType> = Array(
  new PartyType("",""),
  new PartyType("BCO","Beneficial Cargo Owner (BCO)"),
  new PartyType("MC", "Motor Carrier"),
  new PartyType("STEAMSHIP","Steamship")
)