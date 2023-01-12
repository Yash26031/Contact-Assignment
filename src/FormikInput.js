import { string, object } from "yup";

export const onSubmit = (data) => {
  console.log("On Submit Called", data);
};

export const validationSchema = object().shape({
  name: string().required("Name Required"),
  phone: string()
    .min(9, "Too Short")
    .max(10, "Too Long")
    .required("Phone Required"),
  //   type: string().required("Please Select Type"),
  image: string().url().required("URL Required"),
});
