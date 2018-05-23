export class OrderDetail{
  BookingNumber: string;
  CreateDate: Date;
  StatusCode: string;
  StatusDescription: string;
  LocationId: number;
  FromLocationId: number;
  ToLocationId: number;
  LocationName: string;
  FromLocationName: string;
  ToLocationName: string;
  EquipmentClass: any;
  EquipmentType: any;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  FromInventoryOrgCode: number;
  ToInventoryOrgCode: number;
  FromInventoryOrgName: string;
  ToInventoryOrgName: string;
  ContractNumber: number;
  ChassisCount: number;
  IsRedelivery: boolean;
}