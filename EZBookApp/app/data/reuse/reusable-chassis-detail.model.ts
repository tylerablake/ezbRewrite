export class ReusableChassisDetail{
  Chassis: string;
  LocationId: number;
  EquipmentSize: string;
  EquipmentClass: string;
  InventoryOrgCode: string;
  constructor(){
    this.EquipmentClass = "";
    this.EquipmentSize = "";
    this.InventoryOrgCode = "";
  }
}