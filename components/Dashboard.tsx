
import React, { useState, useEffect } from 'react';
import { UserProfile, Recipe } from '../types';
import { getMealAdvice } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  user: UserProfile;
}

const Dashboard: React.FC<Props> = ({ user }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const currentGlucose = user.recentGlucose[user.recentGlucose.length - 1];
  const isOptimal = currentGlucose >= user.targetGlucose.min && currentGlucose <= user.targetGlucose.max;

  const chartData = user.recentGlucose.map((val, idx) => ({ time: `T-${user.recentGlucose.length - 1 - idx}`, val }));

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const data = await getMealAdvice(currentGlucose, new Date().getHours() > 17 ? 'evening' : 'daytime');
      setRecipes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Glucose Summary Card */}
      <div className={`p-6 rounded-2xl text-white shadow-lg ${isOptimal ? 'bg-emerald-500' : 'bg-orange-500'}`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-emerald-100 text-sm font-medium">Current Glucose</p>
            <h2 className="text-4xl font-bold mt-1">{currentGlucose} <span className="text-lg font-normal opacity-80">mg/dL</span></h2>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <i className={`fas ${isOptimal ? 'fa-check-circle' : 'fa-exclamation-triangle'} text-2xl`}></i>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-sm">
          <span>Target: {user.targetGlucose.min} - {user.targetGlucose.max}</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">Stable Trend</span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-700 mb-4">Glucose History</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" hide />
              <YAxis domain={['dataMin - 20', 'dataMax + 20']} hide />
              <Tooltip />
              <Line type="monotone" dataKey="val" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">AI Meal Proposals</h3>
          <button onClick={fetchSuggestions} className="text-blue-600 text-sm font-medium hover:underline">
            <i className="fas fa-sync-alt mr-1"></i> Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p>Asking Gemini for healthy options...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {recipes.map((recipe, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <i className="fas fa-utensils text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{recipe.name}</h4>
                  <div className="flex gap-3 text-xs mt-1">
                    <span className="text-emerald-600 font-bold">GI: {recipe.glycemicIndex}</span>
                    <span className="text-gray-500">{recipe.calories} kcal</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 truncate w-full">
                    {recipe.ingredients.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Elevator Pitch Box */}
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h3 className="text-blue-900 font-bold mb-2">The GlucoCare Vision</h3>
        <p className="text-blue-800 text-sm leading-relaxed">
          "Diabetes shouldn't be a lonely journey of guesswork. GlucoCare turns data into action, providing instant AI nutritional advice and a safety net of remote monitoring, ensuring every patient—from Lagos to London—has a personal health companion in their pocket."
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
