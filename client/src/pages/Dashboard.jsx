import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { FaFireAlt, FaHeart, FaTint, FaWeight } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-900">
      {/* Sidebar */}
      <aside className="w-20 bg-black text-white flex flex-col items-center py-6">
        <div className="bg-lime-400 p-2 rounded-full mb-6" />
        <nav className="space-y-6">
          <button className="bg-lime-400 p-3 rounded-full" />
          <button className="p-3 rounded-full bg-gray-800" />
          <button className="p-3 rounded-full bg-gray-800" />
          <button className="p-3 rounded-full bg-gray-800" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-3 gap-6">
        {/* User Info and Body Overview */}
        <div className="col-span-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/40" alt="user" className="rounded-full w-10 h-10" />
              <span className="font-semibold">Jenny Wilson</span>
              <FiChevronDown className="text-xl" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-6">Body Overview</h2>

          <Card className="mt-4 bg-black text-white">
            <CardContent className="p-6">
              <p className="text-lg">You’ve gained <span className="text-lime-400 font-bold">2kg</span> in a month, keep it up!</p>
              <p className="text-sm mt-1">Still need to gain</p>
              <h3 className="text-3xl font-bold">950 kcal</h3>
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <p>Protein</p>
                  <Progress value={35} className="bg-gray-800" />
                  <p>35%</p>
                </div>
                <div className="text-center">
                  <p>Carbo</p>
                  <Progress value={65} className="bg-gray-800" />
                  <p>65%</p>
                </div>
                <div className="text-center">
                  <p>Fat</p>
                  <Progress value={65} className="bg-gray-800" />
                  <p>65%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6">New Activity</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Card className="bg-lime-200">
              <CardContent className="p-4">
                <h4 className="font-semibold">Drinking Tracker</h4>
                <p className="text-sm">Stay hydrated, it's nature’s best refreshment</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-100">
              <CardContent className="p-4">
                <h4 className="font-semibold">Daily Exercise</h4>
                <p className="text-sm">Stay fit and active, it's nature’s best medicine</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 text-white">
              <CardContent className="p-4">
                <h4 className="font-semibold">Sleep Tracker</h4>
                <p className="text-sm">Quality sleep is the best recovery</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Targets and Meal Plan */}
        <div>
          <h2 className="text-2xl font-bold">My Daily Target</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p>Water</p>
                  <p className="font-bold">2300 ml</p>
                </div>
                <FaTint className="text-blue-500 text-2xl" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p>Calories</p>
                  <p className="font-bold">890 kcal</p>
                </div>
                <FaFireAlt className="text-orange-500 text-2xl" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p>Weight</p>
                  <p className="font-bold">62 Kg</p>
                </div>
                <FaWeight className="text-orange-400 text-2xl" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p>BPM</p>
                  <p className="font-bold">110 BPM</p>
                </div>
                <FaHeart className="text-red-500 text-2xl" />
              </CardContent>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mt-6">My Meal Plan</h3>
          <div className="space-y-4 mt-4">
            {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
              <Card key={meal}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{meal}</h4>
                    <p className="text-sm text-gray-500">250 kcal, 10 kcal, 120 kcal</p>
                  </div>
                  <button className="text-2xl bg-gray-200 p-2 rounded-full">
                    <MdFastfood />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;