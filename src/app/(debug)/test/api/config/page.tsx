"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConfigCheck() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConfig = async () => {
    setLoading(true);
    setError(null);
    setConfig(null);
    
    try {
      // 获取配置信息
      const response = await fetch('/api/config');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      setConfig(data);
      console.log('配置信息:', data);
    } catch (error) {
      console.error('获取配置失败:', error);
      setError(error instanceof Error ? error.message : '获取配置失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="flex items-center gap-4">
          <Link 
            href="/test/api"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            ← 返回API测试列表
          </Link>
          <h1 className="text-2xl font-bold">配置检查</h1>
        </div>
        
        <button 
          onClick={checkConfig}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? '检查中...' : '检查配置'}
        </button>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded max-w-3xl">
            <h3 className="font-bold mb-2">错误:</h3>
            <p className="text-sm whitespace-pre-wrap">{error}</p>
          </div>
        )}
        
        {config && (
          <div className="mt-4 p-4 bg-gray-100 rounded w-full">
            <h3 className="font-bold mb-4">配置信息:</h3>
            <pre className="text-sm overflow-auto max-w-full bg-white p-4 rounded border">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
} 