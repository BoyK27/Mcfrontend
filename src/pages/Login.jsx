import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { shopContext } from "../context/shopContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import SEO from "../components/SEO";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(shopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* Function submission */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-12 overflow-hidden">
      <SEO
        title="Marine Box | Buy Containers, Shipping"
        description="Marine Box is your trusted online destination for high-quality containers world wide. Shop dry storage, refrigerated reefers, and custom conversions with secure payments and fast delivery."
        keywords="Marine Box, online shopping,"
        url="https://www.marine-box.com"
      />
      <motion.form
        layout
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full max-w-md m-auto gap-5 bg-white border border-slate-100/80 shadow-2xl rounded-2xl p-8 sm:p-10"
      >
        {/* Dynamic Title Header */}
        <motion.div layout className="flex flex-col items-center gap-2 mb-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentState}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="prata-regular text-3xl font-light tracking-tight text-slate-800"
            >
              {currentState}
            </motion.p>
          </AnimatePresence>
          <motion.hr
            layoutId="underline"
            className="border-none h-[3px] w-12 bg-teal-500 rounded-full"
          />
        </motion.div>

        {/* Dynamic Field: Full Name (Only on Sign Up) */}
        <AnimatePresence initial={false}>
          {currentState === "Sign Up" && (
            <motion.div
              key="name-field"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden"
            >
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full px-4 py-3 border border-slate-200/80 rounded-xl bg-slate-50/50 hover:bg-slate-50/20 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 font-medium"
                placeholder="Full Name"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Field */}
        <motion.div layout className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-3 border border-slate-200/80 rounded-xl bg-slate-50/50 hover:bg-slate-50/20 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 font-medium"
            placeholder="Email Address"
            required
          />
        </motion.div>

        {/* Password Field with Eye Toggle */}
        <motion.div layout className="w-full relative flex items-center">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            className="w-full pl-4 pr-11 py-3 border border-slate-200/80 rounded-xl bg-slate-50/50 hover:bg-slate-50/20 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 font-medium"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <HiOutlineEyeOff className="w-5 h-5" />
            ) : (
              <HiOutlineEye className="w-5 h-5" />
            )}
          </button>
        </motion.div>

        {/* Navigation Helpers */}
        <motion.div
          layout
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 mt-1"
        >
          <p className="cursor-pointer hover:text-teal-600 transition-colors duration-150">
            Forgot your password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-teal-600 hover:text-teal-700 hover:underline transition-all duration-150"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer text-teal-600 hover:text-teal-700 hover:underline transition-all duration-150"
            >
              Login Here
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          layout
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold mt-4 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;
