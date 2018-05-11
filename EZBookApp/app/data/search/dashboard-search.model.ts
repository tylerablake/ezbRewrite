export class DashboardBookingSearch {
    public DateFrom: Date;
    public DateTo: Date;
    public StartRecordNumber: number;
    public PageSize: number;
    public SortBy?: string;
    public OrderNumber?: string;
    public BookingNumber?: string;
    public MarketCode?: string;
    public BookingStatusCode?: string;
    public BookingOrderTypeCode?: string;
    public EquipmentSize?: string;
    public LocationId?: string;
    public CustomerId?: string;
    public IsReUse?: boolean;
    public IsMobile: boolean;
    public ContractNumber?: string;    

    constructor(isSearch: boolean) {
        this.IsMobile = true;
        
        this.DateTo = new Date();                
        this.DateFrom = new Date();                
        this.BookingStatusCode = "";                   
        this.OrderNumber = "";
        this.BookingNumber = "";
        this.MarketCode  = "";
        this.LocationId = "";
        this.CustomerId = "";
        this.EquipmentSize = "";        
    }

    private addDays(date: Date, days: number): Date {
        return new Date(date.getTime() + (days * (1000 * 60 * 60 * 24)));
    }

}
