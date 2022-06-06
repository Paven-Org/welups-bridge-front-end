import {
  FieldContainer,
  BridgeTextField,
  BridgeButton,
} from "@welups-bridge/ui";
import { Box, Grid, Container } from "@mui/material";
import { styles } from "./index.styles";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoginUser } from "../../models/user";
import useAuth from "app/hooks/useAuth";

const validationSchema = yup.object({
  username: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

const Index: React.FC = () => {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: LoginUser) => {
      login(values);
    },
  });

  return (
    <Container maxWidth="sm" sx={styles.loginContainer}>
      <Grid sx={[{ flexGrow: 1 }, styles.container]} container spacing={2}>
        <Grid item xs={12}>
          <Box sx={styles.title} display="flex" justifyContent="center">
            Login to Welups bridge system
          </Box>
          <Box sx={styles.subTitle} display="flex" justifyContent="center">
            Enter username and password to login.
          </Box>
        </Grid>
        <Grid item xs={12} sx={styles.mt24}>
          <form onSubmit={formik.handleSubmit}>
            <FieldContainer>
              <BridgeTextField
                id="username"
                name="username"
                label="Username/Email"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </FieldContainer>
            <FieldContainer>
              <BridgeTextField
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FieldContainer>
            <FieldContainer>
              <BridgeButton fullWidth type="submit">
                Login
              </BridgeButton>
            </FieldContainer>
            <Box
              sx={[styles.forgot, styles.mt40]}
              display="flex"
              justifyContent="center"
            >
              Forgot Password ?
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
