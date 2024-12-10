import React, { useState } from 'react';
import { generateInvestorUpdate } from '../config/gemini';
import { Send, Save, RefreshCw, AlertCircle } from 'lucide-react';

const InvestorUpdates = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const [metrics, setMetrics] = useState({
    mrr: 12880,
    growth: 15,
    runway: 17,
    burn: 85450
  });

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError('');
      try {
        const generatedContent = await generateInvestorUpdate(metrics);
        setContent(generatedContent);
      } catch (err) {
        if ((err as Error).message === 'Gemini AI is not configured') {
          setError('AI generation is temporarily unavailable. Please try again later or write your update manually.');
        } else {
          setError('Failed to generate update. Please try again or write your update manually.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Investor Updates</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {/* Save draft */}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button
            onClick={() => {/* Send update */}}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your investor update content..."
                rows={20}
                className="w-full border-0 focus:ring-0 text-base text-gray-900 placeholder-gray-500 resize-none"
              />
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Generating...' : 'Generate Update'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Recurring Revenue
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={metrics.mrr}
                    onChange={(e) => setMetrics({ ...metrics, mrr: Number(e.target.value) })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MoM Growth (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={metrics.growth}
                    onChange={(e) => setMetrics({ ...metrics, growth: Number(e.target.value) })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Runway (months)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={metrics.runway}
                    onChange={(e) => setMetrics({ ...metrics, runway: Number(e.target.value) })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Burn
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={metrics.burn}
                    onChange={(e) => setMetrics({ ...metrics, burn: Number(e.target.value) })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tips</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Keep updates concise and focused</p>
              <p>• Highlight key achievements and metrics</p>
              <p>• Be transparent about challenges</p>
              <p>• Include specific asks for help</p>
              <p>• Maintain a consistent sending schedule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorUpdates;