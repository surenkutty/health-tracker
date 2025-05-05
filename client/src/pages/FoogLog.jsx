import React, { useState, useEffect } from 'react';
import axios from 'axios';

const mealTypes = ['Breakfast', 'Afternoon', 'Night'];

const FoodLog = () => {
  const [foodName, setFoodName] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [quantity, setQuantity] = useState(1);
  const [foodLogs, setFoodLogs] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchFoodLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/health/food-logs/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFoodLogs(response.data);
      calculateTotalCalories(response.data);
    } catch (err) {
      setError('Failed to load food logs');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  const calculateTotalCalories = (logs) => {
    const total = logs.reduce((sum, log) => sum + log.calories, 0);
    setTotalCalories(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/health/foods/calculate_nutrition/',
        {
          food_name: foodName,
          quantity: Number(quantity)
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      
      // Add the new log with nutrition data
      const newLog = {
        ...response.data,
        meal_type: mealType,
        timestamp: new Date().toISOString()
      };
      
      setFoodLogs([newLog, ...foodLogs]);
      calculateTotalCalories([newLog, ...foodLogs]);
      
      setFoodName('');
      setQuantity(1);
      setError('');
    } catch (err) {
      setError('Failed to submit food log');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">🍽️ Food Log Tracker</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-green-100">
        {error && <div className="mb-4 text-red-500 text-center font-medium">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Food Name</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="e.g., idli, dosa"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {mealTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">Quantity</label>
          <input
            type="number"
            min={0.5}
            step={0.5}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition">
          ➕ Add Food
        </button>
      </form>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">📝 Nutrition Summary</h2>

        {foodLogs.length === 0 ? (
          <p className="text-gray-600 text-center">No food logs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="py-3 px-4 text-left">Food</th>
                  <th className="py-3 px-4 text-left">Meal</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-right">Calories</th>
                  <th className="py-3 px-4 text-right">Protein</th>
                  <th className="py-3 px-4 text-right">Carbs</th>
                  <th className="py-3 px-4 text-right">Fats</th>
                </tr>
              </thead>
              <tbody>
                {foodLogs.map((log, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{log.food}</td>
                    <td className="py-2 px-4">{log.meal_type}</td>
                    <td className="py-2 px-4 text-center">{log.quantity}</td>
                    <td className="py-2 px-4 text-right">{log.calories} kcal</td>
                    <td className="py-2 px-4 text-right">{log.protein}g</td>
                    <td className="py-2 px-4 text-right">{log.carbs}g</td>
                    <td className="py-2 px-4 text-right">{log.fats}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-lg font-bold text-green-700">Total Calories</div>
            <div className="text-2xl font-bold">{totalCalories} kcal</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-lg font-bold text-blue-700">Total Protein</div>
            <div className="text-2xl font-bold">{foodLogs.reduce((sum, log) => sum + log.protein, 0)}g</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-lg font-bold text-orange-700">Total Carbs</div>
            <div className="text-2xl font-bold">{foodLogs.reduce((sum, log) => sum + log.carbs, 0)}g</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-lg font-bold text-yellow-700">Total Fats</div>
            <div className="text-2xl font-bold">{foodLogs.reduce((sum, log) => sum + log.fats, 0)}g</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLog;
