import { db, storage } from '../config/firebase';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { DataRoomItem, ShareLink } from '../types/dataRoom';
import { captureError } from './errorHandling';

export const uploadDocument = async (
  userId: string,
  file: File,
  section: string,
  description?: string
): Promise<DataRoomItem> => {
  try {
    const fileId = uuidv4();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileRef = ref(storage, `data-room/${userId}/${fileId}-${safeFileName}`);
    
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    
    const item: DataRoomItem = {
      id: fileId,
      title: file.name,
      description,
      fileUrl,
      fileName: file.name,
      uploadDate: new Date(),
      status: 'uploaded'
    };
    
    await setDoc(
      doc(db, `users/${userId}/data-room/${section}/${fileId}`),
      item
    );
    
    return item;
  } catch (error) {
    captureError(error as Error, { context: 'uploadDocument' });
    throw new Error('Failed to upload document');
  }
};

export const createShareLink = async (
  userId: string,
  documentIds: string[],
  expiryDays: number
): Promise<ShareLink> => {
  try {
    const shareId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiryDays);
    
    const shareLink: ShareLink = {
      id: shareId,
      url: `${window.location.origin}/shared/${shareId}`,
      expiresAt,
      documentIds,
      accessedBy: []
    };
    
    await setDoc(
      doc(db, `users/${userId}/share-links/${shareId}`),
      shareLink
    );
    
    return shareLink;
  } catch (error) {
    captureError(error as Error, { context: 'createShareLink' });
    throw new Error('Failed to create share link');
  }
};

export const getSharedDocuments = async (shareId: string): Promise<DataRoomItem[]> => {
  try {
    const shareDoc = await getDoc(doc(db, 'share-links', shareId));
    if (!shareDoc.exists()) {
      throw new Error('Share link not found');
    }
    
    const shareData = shareDoc.data() as ShareLink;
    if (new Date() > shareData.expiresAt) {
      throw new Error('Share link has expired');
    }
    
    // Record access
    await updateDoc(doc(db, 'share-links', shareId), {
      accessedBy: [...(shareData.accessedBy || []), {
        timestamp: new Date(),
        ip: 'Anonymous' // In production, you'd capture the actual IP
      }]
    });
    
    const documents: DataRoomItem[] = [];
    for (const docId of shareData.documentIds) {
      const docRef = await getDoc(doc(db, `data-room/${docId}`));
      if (docRef.exists()) {
        documents.push(docRef.data() as DataRoomItem);
      }
    }
    
    return documents;
  } catch (error) {
    captureError(error as Error, { context: 'getSharedDocuments' });
    throw new Error('Failed to retrieve shared documents');
  }
};