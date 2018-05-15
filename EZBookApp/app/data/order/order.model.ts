export class Order {
    FromInventoryOrgCode: string;
    ToInventoryOrgCode: string;
    FromInventoryOrgName: string;
    ToInventoryOrgName: string;
    FromLocationId: number | null;
    FromLocationName: string;
    public MarketDescription: string;
    public EquipmentSize: string;
    public BookingOrderTypeCode: string;
    public CustomerId: number;
    public Customer: string;
    public UnitsRequestedCount: number;
    public EffectiveTo: string;
    public IsReUseBooking: boolean;
    public UnitsPickedCount: number;
    public ContractNumber: string;
    constructor(public BookingOrderId: number,
        public BookingOrderCode: string,
        public MarketCode: string,
        public StatusDescription: string,
        public StatusCode: string,
        public CreateDate: string,
        public BookingOrderTypeDescription: string
    ) {    
     }
  }