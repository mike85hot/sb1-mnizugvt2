export interface DataRoomSection {
  id: string;
  title: string;
  items: DataRoomItem[];
}

export interface DataRoomItem {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  uploadDate: Date;
  status: 'pending' | 'uploaded' | 'shared';
  sharedWith?: string[];
}

export interface ShareLink {
  id: string;
  url: string;
  expiresAt: Date;
  accessedBy?: string[];
  documentIds: string[];
}