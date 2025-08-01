import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = 'http://172.24.3.162:3000';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const highlights = ["perfect", "amazing", "tasty"];

  useEffect(() => {
    const interval = setInterval(() => setHighlightIndex(prev => (prev + 1) % highlights.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    setLoginSuccess(false); // Reset success message when typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.login.trim()) newErrors.login = "Login is required";
    if (!credentials.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoginSuccess(false);

    try {
      const response = await axios.post(`${API_URL}/account/login`, credentials, {
        withCredentials: true
      });

      console.log("Login successful:", response.data);
      setLoginSuccess(true);
      setErrors({});

    } catch (err) {
      // Handle login error
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setErrors(prev => ({
        ...prev,
        form: errorMessage
      }));
      setLoginSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-gray-100 rounded-xl p-6 shadow-lg max-w-md w-full gap-y-6 flex flex-col items-center" style={{ minHeight: "400px" }}>
        <div className="text-center">
          <p className="text-3xl font-semibold mb-2">Welcome to <span className="font-[Dancing_Script] text-5xl">Flirtini</span></p>
          <div className="text-lg font-normal flex items-center justify-center h-8 text-gray-300">
            <span className="mr-2">A place with</span>
            <span className="text-purple-400 relative flex items-center justify-center h-8 px-5 min-w-[80px] text-center overflow-hidden rounded-md bg-gray-800">
              {highlights.map((word, index) => (
                <span key={index} className={`absolute left-0 right-0 transition-all duration-700 ease-in-out ${highlightIndex === index ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>{word}</span>
              ))}
            </span>
            <span className="ml-2">drinks</span>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="relative mx-auto max-w-xs">
            <input name="login" type="text" value={credentials.login} onChange={handleChange} placeholder="Login" autoFocus className={`w-full p-3 rounded-md bg-gray-700 border ${errors.login ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 text-center`} />
            {errors.login && <p className="text-red-400 text-sm mt-1 text-center">{errors.login}</p>}
          </div>
          <div className="relative mx-auto max-w-xs">
            <input name="password" type="password" value={credentials.password} onChange={handleChange} placeholder="Password" className={`w-full p-3 rounded-md bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 text-center`} />
            {errors.password && <p className="text-red-400 text-sm mt-1 text-center">{errors.password}</p>}
          </div>
          {errors.form && (
            <p className="text-red-400 text-sm text-center">{errors.form}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-400 hover:bg-purple-500 text-white py-3 px-6 rounded-md transition-transform duration-200 hover:scale-105 mt-auto cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : "Login"}
        </button>
        <div className="mt-4 text-gray-400 text-center text-sm font-light">Not a member? <Link className="text-purple-500 hover:underline" to="/register">Register here</Link></div>
      </form>
    </div>
  );
}