import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSkeleton } from '../Components/LoadingSkeleton';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post('http://localhost:8000/auth/login/', formData);

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setLoginSuccess(true);
        setTimeout(() => {
          navigate('/addrecord');
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px] px-4">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[500px] px-4  from-lime-100">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-BLACK">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loginSuccess && (
          <div className="bg-lime-100 border border-lime-500 text-lime-800 px-4 py-3 rounded mb-4">
            Login successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-lime-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-lime-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-black py-3 rounded-lg hover:bg-lime-600 hover:text-white transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-lime-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
