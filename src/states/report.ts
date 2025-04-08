import { create } from "zustand";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { ReportType } from "src/objects/report/types";
import type { VNRecordType } from "src/types/general";

type ReportState = {
  currentReport: ReportType | null;
  reports: Array<ReportType> | null;
  reportReasons: Array<VNRecordType> | null;
  reportStatuses: Array<VNRecordType> | null;
  isResponding: boolean;
};

type ReportActions = {
  // For report
  setCurrentReport(report: ReportType | null): void;
  setReports(reports: Array<ReportType> | null): void;
  setReportReasons(reportReasons: Array<VNRecordType> | null): void;
  setReportStatuses(reportStatuses: Array<VNRecordType> | null): void;
  addReports(reports: Array<ReportType> | null): void;
  addReport(report: ReportType): void;
  updateReport(report: ReportType): void;
  deteteReport(report: ReportType): void;
  updateIsResponding(status?: boolean): void;
  clearReports(): void;
};

/**
 * Use this function to delete a report from a list.
 * @param list
 * @param report
 */
function deleteReportFromList(
  list: Array<ReportType>,
  report: ReportType | string
) {
  let reportId;

  if (typeof report === "string") {
    reportId = report;
  } else {
    reportId = report._id;
  }

  // Find index
  const reportIndex = list.findIndex((report) => report._id === reportId);

  // Delete
  list.splice(reportIndex, 1);

  return list;
}

const initialState = {
  currentReport: null,
  reports: null,
  reportReasons: null,
  reportStatuses: null,
  isResponding: false,
};

export const useReportState = create<ReportState & ReportActions>((set) => {
  return {
    ...initialState,
    updateIsResponding(status?: boolean) {
      set((state) => ({ ...state, isResponding: Boolean(status) }));
    },

    setCurrentReport(report) {
      set((state) => {
        return { ...state, currentReport: report };
      });
    },

    setReports(reports) {
      set((state) => {
        return { ...state, reports };
      });
    },

    setReportReasons(reportReasons: Array<VNRecordType> | null) {
      set((state) => {
        return { ...state, reportReasons };
      });
    },

    setReportStatuses(reportStatuses: Array<VNRecordType> | null) {
      set((state) => {
        console.log("Report statuses:", reportStatuses);
        return { ...state, reportStatuses };
      });
    },

    addReports(reports) {
      set((state) => {
        if (!reports) return state;

        // Add reports to global reports
        if (state.reports) state.reports = state.reports.concat(reports);

        return {
          ...state,
          reports: state.reports,
        };
      });
    },

    addReport(report: ReportType) {
      set((state) => {
        if (!state.reports) state.reports = [];

        // Push to global reports
        state.reports.push(report);

        return { ...state, reports: state.reports };
      });
    },

    updateReport(report: ReportType) {
      set((state) => {
        if (!state.reports) return state;
        if (!report) return state;

        const oldReportIndex = state.reports.findIndex(
          (t) => t._id === report._id
        );
        OtherUtils.replaceAt(state.reports, oldReportIndex, report);

        return {
          ...state,
          reports: state.reports,
        };
      });
    },

    deteteReport(report: ReportType) {
      set((state) => {
        if (!state.reports) return state;

        // Delete from global store
        deleteReportFromList(state.reports, report);

        return {
          ...state,
          reports: state.reports,
        };
      });
    },

    clearReports() {
      set((state) => {
        return {
          ...state,
          ...initialState,
        };
      });
    },
  };
});
