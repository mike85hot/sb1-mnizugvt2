import React, { useState } from 'react';
import { Copy, X, Mail, Download, Link } from 'lucide-react';

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportUrl: string;
  onDownload: () => void;
}

export const ShareReportModal: React.FC<ShareReportModalProps> = ({
  isOpen,
  onClose,
  reportUrl,
  onDownload
}) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleEmailShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would implement the email sharing logic
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900">Share ESG Report</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Copy Link Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share via Link
            </label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={reportUrl}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Email Share Section */}
          <form onSubmit={handleEmailShare}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share via Email
            </label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Mail className="h-4 w-4 mr-2" />
                {emailSent ? 'Sent!' : 'Send'}
              </button>
            </div>
          </form>

          {/* Download Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onDownload}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};