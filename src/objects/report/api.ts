import { API } from "src/api";

// Import types
import type { ReportType } from "./types";
import type { VNRecordType } from "src/types/general";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export class ReportAPI {
  /**
   * Get reports
   * @returns
   */
  static async getReports() {
    try {
      const response = await api.get<Array<ReportType>>(`/reports`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      console.error("ReportAPI - Get reports:", error);
      return;
    }
  }

  /**
   * Get statuses of report
   * @returns
   */
  static async getReportStatuses() {
    try {
      const response = await api.get<Array<VNRecordType>>(`/reports/statuses`);
      return response.data;
    } catch (error) {
      console.error("ReportAPI - Get reports' statuses:", error);
      return;
    }
  }

  /**
   * Get reasons of report
   * @returns
   */
  static async getReportReasons() {
    try {
      const response = await api.get<Array<VNRecordType>>(`/reports/reasons`);
      return response.data;
    } catch (error) {
      console.error("ReportAPI - Get reports' reasons:", error);
      return;
    }
  }
}
