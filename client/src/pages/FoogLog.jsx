import React, { useState, useEffect } from 'react';
import axios from 'axios';

const mealTypes = ['Breakfast', 'Afternoon', 'Night'];

const FoodLog = () => {
  const [foodId, setFoodId] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [quantity, setQuantity] = useState(1);
  const [foodLogs, setFoodLogs] = useState([]);
  const [calories, setCalories] = useState(0);

  const token = localStorage.getItem('token'); // Must be set on login

  const fetchFoodLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/health/food-logs/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFoodLogs(response.data);
      calculateTotalCalories(response.data);
    } catch (error) {
      console.error('Error fetching food logs:', error);
    }
  };

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  const calculateTotalCalories = (logs) => {
    let total = 0;
    logs.forEach(log => {
      // Simulated: 1 quantity = 100 cal (replace with real DB mapping if needed)
      total += log.quantity * 100;
    });
    setCalories(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/health/food-logs/',
        { food_id: foodId, meal_type: mealType, quantity },
        { headers: { Authorization: `Token ${token}` } }
      );
      setFoodId('');
      setQuantity(1);
      fetchFoodLogs(); // Refresh
    } catch (error) {
      console.error('Error submitting log:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-lime-400 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🍽️ Health Tracker - Food Log</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white text-black p-6 rounded-xl shadow-lg space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Food Name</label>
          <input
            type="text"
            value={foodId}
            onChange={(e) => setFoodId(e.target.value)}
            className="w-full p-2 border border-lime-400 rounded"
            placeholder="e.g., Idly, Dosa"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full p-2 border border-lime-400 rounded"
          >
            {mealTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full p-2 border border-lime-400 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 rounded transition"
        >
          Add Food Log
        </button>
      </form>

      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-lime-400 mb-4">📝 Food Log Summary</h2>
        {foodLogs.length === 0 ? (
          <p className="text-white">No logs yet.</p>
        ) : (
          <table className="w-full text-white border border-lime-500">
            <thead>
              <tr className="bg-lime-500 text-black">
                <th className="py-2 px-4 border">Food</th>
                <th className="py-2 px-4 border">Meal</th>
                <th className="py-2 px-4 border">Qty</th>
                <th className="py-2 px-4 border">Est. Calories</th>
              </tr>
            </thead>
            <tbody>
              {foodLogs.map((log, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border">{log.food_id}</td>
                  <td className="py-2 px-4 border">{log.meal_type}</td>
                  <td className="py-2 px-4 border">{log.quantity}</td>
                  <td className="py-2 px-4 border">{log.quantity * 100} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="text-xl text-lime-400 font-bold mt-4">
          🧮 Total Calories: {calories} kcal
        </div>
      </div>
    </div>
  );
};

export default FoodLog;
