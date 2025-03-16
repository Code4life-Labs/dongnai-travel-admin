// Import types
import type { VNRecordType } from "src/types/general";

type AddressComponent = {
  longName: string;
  shortName: string;
  types: string[];
};

type Viewport = {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
};

export type PlaceModelType = {
  _id: string;
  typeIds: Array<string>;
  placeId: string;
  addressComponents: Array<AddressComponent>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: Viewport;
  };
  description?: string;
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
  totalFavorites: number;
  totalVisits: number;
  totalReviews: number;
  rating: number;
  isLiked: boolean;
  isVisited: boolean;
};

export type PlaceFormType = {
  _id?: string;
  name: string;
  url: string;
  placeId: string;
  isRecommended: boolean;
  description: string;
  photos: string[];
  newPhotos?: File[];
  deletePhotos?: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: Viewport;
  };
  addressComponents: AddressComponent[];
  types: any[];
};
