export class DashboardOrder{
  BookingOrderId: number;
  BookingOrderCode: string;
  BookingCount: number;
  MarketCode: string;
  MarketDescription: string;
  CreateDate: Date;
  EffectiveTo: Date;
  StatusCode: string;
  StatusDescription: string;
  ContractNumber?: any;
  BookingOrderTypeCode: string;
  CustomerId: number;
  RequestingPartyId: number;
  Customer: string;
  EquipmentSize: string;
  BookingOrderTypeDescription: string;
  UnitsRequestedCount: number;
  UnitsPickedCount: number;
  FromInventoryOrgCode?: any;
  ToInventoryOrgCode?: any;
  FromInventoryOrgName?: any;
  ToInventoryOrgName?: any;
  FromLocationId?: any;
  FromLocationName?: any;
  IsReUseBooking: boolean;
}