import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoginSchema } from "../yup/validation";
import { AuthLogin } from "../api/Auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { GenerateError } from "../toast/Toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await AuthLogin(values);
        if (response?.status === 200 && response.data) {
          dispatch(
            setCredentials({
              userId: response.data.user?._id,
              accessToken: response.data.accessToken,
              role: response.data.user?.userRole,
            })
          );
        } else {
          GenerateError(
            response?.data?.message || "Login failed. Please try again."
          );
        }
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const responseError = error as {
            response: { data: { message: string } };
          };
          GenerateError(responseError.response.data.message);
        } else {
          GenerateError("An unexpected error occurred");
        }
      }
    },
  });

  return (
    <div className="h-screen overflow-hidden bg-black text-white flex flex-col">
      <div className="flex flex-1 items-center justify-center container mx-auto px-3">
        <div className="flex-1 max-w-md bg-black border border-white p-8 rounded-[20px] shadow-lg flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <p className="mb-6 text-gray-300">Glad you're back!</p>
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="username" className="block text-sm mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  errors.username && touched.username
                    ? "border-red-500"
                    : "border-gray-600"
                } text-white`}
                placeholder="Enter your username"
              />
              {errors.username && touched.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 rounded-lg bg-gray-800 border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-600"
                  } text-white`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] rounded-lg text-lg font-semibold hover:opacity-90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
