import { useState } from "react";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { useFormik } from "formik";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GenerateError, GenerateSuccess } from "../../toast/Toast";
import { addProfile } from "../../api/Candidate";
import { ProfileSchema } from "../../yup/validation";
import { useNavigate } from "react-router-dom";

const AddProfile = () => {
  const [profileImage, setProfileImage] = useState<File | string | null>(null);
  const [resumeImage, setresumeImage] = useState<File | string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const useAxiosPrivate = UseAxiosPrivate();
  const navigate = useNavigate()

  const { errors, touched, resetForm, setFieldValue, handleSubmit } = useFormik(
    {
      initialValues: {
        profileImage: null,
        resumeImage: null,
      },
      validationSchema: ProfileSchema,
      onSubmit: async (values) => {
        try {
          setIsSubmitting(true);
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            const value = values[key as keyof typeof values];
            if (value) {
              formData.append(key, value);
            }
          });

          const response = await addProfile(useAxiosPrivate, formData);

          console.log(response);
          if (!response?.data.success) {
            GenerateError(response?.data.message);
          } else {
            resetForm();
            setProfileImage(null);
            setresumeImage(null);
            GenerateSuccess(response?.data?.message);
            navigate("/candidate")
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      },
    }
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setFieldValue(e.target.id, file);
    }
  };

  const handleCancel = () => {
    resetForm();
    setProfileImage(null);
    setresumeImage(null);
  };
  return (
    <div>
      <HeaderWithBackButton
        backLink="/candidate/"
        subtitle="Back to Profile"
        title="Add profile image and resume"
      />
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          <section className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Profile Image
            </h2>
            <div className="flex items-center justify-center h-56 border-dashed border-2 border-gray-300 rounded-lg">
              {profileImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={
                      profileImage instanceof File
                        ? URL.createObjectURL(profileImage)
                        : String(profileImage)
                    }
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute bottom-2 text-xs text-white underline bg-blue-600 px-3 py-2 rounded-md"
                    onClick={() => setProfileImage(null)}
                    disabled={isSubmitting}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer text-center text-gray-500 hover:text-gray-600"
                >
                  <input
                    type="file"
                    id="profileImage"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setProfileImage)}
                    disabled={isSubmitting}
                  />
                  <span className="block text-sm">Click to upload image</span>
                  <span className="block text-xs">
                    Supported: JPG, PNG, JPEG
                  </span>
                </label>
              )}
            </div>
            {errors.profileImage && touched.profileImage && (
              <p className="pt-2 text-xs italic text-red-500">
                {errors.profileImage}
              </p>
            )}
          </section>
          <section className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Resume
            </h2>
            <div className="flex items-center justify-center h-56 border-dashed border-2 border-gray-300 rounded-lg">
              {resumeImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {resumeImage instanceof File &&
                  resumeImage.type === "application/pdf" ? (
                    <iframe
                      src={URL.createObjectURL(resumeImage)}
                      title="Resume Preview"
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  ) : resumeImage instanceof File ? (
                    <img
                      src={URL.createObjectURL(resumeImage)}
                      alt="Resume Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-500">Unsupported file format</p>
                  )}
                  <button
                    type="button"
                    className="absolute bottom-2 text-xs text-white underline bg-blue-600 px-3 py-2 rounded-md"
                    onClick={() => setresumeImage(null)}
                    disabled={isSubmitting}
                  >
                    Change Resume
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="resumeImage"
                  className="cursor-pointer text-center text-gray-500 hover:text-gray-600"
                >
                  <input
                    type="file"
                    id="resumeImage"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleImageChange(e, setresumeImage)}
                    disabled={isSubmitting}
                  />
                  <span className="block text-sm">Click to upload resume</span>
                  <span className="block text-xs">
                    Supported: PDF
                  </span>
                </label>
              )}
            </div>
            {errors.resumeImage && touched.resumeImage && (
              <p className="pt-2 text-xs italic text-red-500">
                {errors.resumeImage}
              </p>
            )}
          </section>
        </div>
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
export default AddProfile;
