import * as yup from "yup";

export const authorizeSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, { message: "Username is too short" })
    .max(40, { message: "Username is too long" })
    .required({ message: "Username is required" }),
  password: yup
    .string()
    .min(6, { message: "Password is too short" })
    .max(100, { message: "Password is too long" })
    .required({ message: "Password is required" }),
});
