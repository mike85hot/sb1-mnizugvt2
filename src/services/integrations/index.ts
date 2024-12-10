import { Integration, IntegrationConfig } from '../../types/integrations';
import { db } from '../../config/firebase';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { captureError } from '../../utils/errorHandling';

export const connectIntegration = async (
  userId: string,
  integration: Integration,
  config: IntegrationConfig
): Promise<void> => {
  try {
    const integrationRef = doc(db, `users/${userId}/integrations/${integration.id}`);
    await setDoc(integrationRef, {
      ...integration,
      config,
      connected: true,
      lastSync: new Date(),
      status: 'active'
    });
  } catch (error) {
    captureError(error as Error, { context: 'connectIntegration', integration });
    throw new Error('Failed to connect integration');
  }
};

export const disconnectIntegration = async (
  userId: string,
  integrationId: string
): Promise<void> => {
  try {
    const integrationRef = doc(db, `users/${userId}/integrations/${integrationId}`);
    await updateDoc(integrationRef, {
      connected: false,
      status: 'disconnected',
      lastSync: new Date()
    });
  } catch (error) {
    captureError(error as Error, { context: 'disconnectIntegration', integrationId });
    throw new Error('Failed to disconnect integration');
  }
};