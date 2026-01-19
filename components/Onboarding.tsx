
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 30,
    type: 'Type 2' as UserProfile['type'],
    minGlucose: 80,
    maxGlucose: 140
  });

  const next = () => setStep(step + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      name: formData.name,
      age: formData.age,
      type: formData.type,
      targetGlucose: { min: formData.minGlucose, max: formData.maxGlucose },
      recentGlucose: [110, 125, 105, 145, 130]
    });
  };

  return (
    <div className="p-6 flex flex-col justify-center min-h-full bg-white">
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-hand-holding-medical text-4xl text-blue-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome to GlucoCare</h2>
            <p className="text-gray-600 mt-2">Your AI companion for a balanced life with diabetes.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-blue-800 text-sm italic">"Our mission is to empower you with the right data at the right time, whether you're in a busy city or a rural community."</p>
          </div>
          <button 
            onClick={next}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Get Started
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Tell us about yourself</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diabetes Type</label>
              <select 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
              >
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Pre-diabetic</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Min (mg/dL)</label>
                <input 
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.minGlucose}
                  onChange={e => setFormData({...formData, minGlucose: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Max (mg/dL)</label>
                <input 
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.maxGlucose}
                  onChange={e => setFormData({...formData, maxGlucose: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Complete Setup
          </button>
        </form>
      )}
    </div>
  );
};

export default Onboarding;
