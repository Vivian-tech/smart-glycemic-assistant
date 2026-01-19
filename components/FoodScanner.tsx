
import React, { useState, useRef } from 'react';
import { analyzeFoodImage } from '../services/geminiService';

const FoodScanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        setAnalysis(null);
        setLoading(true);
        try {
          const result = await analyzeFoodImage(base64);
          setAnalysis(result);
        } catch (err) {
          setAnalysis("Failed to analyze image. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Food Analysis</h2>
        <p className="text-gray-500 text-sm mt-1">Take a photo of your meal to see if it's diabetic-friendly.</p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full aspect-square max-h-80 bg-gray-100 rounded-3xl border-4 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors overflow-hidden group"
      >
        {image ? (
          <img src={image} className="w-full h-full object-cover" alt="Meal" />
        ) : (
          <>
            <i className="fas fa-camera text-4xl text-gray-300 group-hover:text-blue-400 mb-2"></i>
            <span className="text-gray-400 font-medium">Click to capture or upload</span>
          </>
        )}
      </div>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {loading && (
        <div className="bg-blue-50 p-6 rounded-2xl flex items-center gap-4 animate-pulse">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-700 font-medium">Gemini is analyzing your plate...</p>
        </div>
      )}

      {analysis && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-info-circle text-blue-600"></i> AI Assessment
          </h3>
          <div className="prose prose-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}

      {!image && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl text-center">
            <i className="fas fa-check-circle text-emerald-600 mb-2"></i>
            <p className="text-xs font-bold text-emerald-800">Identify hidden sugars</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl text-center">
            <i className="fas fa-chart-line text-orange-600 mb-2"></i>
            <p className="text-xs font-bold text-orange-800">Est. Glycemic Load</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodScanner;
