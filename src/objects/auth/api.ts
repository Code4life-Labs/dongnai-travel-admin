import { toast } from "react-toastify";

import { API } from "src/api";

// Import types
import type {
  SignInUserType,
  SignUpUserType,
  AuthenticationDataType,
} from "../user/types";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// Add global hook to api
api.hook("response", undefined, function (error) {
  console.log("Error:", error);
  const message = error?.response.data
    ? error?.response.data.error.message
    : error?.message;
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
  });
  return Promise.reject(error);
});

export class AuthAPI {
  /**
   * Use to sign in a user
   * @param data
   * @returns
   */
  static async signIn(data: SignInUserType | { token: string }) {
    try {
      const response = await api.post<
        SignInUserType | { token: string },
        AuthenticationDataType
      >("/auth/sign-in", data);
      return response.data;
    } catch (error) {
      console.error("AuthAPI - Sign in:", error);
      return;
    }
  }

  /**
   * Use to sign up a user
   * @param data
   * @returns
   */
  static async signUp(data: SignUpUserType) {
    try {
      const response = await api.post<SignUpUserType, AuthenticationDataType>(
        "/auth/sign-up",
        data
      );
      return response.data;
    } catch (error) {
      console.error("AuthAPI - Sign up:", error);
      return;
    }
  }
}
