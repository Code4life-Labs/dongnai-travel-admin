// Import types
import type { VNRecordType } from "src/types/general";

export type PlaceModelType = {
  _id: string;
  typeIds: Array<string>;
  placeId: string;
  addressComponents: Array<any>;
  geometry: any;
  description: string;
  phoneNumber: string;
  name: string;
  plusCode: any;
  openHours: Array<any>;
  url: string;
  photos: Array<string>;
  website: string;
  isRecommended: boolean;
  createdAt: number;
  updatedAt: number;
};

export type PlaceType = Omit<PlaceModelType, "typeIds"> & {
  types: Array<VNRecordType>;
};
