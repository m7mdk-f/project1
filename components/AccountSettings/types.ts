import { LatLngExpression } from "leaflet";

export type Step = {
  number: number;
  label: string;
  content?: React.ReactNode;
};

export type QustionFormData = {
  storeName: string;
  storeDomain: string;
  entityType?: string;
};

export type FormData = {
  storeName: string;
  storeDomain: string;
  entityType:string,
  brandIdentity: string;
  shipmentLocation: string;
  shippingCompanies: string;
  paymentMethods: string;
  basketPackage: string;
  launchDate: string;
  categories?: string[];
  storeImage?: File | null;
  storeDescription?: string;
  selectIdPacket?:number,
};

export type FormErrors = Partial<Record<keyof FormData, string>>;


export type LocationSelectorProps = {
  position: LatLngExpression | null;
  setPosition: (pos: LatLngExpression) => void;
};
