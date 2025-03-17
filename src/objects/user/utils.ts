// Import types
import type { UserType } from "./types";

export class UserUtils {
  /**
   * Use to get full name of a user by his/her first name and full name
   * @param user
   * @returns
   */
  static getFullName(user: UserType | null) {
    if (!user) return "App user";
    return user.firstName.trim() + " " + user.lastName.trim();
  }

  /**
   * Get color by status
   * @param status
   * @returns
   */
  static getStatusColor(status: boolean) {
    let result = "";
    let value = status === true ? "verified" : "unverified";

    switch (value) {
      case "unverified": {
        result = `border-red-700 bg-red-100`;
        break;
      }

      case "verified": {
        result = `border-green-700 bg-green-100`;
        break;
      }
    }

    return result;
  }
}
