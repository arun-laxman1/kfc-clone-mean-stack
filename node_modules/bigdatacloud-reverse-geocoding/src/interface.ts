export interface IReverseGeocode {
  api?: string;
  endpoint?: string;
  language?: string;
  format?: string;
}

export interface ILocation {
  lat: number;
  long: number;
}

export interface ILocalityProperty {
  order: number;
  adminLevel?: number;
  name: string;
  description: string;
  wikidataId?: string;
  isoName: string;
  isoCode: string;
}

export interface ILocalityInfo {
  administrative?: ILocalityProperty[];
  informative?: ILocalityProperty[];
}

export interface IGeocode {
  latitude: number;
  longitude: number;
  localityLanguageRequested: string;
  countryName?: string;
  countryCode?: string;
  principalSubdivision?: string;
  locality: string;
  postcode?: string;
  localityInfo: ILocalityInfo;
}
