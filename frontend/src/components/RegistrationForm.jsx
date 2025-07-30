import React, { useState } from "react";

const InputField = ({ name, value, onChange, error, type = "text", placeholder, required = true, ...props }) => (
  <div>
    <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={`w-full p-3 rounded-md bg-gray-700 border ${error ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-purple-500`} {...props}/>
    {error &&
    <p className="text-red-400 text-sm mt-1">{error}</p>
    }
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
  const progressPercent = Math.round(((step - 1) / 4) * 100);
  

  const isAdult = (birthday) => {
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
      if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    }
    if (step === 3) {
      if (!form.login.trim()) newErrors.login = "Login is required";
      if (!form.password.trim()) newErrors.password = "Password is required";
      else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    }
    if (step === 4) {
      if (!form.birthday.trim()) newErrors.birthday = "Birthday is required";
      else if (!isAdult(form.birthday)) newErrors.birthday = "You must be at least 18 years old";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => { 
    const { name, value } = e.target; 
    setForm(prev => ({ ...prev, [name]: value })); 
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" })); 
  };

  const handleSubmit = e => { 
    e.preventDefault(); 
    console.log("Submitted!\n" + JSON.stringify(form, null, 2));
  };

  const nextStep = () => { 
    if (!validateStep()) return; 
    setStep(s => Math.min(s + 1, 5)); 
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const Summary = () => (
    <div className="bg-gray-700 rounded-lg p-5 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-white">Your Profile Summary</h3>
      <div className="space-y-3 mb-6">
        <div>
          <p className="text-gray-400 text-sm">Name</p>
          <p className="font-medium">{form.firstname} {form.lastname}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Login</p>
          <p className="font-medium">{form.login}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Birthday</p>
          <p className="font-medium">{form.birthday ? new Date(form.birthday).toLocaleDateString() : "Not set"}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="font-medium">{form.email}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Phone</p>
          <p className="font-medium">{form.phone || "Not provided"}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={prevStep} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md font-medium transition-transform duration-200 hover:scale-[1.02]">Back</button>
        <button type="submit" disabled={isSubmitting} className="flex-1 bg-purple-400 hover:bg-purple-500 text-white py-3 px-4 rounded-md font-medium transition-transform duration-200 hover:scale-[1.02]">{isSubmitting ? 'Preparing...' : 'Complete'}</button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-gray-100 rounded-xl p-6 shadow-lg max-w-lg w-full space-y-6 flex flex-col" style={{ minHeight: "400px" }}>
        {step > 1 && (
          <>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-2 animate-pulse-slow">
              <div className="bg-purple-400 h-4 transition-all duration-500 ease-in-out" style={{ width: `${progressPercent}%` }}></div>
            </div>
            {step < 5 ? (
              <div className="text-center text-gray-300 font-semibold mb-4 animate-fade-in">You're {progressPercent}% done completing your ideal drink</div>
            ) : (
              <p className="text-center text-purple-400 font-semibold mb-4 animate-bounce">Almost there, your drink is getting prepared!</p>
            )}
          </>
        )}

        <div key={step} className="transition-opacity duration-500 ease-in-out flex-grow flex flex-col justify-center">
          {step === 1 && (
            <div className="text-center animate-fade-in-up">
              <p className="text-2xl font-extrabold mb-2">Welcome to Flirtinii™</p>
              <p className="text-lg font-semibold mb-6">A perfect place to find your drink</p>
              <button type="button" onClick={nextStep} className="mt-4 bg-purple-400 hover:bg-purple-500 text-white py-3 px-6 rounded-md font-semibold transition-transform duration-200 hover:scale-105">Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="flex gap-4 animate-fade-in">
              <InputField name="firstname" value={form.firstname} onChange={handleChange} error={errors.firstname} placeholder="First name" autoFocus/>
              <InputField name="lastname" value={form.lastname} onChange={handleChange} error={errors.lastname} placeholder="Last name"/>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <InputField name="login" value={form.login} onChange={handleChange} error={errors.login} placeholder="Login" autoFocus/>
              <InputField name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="Password"/>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <InputField name="birthday" type="date" value={form.birthday} onChange={handleChange} error={errors.birthday} placeholder="Birthday" autoFocus max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} 
              />
              <div className="flex gap-4">
                <InputField name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="Email"/>
                <InputField name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" required={false}/>
              </div>
            </div>
          )}
          {step === 5 && <Summary />}
        </div>

        <div className="flex justify-between items-center">
          {step > 1 && step < 5 && (
            <button type="button" onClick={prevStep} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-transform duration-200 hover:scale-105">Back</button>
          )}
          {step < 5 && step !== 1 && (
            <button type="button" onClick={nextStep} className="bg-purple-400 hover:bg-purple-500 text-white py-2 px-4 rounded-md ml-auto transition-transform duration-200 hover:scale-105">Next</button>
          )}
        </div>
      </form>
    </div>
  );
}