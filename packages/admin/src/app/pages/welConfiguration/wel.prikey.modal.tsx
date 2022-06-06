import React from "react";
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
import { useAddWelAccount, useSetPrikey } from "./wel.query";
import { SetKeyReq, WelAccount } from "../../models/wel_account";

interface Props {
  className?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  isOpen: boolean;
  title?: string;
}

const WelPrikeyModal: React.FunctionComponent<Props> = ({
  className,
  isOpen,
  onClose,
  onSubmit,
  title,
}: Props) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const { mutateAsync } = useSetPrikey();

  const useSubmitForm = async () => {
    let wa: SetKeyReq = {
      authenticator_key: values.key,
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
    key: yup.string().required("Authenticator Key is required"),
  });

  const formik = useFormik({
    initialValues: {
      key: "",
    },
    validationSchema: schema,
    onSubmit: useSubmitForm,
  });

  const { values, errors, touched, handleSubmit } = formik;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>WELUP Set Prikey</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FieldContainer>
                  <TextField
                    fullWidth
                    id="key"
                    name="key"
                    label="Authenticator Key"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.key}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    inputProps={{ tabIndex: 1 }}
                    error={touched.key && Boolean(errors.key)}
                    helperText={touched.key && errors.key}
                  />
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

export default WelPrikeyModal;
