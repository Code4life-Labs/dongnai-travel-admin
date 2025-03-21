import { API } from "src/api";

// Import objects
import { UserAPI } from "../user/api";

// Import types
import type { ReportType, ReportModelType } from "./types";
import type { VNRecordType } from "src/types/general";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export class ReportAPI {
  /**
   * Update status of object
   * @param status
   */
  static async updateReportStatus(id: string, status: VNRecordType) {
    try {
      const user = UserAPI.getLocalUser();
      const response = await api.patch<Partial<ReportModelType>, ReportType>(
        `/users/${user._id}/reports/${id}`,
        { statusId: status._id },
        {
          headers: {
            Authorization: API.generateBearerToken(API.getToken()) as string,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("ReportAPI - Get reports:", error);
      return;
    }
  }

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
