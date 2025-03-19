// Import types
import type { UserType } from "../user/types";
import type { BlogType } from "../blog/types";
import type { PlaceType } from "../place/types";
import type { VNRecordType } from "src/types/general";

export type ReportModelType = {
  _id?: string;
  reporterId: string;
  userId?: string;
  placeId?: string;
  blogId?: string;
  reasonId: string;
  statusId: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
};

export type ReportType = Omit<
  ReportModelType,
  "reporterId" | "userId" | "placeId" | "blogId" | "reasonId" | "statusId"
> & {
  reporter: UserType;
  user: UserType;
  place: PlaceType;
  blog: BlogType;
  reason: VNRecordType;
  status: VNRecordType;
};
