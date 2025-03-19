import { API } from "src/api";

// Import types
import type { VNRecordType } from "src/types/general";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export class BlogAPI {
  /**
   * Get statuses of tasks
   * @returns
   */
  static async getBlogTypes() {
    try {
      const response = await api.get<Array<VNRecordType>>(`/blogs/types`);
      return response.data;
    } catch (error) {
      console.error("BlogAPI - Get blogs' types:", error);
      return;
    }
  }
}
