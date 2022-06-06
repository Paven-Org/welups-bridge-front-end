/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import clsx from "clsx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface ConfirmationDialogProps {
  classes?: Record<"paper", string>;
  id?: string;
  value?: string;
  open: boolean;
  children?: React.ReactNode;
  title?: string;
  onSubmit?: (value?: string) => void;
  onCancel?: (value?: string) => void;
}

const ConfirmationModal: React.FunctionComponent<ConfirmationDialogProps> = ({
  onSubmit,
  value: valueProp,
  onCancel,
  open,
  classes,
  children,
  title,
  ...props
}: ConfirmationDialogProps) => {
  const handleCancel = () => {
    onCancel && onCancel();
  };

  const handleOk = () => {
    onSubmit && onSubmit(valueProp);
  };

  return (
    <Dialog
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      className={clsx(classes)}
      {...props}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {onCancel && (
          <Button type="button" onClick={handleCancel} color="primary">
            Cancel
          </Button>
        )}
        {onSubmit && (
          <Button type="button" onClick={handleOk} color="primary">
            Ok
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
