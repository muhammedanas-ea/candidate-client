import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const CandidateSchema = Yup.object({
  userName: Yup.string().trim().required("name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().trim().required("address is required"),
  mobileNumber: Yup.string()
    .trim()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits and contain only numbers"
    )
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const ProfileSchema = Yup.object({
  profileImage: Yup.mixed<File>()
    .required("Profile image is required")
    .test("fileType", "Supported file format jpeg,png,jpg", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    })
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    }),
  resumeImage: Yup.mixed<File>()
    .required("Resume file is required")
    .test("fileType", "Supported file formats: pdf", (value) => {
      return (
        value &&
        [
          "application/pdf",
        ].includes(value.type)
      );
    })
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 10 * 1024 * 1024; // 10 MB limit
    }),
});
