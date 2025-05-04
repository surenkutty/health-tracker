import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecord = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [dailyLimit, setDailyLimit] = useState('');
  const [user, setUser] = useState(''); // renamed from username
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch username using token and store in `user`
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data.username); // Save to `user` field
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/auth/health/',
        {
          user: user, // key name is 'user'
          age: parseInt(age),
          weight: parseFloat(weight),
          daily_calorie_limit: parseInt(dailyLimit),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Health data submitted successfully!');
      navigate('/');
      setAge('');
      setWeight('');
      setDailyLimit('');
    } catch (error) {
      console.error('Error submitting health data:', error);
      alert('Error: Unable to submit');
    }
  };

  return (
    <div className="bg-lime-50 text-gray-800 p-6">
      <h1 className="lg:text-2xl text-xl font-bold text-gray-700 text-center mb-8">
        Enter Your Health Info
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-lg mb-12 rounded-xl border border-lime-200 space-y-6"
      >
        <div>
          <label className="block mb-1 font-base text-gray-600">Username</label>
          <input
            type="text"
            value={user}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-base text-gray-600">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-base text-gray-600">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-base text-gray-600">Daily Calorie Limit</label>
          <input
            type="number"
            value={dailyLimit}
            onChange={(e) => setDailyLimit(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecord;
