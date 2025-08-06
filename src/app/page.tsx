"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [parameters, setParameters] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setParameters(null);
    
    try {
      const response = await fetch('/api/parameters');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setParameters(data);
      console.log('获取的参数:', data);
    } catch (error) {
      console.error('获取参数失败:', error);
      setError(error instanceof Error ? error.message : '获取参数失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button 
          onClick={handleClick}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? '获取中...' : '获取参数'}
        </button>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h3 className="font-bold mb-2">错误:</h3>
            <p>{error}</p>
          </div>
        )}
        
        {parameters && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">获取到的参数:</h3>
            <pre className="text-sm overflow-auto max-w-3xl">
              {JSON.stringify(parameters, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
