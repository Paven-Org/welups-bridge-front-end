import { User } from "../../models/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { FieldContainer } from "@welups-bridge/ui";
import React, { useEffect, useState } from "react";
import { useGetUserRole, useUserMutation } from "./users.query";
import clsx from "clsx";
import { styles } from "./users.style";
import { Table } from "antd";

interface Props {
  user: User;
  className?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  isOpen: boolean;
  title?: string;
}

const columns = [
  {
    dataIndex: "role",
    title: "Role",
  },
];

const UserDetailsModal: React.FunctionComponent<Props> = ({
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

  const [userRoles, setUserRoles] = useState(undefined);
  const { mutateAsync, isSuccess, error, isError, status } = useUserMutation();

  const { isLoading, isFetching, data: urRoleData } = useGetUserRole(user);

  useEffect(() => {
    if (!urRoleData || !urRoleData.data) {
      return;
    }

    setUserRoles(
      urRoleData.data.map((ur: string) => {
        return {
          role: ur,
        };
      })
    );
  }, [urRoleData]);
  useEffect(() => {
    if (!user) {
      return;
    }

    setFieldValue("username", user.username);
    setFieldValue("email", user.email);
    setFieldValue("status", user.status);
  }, [user]);

  const useSubmitForm = async () => {
    const u: User = {
      email: values.email,
    };

    if (values.password && values.password.trim().length > 0) {
      u.password = values.password;
    }

    if (user && user.id && user.id > 0) {
      // Update User
      u.id = user.id;
      u.username = user.username;
      u.new_username = values.username;
    } else {
      u.username = values.username;
    }

    await mutateAsync(u, {
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
  const createUserSchema = yup.object({
    username: yup.string().trim().required("Username is required"),
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid"),
    password: yup.string().trim().required("Password is required"),
    // confirmPassword: yup
    //   .string()
    //   .oneOf(
    //     [yup.ref("password"), null],
    //     "Password and Confirm Password must match"
    //   ),
  });

  const updateUserSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and Confirm Password must match"
      ),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema:
      user && user.id && user.id > 0 ? updateUserSchema : createUserSchema,
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

  console.log("errors ", errors);
  console.log("touched ", touched);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {user && user.id && user.id > 0 ? "User Details" : "Create User"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FieldContainer>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    inputProps={{ tabIndex: 1 }}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </FieldContainer>
                <FieldContainer>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={values.email}
                    onBlur={formik.handleBlur}
                    inputProps={{ tabIndex: 2 }}
                    onChange={formik.handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </FieldContainer>
                {
                  <>
                    <FieldContainer>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        inputProps={{ tabIndex: 3 }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </FieldContainer>
                    <FieldContainer>
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={values.confirmPassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        inputProps={{ tabIndex: 4 }}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </FieldContainer>
                  </>
                }
              </Grid>
              {user && user.id && user.id > 0 && (
                <Grid item xs={12}>
                  <Table
                    rowKey={"role"}
                    columns={columns}
                    dataSource={userRoles}
                    loading={isLoading || isFetching}
                    size="middle"
                    rowClassName={clsx(styles.cursor)}
                  />
                </Grid>
              )}
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

export default UserDetailsModal;
