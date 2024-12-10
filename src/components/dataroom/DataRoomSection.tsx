import React from 'react';
import { Upload, Link2, Eye, Trash2 } from 'lucide-react';
import { DataRoomItem } from '../../types/dataRoom';

interface DataRoomSectionProps {
  title: string;
  items: DataRoomItem[];
  onUpload: (sectionId: string) => void;
  onShare: (item: DataRoomItem) => void;
  onDelete: (itemId: string) => void;
}

export const DataRoomSection: React.FC<DataRoomSectionProps> = ({
  title,
  items,
  onUpload,
  onShare,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <button
          onClick={() => onUpload(title)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </button>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.fileName || item.title}
              </h4>
              {item.description && (
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                Uploaded {item.uploadDate.toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onShare(item)}
                className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
              >
                <Link2 className="h-4 w-4" />
              </button>
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
              >
                <Eye className="h-4 w-4" />
              </a>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No documents uploaded yet
          </div>
        )}
      </div>
    </div>
  );
};