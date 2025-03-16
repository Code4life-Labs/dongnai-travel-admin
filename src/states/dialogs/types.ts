export type DialogState = {
  isOpen: boolean;
};

export type DialogActions = {
  open(): void;
  close(): void;
};
