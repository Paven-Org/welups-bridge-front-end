import React from "react";
import { User } from "../../models/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { FieldContainer } from "@welups-bridge/ui";
import { useAddWelAccount } from "./wel.query";
import { WelAccount } from "../../models/wel_account";

interface Props {
  user: User;
  className?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  isOpen: boolean;
  title?: string;
}

const WelAccModal: React.FunctionComponent<Props> = ({
  user,
  className,
  isOpen,
  onClose,
  onSubmit,
  title,
}: Props) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const { mutateAsync } = useAddWelAccount();

  const useSubmitForm = async () => {
    let wa: WelAccount = {
      address: values.address,
      status: values.status,
    };

    await mutateAsync(wa, {
      onSuccess: (data, variables, context) => {
        onClose && onClose();
        onSubmit && onSubmit();
      },

      onError: (error, variables, context) => {
        // I will fire second!
        debugger;
      },
    });
  };

  const schema = yup.object({
    address: yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      status: "ok",
    },
    validationSchema: schema,
    onSubmit: useSubmitForm,
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    resetForm,
    handleBlur,
  } = formik;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {user && user.id && user.id > 0
            ? "WELUPS Account Details"
            : "Create WELUPS Account"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FieldContainer>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    inputProps={{ tabIndex: 1 }}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </FieldContainer>
                <FieldContainer>
                  <FormLabel
                    id="wel-account-status-group"
                    sx={{
                      color: "#ffffff",
                    }}
                  >
                    Status
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="wel-account-status-group"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="ok"
                      control={<Radio />}
                      label="Ok"
                    />
                    <FormControlLabel
                      value="locked"
                      control={<Radio />}
                      label="Locked"
                    />
                  </RadioGroup>
                </FieldContainer>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default WelAccModal;
