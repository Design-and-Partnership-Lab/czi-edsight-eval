'use client';

import { useState } from 'react';
import { ResponseType } from '../api/chat/route';

export default function SimpleApiTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResponseType>();

  const testApi = async () => {
    setIsLoading(true);
    setResult(undefined);
    
    try {
      const testData = {
        statementPairs: [
          {
            statementA: "I can see that the student clearly mentioned that opportunities where they could improve on this assignment in the future.",
            statementB: "The student mentioned identifying areas for improvement such as ‘creating an outline first and using more color.'"
          }
        ]
      };
            
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      console.log('Response status:', response.status);
      
      const text = await response.text();
      console.log('Response text:', text);
      
      setResult(text ? JSON.parse(text) : undefined);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={testApi}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? 'Testing...' : 'Test API'}
      </button>
      
      {result && (
        <div className="mt-4 p-2 border rounded">
          <p className="font-bold">Result:</p>
          <pre className="mt-2 bg-gray-100 p-2 overflow-auto">{JSON.stringify(result.comparisons[0].result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}