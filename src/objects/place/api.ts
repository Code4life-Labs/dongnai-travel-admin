import { API } from "src/api";

// Import types
import type { VNRecordType } from "src/types/general";

const api = new API({
  baseURL: import.meta.env.VITE_TASK_API_ENDPOINT,
});

export class PlaceAPI {
  /**
   * Get statuses of tasks
   * @returns
   */
  static async getPlaceTypes() {
    try {
      const response = await api.get<Array<VNRecordType>>(`/places/types`);
      return response.data;
    } catch (error) {
      console.error("PlaceAPI - Get places' types:", error);
      return;
    }
  }
}
