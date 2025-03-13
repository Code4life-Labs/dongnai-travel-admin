// Import types
import type { RoleModelType } from "../auth/types";

export type UserModelType = {
  _id?: string;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  hashedPassword?: string;
  displayName: string;
  birthday: number;
  avatar: string;
  coverPhoto: string;
  isVerified: boolean;
  createdAt?: number;
  updatedAt?: number;
};

export type UserType = Omit<UserModelType, "hashedPassword" | "roleId"> & {
  role: RoleModelType;
};

export type SignInUserType = {
  username: string;
  password: string;
};

export type SignUpUserType = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: number;
  username: string;
  password: string;
  confirmedPassword: string;
};

export type AuthenticationDataType = {
  user: UserType;
  token: string;
};
