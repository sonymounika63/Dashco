import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../components/ui/Checkbox";
import gridImage from "../assets/images/shape/grid-01.svg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formDataObj = new FormData(event.currentTarget);
    // Integration ready - variables prepared for API integration
    const _email = formDataObj.get("email");
    const _password = formDataObj.get("password");
    const _rememberMe = formDataObj.get("rememberMe") === "on";

    // TODO: Integration - Add your login API call here
    // const loginData = { email: _email, password: _password, rememberMe: _rememberMe };
    // Example: await loginAPI(loginData);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleRememberMeChange = useCallback((event) => {
    setRememberMe(event.target.checked);
  }, []);

  return (
    <div className="min-h-screen flex lg:flex-row flex-col dark:bg-gray-900">
      <div className="flex-1 flex flex-col p-0 bg-white dark:bg-gray-900">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-gray-400 no-underline text-sm mb-0 transition-colors duration-200 pl-6 sm:pl-8 pr-8 py-5 hover:text-slate-600 dark:hover:text-gray-300"
        >
          <i className="fa-solid fa-arrow-left text-base"></i>
          Back to dashboard
        </Link>

        <div className="max-w-[28rem] mx-auto w-full px-6 sm:px-8 pb-8">
          <h1 className="text-[36px] font-semibold leading-[44px] text-[#1d2939] dark:text-white/90 mb-2">
            Sign In
          </h1>
          <p className="text-sm text-[#667085] dark:text-gray-400 mb-0 mt-0 leading-5">
            Enter your email and password to sign in!
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 mb-0 mt-8 w-full">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 h-11 px-4 sm:px-7 py-3 rounded-lg bg-[#f2f4f7] dark:bg-white/5 text-[#344054] dark:text-white/90 text-sm font-normal border-none cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-800 leading-5"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                  fill="#34A853"
                />
                <path
                  d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                  fill="#EB4335"
                />
              </svg>
              <span className="whitespace-nowrap">Sign in with Google</span>
            </button>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 h-11 px-4 sm:px-7 py-3 rounded-lg bg-[#f2f4f7] dark:bg-white/5 text-[#344054] dark:text-white/90 text-sm font-normal border-none cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-800 leading-5"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="whitespace-nowrap">Sign in with Git</span>
            </button>
          </div>

          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 p-2 text-gray-400 sm:px-5 sm:py-2">
                Or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-0 mt-0">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#344054] dark:text-gray-400 mb-1.5 leading-5"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="info@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-[10px] text-sm h-11 rounded-lg border border-[#d0d5dd] dark:border-gray-700 text-[#1d2939] dark:text-white/90 placeholder:text-slate-400 dark:placeholder:text-white/30 transition-all duration-200 bg-white dark:bg-gray-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 leading-5"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#344054] dark:text-gray-400 mb-1.5 leading-5"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-[10px] pr-11 text-sm h-11 rounded-lg border border-[#d0d5dd] dark:border-gray-700 text-[#1d2939] dark:text-white/90 placeholder:text-slate-400 dark:placeholder:text-white/30 transition-all duration-200 bg-white dark:bg-gray-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 leading-5"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 text-slate-400 dark:text-gray-400 flex items-center justify-center"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye text-lg"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash text-lg"></i>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between mt-0 mb-3 w-full">
              <Checkbox
                id="remember-me"
                name="rememberMe"
                label="Keep me logged in"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                containerClassName="mb-0"
              />
              <Link
                to="/reset-password"
                className="text-sm font-normal text-[#465FFF] dark:text-[#465FFF] no-underline transition-colors duration-200 leading-5 hover:text-[#3641F5] flex-shrink-0"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-11 px-4 py-3 text-sm font-medium leading-5 rounded-lg bg-[#465FFF] hover:bg-[#3641F5] text-white inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-3 text-sm text-[#344054] dark:text-gray-400 leading-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-normal text-[#465FFF] dark:text-[#465FFF] no-underline transition-colors duration-200 hover:text-[#3641F5]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-0 bg-[#161950] dark:bg-white/5 relative overflow-hidden hidden lg:flex lg:w-1/2">
        <div className="absolute right-0 top-0 z-0 w-full max-w-[250px] xl:max-w-[450px] pointer-events-none">
          <img src={gridImage} alt="grid" className="w-full h-auto block" />
        </div>
        <div className="absolute bottom-0 left-0 z-0 w-full max-w-[250px] xl:max-w-[450px] rotate-180 pointer-events-none">
          <img src={gridImage} alt="grid" className="w-full h-auto block" />
        </div>
        <div className="relative z-[1] text-center text-white p-8">
          <div className="mb-6">
            <img
              src="/logo.png"
              alt="Logo"
              className="max-w-[120px] h-auto mx-auto block"
            />
          </div>
          <p className="text-base text-[#98A2B3] dark:text-white/60">
            Compliance & Workflow Automation Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
