export type BannerType = {
  _id: string;
  title: string;
  image: string;
  target: string;
  brand: {
    name: string;
    logoUrl: string;
    website: string;
  };
  isActive: boolean;
  startDate: number;
  endDate: number;
};

export type BannerFormType = {
  _id: string;
  title: string;
  image: string;
  deleteImage?: string;
  newImage?: File | null;
  target: string;
  brand: {
    name: string;
    logoUrl: string;
    website: string;
  };
  isActive: boolean;
  startDate: number;
  endDate: number;
};
