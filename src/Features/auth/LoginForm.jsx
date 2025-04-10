import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/Slices/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Ui/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // Redirect based on user role
  useEffect(() => {
    if (!isAuthenticated) return;

    const redirectPath = userData?.role === "admin" ? "/dashboard" : "/";
    const welcomeMessage =
      userData?.role === "admin" ? "Welcome back, Admin!" : "Login successful!";

    toast.success(welcomeMessage, { position: "bottom-right" });
    navigate(redirectPath);
  }, [isAuthenticated, userData, navigate]);

  const onSubmit = async ({ userEmail, password }) => {
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await dispatch(loginUser({ userEmail, password })).unwrap();
    } catch (error) {
      const errorMsg = getAuthErrorMessage(error.code);
      toast.error(errorMsg, { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAuthErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/user-not-found": "User not found. Please check your email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/too-many-requests":
        "Account temporarily disabled due to too many failed attempts.",
      default: "An unexpected error occurred. Please try again later.",
    };
    return errorMessages[errorCode] || errorMessages.default;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("userEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.userEmail ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.userEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.userEmail.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isSubmitting ? <LoadingSpinner size="small" /> : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
