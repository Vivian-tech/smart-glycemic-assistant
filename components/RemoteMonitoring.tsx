
import React from 'react';

const RemoteMonitoring: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Caregiver Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Keep your loved ones safe with real-time alerts.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Pa's Glucose</h3>
            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Live</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-gray-800">112</span>
            <span className="text-gray-400 mb-1">mg/dL</span>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic">Last updated 2 mins ago from Libre Link.</p>
          <button className="absolute top-6 right-6 text-gray-300 hover:text-blue-600">
            <i className="fas fa-cog"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-blue-600 text-[10px] font-bold uppercase mb-1">Alerts</p>
            <p className="text-blue-900 font-bold">2 Today</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <p className="text-emerald-600 text-[10px] font-bold uppercase mb-1">Daily Avg</p>
            <p className="text-emerald-900 font-bold">124 mg/dL</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
        <h4 className="font-bold text-gray-700 text-sm mb-4">Active Guardians</h4>
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <img key={i} src={`https://picsum.photos/seed/${i*10}/100/100`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Caregiver" />
          ))}
          <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white text-xs">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">Invite family members to monitor your levels and receive SMS alerts in case of lows.</p>
      </div>

      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex gap-4">
        <i className="fas fa-bell text-orange-500 mt-1"></i>
        <div>
          <p className="text-orange-900 font-bold text-sm">Critical Notification</p>
          <p className="text-orange-800 text-xs">If glucose drops below 70 mg/dL, Mama Sarah will be notified via SMS immediately.</p>
        </div>
      </div>
    </div>
  );
};

export default RemoteMonitoring;
