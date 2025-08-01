import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = 'http://172.24.3.162:3000';

const InputField = ({ name, value, onChange, error, type = "text", placeholder, required = true, ...props }) => (
  <div>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full p-3 rounded-md bg-gray-700 border ${error ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]`}
      {...props}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

export default function RegistrationForm() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    login: "",
    password: "",
    birthday: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const progressPercent = Math.round(((step - 1) / 4) * 100);

  const isAdult = (birthday) => {
    if (!birthday) return false;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18;
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 2) {
      if (!form.firstname.trim()) newErrors.firstname = "First name is required";
      else if (form.firstname.length < 2 || form.firstname.length > 30)
        newErrors.firstname = "First name must be 2-30 characters";

      if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
      else if (form.lastname.length < 2 || form.lastname.length > 30)
        newErrors.lastname = "Last name must be 2-30 characters";
    }

    if (step === 3) {
      if (!form.login.trim()) newErrors.login = "Login is required";
      else if (form.login.length < 4 || form.login.length > 20)
        newErrors.login = "Login must be 4-20 characters";

      if (!form.password.trim()) newErrors.password = "Password is required";
      else if (form.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }

    if (step === 4) {
      if (!form.birthday.trim()) newErrors.birthday = "Birthday is required";
      else if (!isAdult(form.birthday)) newErrors.birthday = "You must be at least 18 years old";

      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        newErrors.email = "Invalid email format";

      if (form.phone.trim() && !/^\+?[0-9\s\-]{7,15}$/.test(form.phone))
        newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/account/register`, form, { withCredentials: true });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      localStorage.setItem("token", response.data.token);
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep(s => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  const Summary = () => (
    <div className="bg-gray-700 rounded-lg p-5 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-white">Your Profile Summary</h3>
      <div className="space-y-3 mb-6">
        {[
          { label: "Name", value: `${form.firstname} ${form.lastname}` },
          { label: "Login", value: form.login },
          { label: "Birthday", value: form.birthday ? new Date(form.birthday).toLocaleDateString() : "Not set" },
          { label: "Email", value: form.email },
          { label: "Phone", value: form.phone || "Not provided" }
        ].map((item, index) => (
          <div key={index}>
            <p className="text-gray-400 text-sm">{item.label}</p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={prevStep} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md font-medium border-solid border-2 border-gray-600 transition-[transform background-color] duration-200 hover:scale-[1.02] cursor-pointer">
          Back
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-1 bg-purple-400 hover:bg-purple-500 text-white border-solid border-2 border-purple-400 hover:border-purple-500 py-3 px-4 rounded-md font-medium transition-[transform background-color border-color] duration-200 hover:scale-[1.02] cursor-pointer">
          {isSubmitting ? 'Processing...' : 'Complete'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-gray-100 rounded-xl p-6 shadow-lg max-w-lg w-full flex flex-col min-h-[400px]">
        {step > 1 && (
          <>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-2 animate-pulse-slow">
              <div className="bg-purple-400 h-4 transition-all duration-500 ease-in-out" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className={`text-center font-semibold mb-4 animate-fade-in ${step < 5 ? "text-gray-300" : "text-purple-400 animate-bounce"}`}>
              {step < 5 ? `You're ${progressPercent}% done completing your ideal drink` : "Almost there, your drink is getting prepared!"}
            </div>
          </>
        )}

        <div key={step} className="h-full transition-opacity duration-500 ease-in-out flex-grow flex flex-col justify-center">
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up">
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <p className="text-3xl font-semibold">Welcome to <span className="font-[Dancing_Script] text-5xl">Flirtini</span></p>
                <p className="text-lg font-normal text-gray-300">A perfect place to find your drink</p>
                <button type="button" onClick={nextStep} className="bg-purple-400 hover:bg-purple-500 text-white py-3 px-6 rounded-md font-semibold transition-[transform background-color] duration-200 hover:scale-105 cursor-pointer">
                  Continue
                </button>
              </div>
              <p className="text-gray-400 text-sm font-light">Already a member? <Link className="text-purple-500 hover:underline" to="/login">Log in here.</Link></p>
            </div>
          )}

          {step === 2 && (
            <div className="flex gap-4 animate-fade-in">
              <InputField name="firstname" value={form.firstname} onChange={handleChange} error={errors.firstname} placeholder="First name" autoFocus />
              <InputField name="lastname" value={form.lastname} onChange={handleChange} error={errors.lastname} placeholder="Last name" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <InputField name="login" value={form.login} onChange={handleChange} error={errors.login} placeholder="Login" autoFocus />
              <InputField name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="Password" />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <InputField name="birthday" type="date" value={form.birthday} onChange={handleChange} error={errors.birthday} placeholder="Birthday" autoFocus
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} />
              <div className="flex gap-4">
                <InputField name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="Email" />
                <InputField name="phone" type="number" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" required={false} />
              </div>
            </div>
          )}

          {step === 5 && <Summary />}
        </div>

        {submitError && <p className="text-red-500 text-center">{submitError}</p>}

        <div className="flex justify-between items-center">
          {step > 1 && step < 5 && (
            <button type="button" onClick={prevStep} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-[transform background-color] duration-200 hover:scale-105 cursor-pointer">
              Back
            </button>
          )}
          {step < 5 && step !== 1 && (
            <button type="button" onClick={nextStep} className="bg-purple-400 hover:bg-purple-500 text-white py-2 px-4 rounded-md ml-auto transition-[transform background-color] duration-200 hover:scale-105 cursor-pointer">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}