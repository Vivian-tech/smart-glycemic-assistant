
import React from 'react';
import { MOCK_DOCTORS } from '../constants';

const DoctorList: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Connect to Care</h2>
        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">24/7 Available</span>
      </div>

      <div className="space-y-4">
        {MOCK_DOCTORS.map(doc => (
          <div key={doc.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-200 transition">
            <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-50" />
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800">{doc.name}</h4>
              <p className="text-blue-600 text-xs font-medium uppercase tracking-wider">{doc.specialty}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <i className="fas fa-map-marker-alt"></i> {doc.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-orange-400 text-xs font-bold flex items-center justify-end">
                <i className="fas fa-star mr-1"></i> {doc.rating}
              </div>
              <button className="mt-2 bg-gray-100 hover:bg-blue-600 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-1">Emergency Help?</h3>
          <p className="text-blue-100 text-sm mb-4">Click to call a local emergency dietitian or endocrinologist.</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition">
            Call SOS
          </button>
        </div>
        <i className="fas fa-phone-alt absolute -right-4 -bottom-4 text-8xl text-blue-500 opacity-20"></i>
      </div>
    </div>
  );
};

export default DoctorList;
