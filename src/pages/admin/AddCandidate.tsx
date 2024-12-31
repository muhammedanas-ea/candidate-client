import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import { CandidateSchema } from "../../yup/validation";
import { addCandidate } from "../../api/Admin";
import { GenerateError, GenerateSuccess } from "../../toast/Toast";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const useAxiosPrivate = UseAxiosPrivate();
  const navigate = useNavigate()
  const initialValues = {
    userName: "",
    mobileNumber: "",
    email: "",
    password: "",
    address: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: CandidateSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await addCandidate(useAxiosPrivate, values);
        console.log(response);
        if (!response?.data.success) {
          GenerateError(response?.data.message);
        } else {
          resetForm();
          GenerateSuccess(response?.data?.message);
          navigate("/admin")
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div>
      <HeaderWithBackButton
        backLink="/admin/"
        subtitle="Back to candidate list"
        title="Add Candidate"
      />
      <form onSubmit={handleSubmit}>
        <section className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Candidate Information
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.userName && errors.userName && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.userName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
               className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.mobileNumber && errors.mobileNumber && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.mobileNumber}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.email && errors.email && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
               className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.password && errors.password && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                className="w-full h-[7rem] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.address && errors.address && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.address}
                </p>
              )}
            </div>
          </div>
        </section>
        <div className="flex justify-end gap-4 mt-5">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCandidate;
