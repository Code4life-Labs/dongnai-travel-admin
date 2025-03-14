// Import types
import type { UserType } from "../user/types";
import type { PlaceType } from "../place/types";
import type { VNRecordType } from "src/types/general";

export type BlogModelType = {
  _id: string;
  authorId: string;
  typeId: string;
  mentionedPlaceIds: Array<string>;
  name: string;
  content: string;
  coverImage: string;
  images: Array<string>;
  readTime: number;
  isApproved: boolean;
  createdAt: number;
  updatedAt: number;
};

export type BlogType = Omit<
  BlogModelType,
  "typeId" | "mentionedPlaceIds" | "authorId"
> & {
  type: VNRecordType;
  author: Partial<UserType>;
  mentionedPlaces: Array<Partial<PlaceType>>;
  comments?: Array<any>;
  isLiked: boolean;
  totalComments: number;
  totalFavorites: number;
};

export type BlogStatusType = {
  _id?: string;
  order: number;
  name: string;
  value: string;
  createdAt: number;
  updatedAt: number;
};
