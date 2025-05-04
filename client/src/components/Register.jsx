import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { LoadingSkeleton } from '../Components/LoadingSkeleton';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/auth/register/', formData);
      setRegisterSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Registration failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[550px] mt-5">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[550px] mt-5">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-lime">Register</h2>

        {registerSuccess && (
          <div className="bg-lime-100 border border-lime-400 text-lime-700 px-4 py-3 rounded mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-500`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-500`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-black py-3 rounded-lg hover:bg-lime-600 hover:text-white transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
