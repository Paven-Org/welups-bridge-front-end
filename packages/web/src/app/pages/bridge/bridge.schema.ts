import * as yup from "yup";

export const validationSchema = yup.object({
  eth_address: yup.string().required("ETH Address is required"),
  amount: yup
    .number()
    .min(1, "Must be more than 10 characters")
    .required("This field is required"),
});
