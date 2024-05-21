import * as Yup from 'yup';


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  contact_no: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Contact number required"),
  address: Yup.string().required("Address is required"),

  // flat: Yup.string().required("House Name is required"),
  // place: Yup.string().required("Place/Location is required"),
  // pincode: Yup.string()
  //   .matches(/^\d{6}$/, "Pine code must be 6 digits")
  //   .required("Pin Code required"),
  //   phone_no: Yup.string()
  //   .matches(/^\d{10}$/, "Phone Number must be 10 digits")
  //   .required("Contact number required"),

});

export default validationSchema