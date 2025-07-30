import React, { useState, useEffect } from "react";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const highlights = ["perfect", "amazing", "tasty"];

  useEffect(() => {
    const interval = setInterval(() => setHighlightIndex(prev => (prev + 1) % highlights.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.login.trim()) newErrors.login = "Login is required";
    if (!credentials.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging as:",credentials.login);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-gray-100 rounded-xl p-6 shadow-lg max-w-md w-full space-y-6 flex flex-col items-center" style={{ minHeight: "400px" }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Flirtini™</h1>
          <div className="text-lg font-semibold flex items-center justify-center h-8">
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
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-purple-400 hover:bg-purple-500 text-white py-3 px-6 rounded-md transition-transform duration-200 hover:scale-105 mt-auto">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-gray-400 text-center text-sm font-medium">Not a member? Register here</div>
      </form>
    </div>
  );
}