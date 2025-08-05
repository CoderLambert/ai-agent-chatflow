"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApiStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkApiStatus = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);
    
    try {
      // 检查参数API
      console.log('检查参数API...');
      const paramsResponse = await fetch('/api/parameters');
      console.log('参数API状态:', paramsResponse.status);
      
      // 检查对话API
      console.log('检查对话API...');
      const conversationsResponse = await fetch('/api/conversations');
      console.log('对话API状态:', conversationsResponse.status);
      
      // 检查消息API
      console.log('检查消息API...');
      const messagesResponse = await fetch('/api/messages');
      console.log('消息API状态:', messagesResponse.status);
      
      const statusData = {
        timestamp: new Date().toISOString(),
        parameters: {
          status: paramsResponse.status,
          ok: paramsResponse.ok,
          url: '/api/parameters'
        },
        conversations: {
          status: conversationsResponse.status,
          ok: conversationsResponse.ok,
          url: '/api/conversations'
        },
        messages: {
          status: messagesResponse.status,
          ok: messagesResponse.ok,
          url: '/api/messages'
        }
      };
      
      // 尝试获取错误详情
      if (!paramsResponse.ok) {
        try {
          const errorText = await paramsResponse.text();
          statusData.parameters.error = errorText;
        } catch (e) {
          statusData.parameters.error = '无法读取错误详情';
        }
      }
      
      if (!conversationsResponse.ok) {
        try {
          const errorText = await conversationsResponse.text();
          statusData.conversations.error = errorText;
        } catch (e) {
          statusData.conversations.error = '无法读取错误详情';
        }
      }
      
      if (!messagesResponse.ok) {
        try {
          const errorText = await messagesResponse.text();
          statusData.messages.error = errorText;
        } catch (e) {
          statusData.messages.error = '无法读取错误详情';
        }
      }
      
      setStatus(statusData);
      console.log('API状态检查结果:', statusData);
    } catch (error) {
      console.error('API状态检查失败:', error);
      setError(error instanceof Error ? error.message : 'API状态检查失败');
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (ok: boolean) => {
    return ok ? 'text-green-600' : 'text-red-600';
  }

  const getStatusText = (ok: boolean) => {
    return ok ? '正常' : '错误';
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
          <h1 className="text-2xl font-bold">API状态检查</h1>
        </div>
        
        <button 
          onClick={checkApiStatus}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? '检查中...' : '检查API状态'}
        </button>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded max-w-3xl">
            <h3 className="font-bold mb-2">错误:</h3>
            <p className="text-sm whitespace-pre-wrap">{error}</p>
          </div>
        )}
        
        {status && (
          <div className="mt-4 p-4 bg-gray-100 rounded w-full">
            <h3 className="font-bold mb-4">API状态检查结果:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">检查时间: {status.timestamp}</h4>
              </div>
              
              {Object.entries(status).filter(([key]) => key !== 'timestamp').map(([apiName, apiStatus]: [string, any]) => (
                <div key={apiName} className="border border-gray-300 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium capitalize">{apiName} API</h5>
                    <span className={`font-semibold ${getStatusColor(apiStatus.ok)}`}>
                      {getStatusText(apiStatus.ok)} ({apiStatus.status})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">URL: {apiStatus.url}</p>
                  {apiStatus.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-red-700 whitespace-pre-wrap">{apiStatus.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 