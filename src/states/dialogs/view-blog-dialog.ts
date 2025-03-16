import { create } from "zustand";

// Import types
import type { DialogState, DialogActions } from "./types";

export const useViewBlogDialogState = create<DialogState & DialogActions>(
  function (set) {
    return {
      isOpen: false,
      open() {
        set({
          isOpen: true,
        });
      },
      close() {
        set({
          isOpen: false,
        });
      },
    };
  }
);
