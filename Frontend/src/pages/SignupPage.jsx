import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, CheckCircle } from "lucide-react";
import { useAuthStore } from '../authStore';
import { API_BASE_URL } from "../api/apiConfig";

// --- Reusable SVG Icons ---
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.94H12V14.28H17.96C17.67 15.63 17.03 16.8 16.14 17.48V20.2H19.83C21.66 18.57 22.56 15.69 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.45 22.04 19.28 20.2L16.14 17.48C15.15 18.14 13.67 18.57 12 18.57C9.31 18.57 6.99 16.81 6.09 14.39H2.38V17.21C4.18 20.79 7.8 23 12 23Z" fill="#34A853"/>
    <path d="M6.09 14.39C5.83 13.68 5.69 12.92 5.69 12.14C5.69 11.36 5.83 10.6 6.09 9.89V7.07H2.38C1.5 8.7 1 10.36 1 12.14C1 13.92 1.5 15.58 2.38 17.21L6.09 14.39Z" fill="#FBBC05"/>
    <path d="M12 5.43C13.43 5.43 14.67 5.9 15.6 6.78L18.42 4.14C16.63 2.52 14.47 1.5 12 1.5C7.8 1.5 4.18 3.71 2.38 7.07L6.09 9.89C6.99 7.47 9.31 5.43 12 5.43Z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7208 1.49805H1.6708V10.548H10.7208V1.49805Z" fill="#F25022"/>
    <path d="M21.3292 1.49805H12.2792V10.548H21.3292V1.49805Z" fill="#7FBA00"/>
    <path d="M10.7208 12.0498H1.6708V21.0998H10.7208V12.0498Z" fill="#00A4EF"/>
    <path d="M21.3292 12.0498H12.2792V21.0998H21.3292V12.0498Z" fill="#FFB900"/>
  </svg>
);

const SignupPage = () => {
  const navigate = useNavigate();
  
  // --- STORE SELECTORS (Prevent Loop) ---
  // Using atomic selectors to avoid "Maximum update depth exceeded"
  const loginWithToken = useAuthStore((state) => state.loginWithToken);
  
  // --- State ---
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Handle API Signup (Manual) ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const userData = {
      full_name: full_name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorMsg = `Error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.detail || errorMsg;
        } catch (jsonError) {
          // Silent catch
        }
        throw new Error(errorMsg);
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Google Signup (Same as Login) ---
  const handleGoogleSignup = () => {
    // Google OIDC works for both signup and login
    const backendUrl = `${API_BASE_URL}/api/auth/login/google`;
    window.open(backendUrl, "oauth-login", "width=500,height=600");
  };

  // --- Listen for Google Popup Response ---
  useEffect(() => {
    const handleAuthMessage = (event) => {
      const { token } = event.data;
      if (token) {
        const user = loginWithToken(token);
        if (user) {
          console.log("Google signup/login successful.");
          navigate("/app/dashboard", { replace: true });
        } else {
          setError("Failed to authenticate with Google.");
        }
      }
    };

    window.addEventListener("message", handleAuthMessage);
    return () => window.removeEventListener("message", handleAuthMessage);
  }, [loginWithToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-600 to-gray-900">
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-12 border border-white/20">
        
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              ProjectName
            </span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join us and start building today.
          </p>
        </div>

        {/* --- Signup Form --- */}
        <form onSubmit={handleSignup} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                value={full_name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                required
                minLength="5"
              />
            </div>
          </div>

          {/* --- Error and Success Message Display --- */}
          {error && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">{error}</p>}
          
          {success && (
            <p className="text-sm text-green-600 text-center bg-green-50 p-2 rounded">{success}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* --- Social Login Placeholder --- */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors bg-white"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors bg-white"
          >
            <MicrosoftIcon />
            <span>Microsoft</span>
          </button>
        </div>

        {/* --- Login Link --- */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignupPage;