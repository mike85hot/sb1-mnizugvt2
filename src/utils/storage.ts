import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const fileId = uuidv4();
  const fileRef = ref(storage, `${path}/${fileId}-${file.name}`);
  
  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};