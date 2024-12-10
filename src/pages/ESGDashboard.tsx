import React, { useState } from 'react';
import { PencilLine, Save, Download, Upload, RefreshCw, Leaf, Users, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { ShareReportModal } from '../components/esg/ShareReportModal';
import { storage } from '../config/firebase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { ESGQuestionnaire } from '../components/esg/ESGQuestionnaire';
import { generateESGReport, generateInvestorESGReport, createShareableReport } from '../utils/esg';

interface ESGMetric {
  category: 'environmental' | 'social' | 'governance';
  name: string;
  value: number;
  unit: string;
  trend: number;
  target?: number;
}

const ESGDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [loading, setLoading] = useState(false);
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [report, setReport] = useState<string | null>(null);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploadError(null);

    // Validate file type and size
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Please upload PDF, DOCX, or XLSX files.');
      return;
    }

    if (file.size > maxSize) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    try {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileRef = ref(storage, `esg-documents/${Date.now()}-${safeFileName}`);
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'bg-green-50 border border-green-200 rounded-md p-4 mb-4';
      successMessage.innerHTML = `
        <div class="flex">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <p class="text-sm text-green-800">File uploaded successfully!</p>
          </div>
        </div>
      `;
      
      const uploadSection = document.querySelector('.upload-section');
      if (uploadSection) {
        uploadSection.insertBefore(successMessage, uploadSection.firstChild);
        setTimeout(() => {
          if (successMessage.parentNode === uploadSection) {
            successMessage.remove();
          }
        }, 5000);
      }
      
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    }
  };

  const environmentalMetrics: ESGMetric[] = [
    {
      category: 'environmental',
      name: 'Carbon Footprint',
      value: 125,
      unit: 'tons CO2e',
      trend: -15,
      target: 100
    },
    {
      category: 'environmental',
      name: 'Renewable Energy Usage',
      value: 45,
      unit: '%',
      trend: 12,
      target: 60
    },
    {
      category: 'environmental',
      name: 'Waste Reduction',
      value: 28,
      unit: '%',
      trend: 8,
      target: 40
    }
  ];

  const socialMetrics: ESGMetric[] = [
    {
      category: 'social',
      name: 'Employee Diversity',
      value: 42,
      unit: '%',
      trend: 5,
      target: 50
    },
    {
      category: 'social',
      name: 'Community Investment',
      value: 250000,
      unit: 'USD',
      trend: 20,
      target: 300000
    }
  ];

  const governanceMetrics: ESGMetric[] = [
    {
      category: 'governance',
      name: 'Board Independence',
      value: 75,
      unit: '%',
      trend: 0,
      target: 75
    },
    {
      category: 'governance',
      name: 'Ethics Training Completion',
      value: 95,
      unit: '%',
      trend: 5,
      target: 100
    }
  ];

  const carbonEmissionsData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 11 },
    { month: 'Mar', value: 13 },
    { month: 'Apr', value: 10 },
    { month: 'May', value: 9 },
    { month: 'Jun', value: 8 },
  ];

  const handleQuestionnaireSubmit = async (answers: Record<string, string | number>) => {
    setLoading(true);
    try {
      // Generate both detailed and investor reports
      const metrics = {
        environmental: environmentalMetrics,
        social: socialMetrics,
        governance: governanceMetrics
      };
      
      const [detailedReport, investorReport] = await Promise.all([
        generateESGReport(metrics, answers),
        generateInvestorESGReport(metrics, answers)
      ]);

      setReport(detailedReport);

      // Create shareable investor report
      const shareableUrl = await createShareableReport(investorReport);
      setShareableUrl(shareableUrl);
      
      setIsShareModalOpen(true);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!report) return;
    
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `esg-report-${selectedPeriod}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleStartEdit = (metric: ESGMetric) => {
    setEditingMetric(metric.name);
    setEditValue(metric.value);
  };

  const handleSaveEdit = () => {
    const updatedMetrics = [...environmentalMetrics, ...socialMetrics, ...governanceMetrics].map(m => {
      if (m.name === editingMetric) {
        return { ...m, value: editValue };
      }
      return m;
    });
    // Here you would save to your backend
    setEditingMetric(null);
  };

  const MetricCard = ({ metric }: { metric: ESGMetric }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">{metric.name}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            metric.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {metric.trend > 0 ? '+' : ''}{metric.trend}%
          </span>
          <button
            onClick={() => handleStartEdit(metric)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <PencilLine className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex items-baseline">
        {editingMetric === metric.name ? (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(Number(e.target.value))}
              className="w-32 px-2 py-1 text-2xl font-bold border rounded-md"
            />
            <button
              onClick={handleSaveEdit}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Save className="w-4 h-4 text-green-600" />
            </button>
          </div>
        ) : (
          <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
        )}
        <span className="ml-2 text-gray-500">{metric.unit}</span>
      </div>
      {metric.target && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round((metric.value / metric.target) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 rounded-full h-2"
              style={{ width: `${(metric.value / metric.target) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">ESG & Sustainability Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Leaf className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-medium text-gray-900">Environmental</h2>
          </div>
          <div className="space-y-4">
            {environmentalMetrics.map((metric) => (
              <MetricCard key={metric.name} metric={metric} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">Social</h2>
          </div>
          <div className="space-y-4">
            {socialMetrics.map((metric) => (
              <MetricCard key={metric.name} metric={metric} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-medium text-gray-900">Governance</h2>
          </div>
          <div className="space-y-4">
            {governanceMetrics.map((metric) => (
              <MetricCard key={metric.name} metric={metric} />
            ))}
          </div>
        </div>
      </div>

      <ESGQuestionnaire
        onSubmit={handleQuestionnaireSubmit}
        loading={loading}
      />
      
      {shareableUrl && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Investor Report Generated Successfully
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Share this link with investors to provide access to your ESG report:</p>
                <input
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="mt-1 w-full px-3 py-2 bg-white border border-green-300 rounded-md text-sm"
                  onClick={(e) => {
                    e.currentTarget.select();
                    navigator.clipboard.writeText(shareableUrl);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {shareableUrl && (
        <ShareReportModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          reportUrl={shareableUrl}
          onDownload={handleDownload}
        />
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Carbon Emissions Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={carbonEmissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Upload ESG Documentation</h2>
          <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            <span>Upload Files</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,.xlsx"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        {uploadError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
            </div>
          </div>
        )}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Drag and drop your ESG documentation here, or click to browse
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF, DOCX, XLSX up to 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;