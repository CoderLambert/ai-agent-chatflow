"use client";

import { useState } from "react";
import Link from "next/link";

export default function MessageFeedbacks() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [messageId, setMessageId] = useState("");
  const [rating, setRating] = useState("like");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageId) {
      setError('请输入消息ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      const requestBody = {
        rating,
      };
      
      console.log('请求URL:', `/api/messages/${messageId}/feedbacks`);
      console.log('请求体:', requestBody);
      
      const response = await fetch(`/api/messages/${messageId}/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('响应状态:', response.status);
      console.log('响应头:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('错误响应内容:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      setResponse(data);
      console.log('消息反馈响应:', data);
    } catch (error) {
      console.error('发送消息反馈失败:', error);
      setError(error instanceof Error ? error.message : '发送消息反馈失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-3xl">
        <div className="flex items-center gap-4">
          <Link 
            href="/test/api"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            ← 返回API测试列表
          </Link>
          <h1 className="text-2xl font-bold">消息反馈测试</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">消息ID:</label>
            <input
              type="text"
              value={messageId}
              onChange={(e) => setMessageId(e.target.value)}
              placeholder="请输入消息ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">评分:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="like">喜欢</option>
              <option value="dislike">不喜欢</option>
            </select>
          </div>
          
          <button 
            type="submit"
            disabled={loading || !messageId}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '发送中...' : '发送反馈'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded max-w-3xl">
            <h3 className="font-bold mb-2">错误:</h3>
            <p className="text-sm whitespace-pre-wrap">{error}</p>
          </div>
        )}
        
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">反馈结果:</h3>
            <pre className="text-sm overflow-auto max-w-3xl">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
} 