import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DataRoomSection } from '../components/dataroom/DataRoomSection';
import { ShareModal } from '../components/dataroom/ShareModal';
import { UploadModal } from '../components/dataroom/UploadModal';
import { DataRoomItem } from '../types/dataRoom';
import { uploadDocument, createShareLink } from '../utils/dataRoom';

const SECTIONS = [
  'Financials',
  'Company Documents',
  'Legal',
  'Technology',
  'Market & Competition',
  'Team',
];

const DataRoom = () => {
  const { currentUser } = useAuth();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [selectedItem, setSelectedItem] = useState<DataRoomItem | null>(null);
  const [expiryDays, setExpiryDays] = useState(7);
  const [items, setItems] = useState<Record<string, DataRoomItem[]>>({});

  const handleUploadClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setUploadModalOpen(true);
  };

  const handleUpload = async (file: File, description: string) => {
    if (!currentUser) return;
    
    const newItem = await uploadDocument(
      currentUser.uid,
      file,
      currentSection,
      description
    );
    
    setItems(prev => ({
      ...prev,
      [currentSection]: [...(prev[currentSection] || []), newItem]
    }));
  };

  const handleShare = (item: DataRoomItem) => {
    setSelectedItem(item);
    setShareModalOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    if (!currentUser) return;
    
    // Update UI immediately
    setItems(prev => {
      const newItems: Record<string, DataRoomItem[]> = {};
      Object.entries(prev).forEach(([section, sectionItems]) => {
        newItems[section] = sectionItems.filter(item => item.id !== itemId);
      });
      return newItems;
    });
    
    // Delete from storage and database
    try {
      // Implementation for delete will be added
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Data Room</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search documents..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All sections</option>
            {SECTIONS.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SECTIONS.map((section) => (
          <DataRoomSection
            key={section}
            title={section}
            items={items[section] || []}
            onUpload={() => handleUploadClick(section)}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={`https://tizora.com/shared/${selectedItem?.id}`}
        onCopy={() => console.log('Link copied')}
        expiryDays={expiryDays}
        onExpiryChange={setExpiryDays}
      />
      
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
        section={currentSection}
      />
    </div>
  );
};

export default DataRoom;