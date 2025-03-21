import { API } from "src/api";

// Import types
import type { BannerType } from "./types";
import type { VNRecordType } from "src/types/general";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export class BannerAPI {
  /**
   * Get statuses of tasks
   * @returns
   */
  static async getBanners(params?: Record<string, any>) {
    if (!params) params = {};
    if (!params.limit) params.limit = 10;
    if (!params.skip) params.skip = 0;

    try {
      const paramsStr = new URLSearchParams(params);
      const response = await api.get<Array<BannerType>>(
        `banners?${paramsStr}`,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Get banners:", error);
      return;
    }
  }

  /**
   * Create banner
   * @returns
   */
  static async createBanner(banner: FormData) {
    console.log("Banner:", banner);
    try {
      const response = await api.post<FormData, BannerType>(`banner`, banner, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("UserAPI - Create banner:", error);
      return;
    }
  }

  /**
   * Update banner
   * @returns
   */
  static async updateBanner(id: string, banner: FormData) {
    try {
      const response = await api.patch<FormData, BannerType>(
        `banners/${id}`,
        banner,
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("UserAPI - Create banner:", error);
      return;
    }
  }
}
