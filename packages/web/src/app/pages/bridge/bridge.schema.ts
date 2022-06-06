import * as yup from "yup";

export const withdrawValidationSchema = yup.object({
  eth_address: yup
    .string()
    .required("ETH Address is required")
    .matches(/^0x[a-fA-F0-9]{40}$/g, "Invalid ETH Address"),
  amount: yup.number().required("This field is required"),
});

export const depositValidationSchema = yup.object({
  wel_address: yup.string().required("WELUPS Address is required"),
  amount: yup
    .number()
    .min(1, "Must be more than 1 characters")
    .required("This field is required"),
});
