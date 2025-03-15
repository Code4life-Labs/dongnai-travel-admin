import { API } from "src/api";

// Import utils
import { BrowserStorageUtils } from "src/utils/browser_storage";

// Import types
import type { UserType } from "./types";
import type { PlaceType, PlaceModelType } from "../place/types";
import type { BlogType, BlogModelType } from "../blog/types";

type UpdateBlogType = {
  blog: Partial<BlogModelType>;
};

type CreateBlogType = {
  blog: BlogModelType;
};

type UpdatePlaceType = {
  place: Partial<PlaceModelType>;
};

type CreatePlaceType = {
  place: PlaceModelType;
};

const api = new API({
  baseURL: import.meta.env.VITE_TASK_API_ENDPOINT,
});

export class UserAPI {
  static getLocalUser() {
    const user = BrowserStorageUtils.getItem("user") as UserType;
    if (!user) throw new Error("User isn't found in local storage");
    return user;
  }

  /**
   * Use to get a user from identity service
   * @returns
   */
  static async getUser() {
    try {
      const user = UserAPI.getLocalUser();
      const response = await api.get<UserType>(`/users/${user._id}`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      return;
    }
  }

  /**
   * Get blogs of a user
   * @returns
   */
  static async getBlogs(params?: Record<string, any>) {
    if (!params) params = {};
    if (!params.limit) params.limit = 10;
    if (!params.skip) params.skip = 0;

    try {
      const paramsStr = new URLSearchParams(params);
      const response = await api.get<Array<BlogType>>(`blogs?${paramsStr}`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("UserAPI - Get blogs:", error);
      return;
    }
  }

  /**
   * Get a blog of user by its id
   * @param blogId
   * @returns
   */
  static async getBlog(blogId: string | number) {
    try {
      const response = await api.get<BlogType>(`blogs/${blogId}`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("UserAPI - Get blog:", error);
      return;
    }
  }

  /**
   * Create a new blog for user
   * @param blog
   * @returns
   */
  static async createBlog(blog: Partial<BlogModelType>) {
    try {
      const user = UserAPI.getLocalUser();
      const response = await api.post<Partial<BlogModelType>, BlogType>(
        `/users/${user._id}/blog`,
        blog,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Create blog:", error);
      return;
    }
  }

  /**
   * Update a blog of user
   * @param id
   * @param blog
   * @returns
   */
  static async updateBlog(id: string, blog: Partial<BlogModelType>) {
    try {
      const user = UserAPI.getLocalUser();
      const response = await api.patch<Partial<BlogModelType>, BlogType>(
        `/users/${user._id}/blogs/${id}`,
        blog,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Update blog:", error);
      return;
    }
  }

  /**
   * Delete a blog of user
   * @param blogId
   * @returns
   */
  static async deleteBlog(blogId: string) {
    try {
      const user = UserAPI.getLocalUser();
      const response = await api.delete<BlogType>(
        `/users/${user._id}/blogs/${blogId}`,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Delete blog:", error);
      return;
    }
  }

  /**
   * Get places of a user
   * @returns
   */
  static async getPlaces(params?: Record<string, any>) {
    if (!params) params = {};
    if (!params.limit) params.limit = 10;
    if (!params.skip) params.skip = 0;

    try {
      const paramsStr = new URLSearchParams(params);
      const response = await api.get<Array<PlaceType>>(`places?${paramsStr}`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("UserAPI - Get places:", error);
      return;
    }
  }

  /**
   * Get a place of user by its id
   * @param placeId
   * @returns
   */
  static async getPlace(placeId: string | number) {
    try {
      const response = await api.get<PlaceType>(`places/${placeId}`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("UserAPI - Get place:", error);
      return;
    }
  }

  /**
   * Create a new place for user
   * @param place
   * @returns
   */
  static async createPlace(place: FormData) {
    try {
      const response = await api.post<FormData, PlaceType>(`/place`, place, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("UserAPI - Create place:", error);
      return;
    }
  }

  /**
   * Update a place of user
   * @param id
   * @param place
   * @returns
   */
  static async updatePlace(id: string, place: FormData) {
    try {
      const response = await api.patch<FormData, PlaceType>(
        `/places/${id}`,
        place,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Update place:", error);
      return;
    }
  }

  /**
   * Delete a place of user
   * @param placeId
   * @returns
   */
  static async deletePlace(placeId: string) {
    try {
      const user = UserAPI.getLocalUser();
      const response = await api.delete<PlaceType>(
        `/users/${user._id}/places/${placeId}`,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Delete place:", error);
      return;
    }
  }
}
