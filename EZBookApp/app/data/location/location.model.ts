export class LocationModel{
  LocationId: number;
  LocationCode: number;
  LocationName: string;
  LocationStreet1: string;
  LocationStreet2?: string;
  LocationStreet3?: string;
  LocationCity: string;
  LocationStateProvince: string;
  LocationZipCode: number;
  LocationCountry: string;
  CountryName: string;
  Timezone: string;
  LocationTypeCode: string;
  LocationTypeDescription: string;
  Latitude: number;
  Longitude: number;
  LocationRegionCode: string;
  LocationSubregionCode: string;
  LocationMarketCode: string;
  LocationRegionDescription: string;
  LocationSubregionDescription: string;
  LocationMarketDescription: string;
  LocationOperationModeBehavor?: string;
  LocationOperationModeDesc?: string;
  LocationEmail: string;
  OperatingHours: string;
  NotificationType: string;
  constructor(){}
}