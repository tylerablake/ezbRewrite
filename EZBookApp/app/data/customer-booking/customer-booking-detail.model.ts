export class CustomerBookingDetail {
  BookingDetailId: number;
  ChassisId: string;
  CreateDate: Date;
  UpdateDate: Date;
  CreateUser: string;
  UpdateUser: string;
  CustomerBookingId: number;
  AllowReuse: boolean;
  InventoryOrgCode?: string;
  EquipmentSize?: string;
}