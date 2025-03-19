// Import types
import type { ReportType } from "src/objects/report/types";

export class ReportUtils {
  /**
   * Get report by its `id`
   * @param reports
   * @param id
   * @returns
   */
  static getReportById(reports: Array<ReportType> | null, id: string) {
    if (!reports) return null;
    return reports.find((report) => report._id === id);
  }

  /**
   * Get attribute in attributes list of report by `name`
   * @param attributes
   * @param name
   * @returns
   */
  static getReportAttributeByName(attributes: Array<any> | null, name: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.name === name);
  }

  /**
   * Get attribute in attributes list of report by `id`
   * @param attributes
   * @param name
   * @returns
   */
  static getReportAttributeById(attributes: Array<any> | null, id: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute._id === id);
  }

  /**
   * Get attribute in attributes list of report by `value`
   * @param attributes
   * @param name
   * @returns
   */
  static getReportAttributeByValue(
    attributes: Array<any> | null,
    value: string
  ) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.value === value);
  }

  /**
   * Get color by status
   * @param status
   * @returns
   */
  static getStatusColor(status: string) {
    let result = "";

    switch (status) {
      case "pending": {
        result = `border-yellow-700 bg-yellow-100`;
        break;
      }

      case "reviewed": {
        result = `border-blue-700 bg-blue-100`;
        break;
      }

      case "resolved": {
        result = `border-green-700 bg-green-100`;
        break;
      }
    }

    return result;
  }
}
