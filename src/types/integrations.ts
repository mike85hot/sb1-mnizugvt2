export type IntegrationType = 'accounting' | 'payment' | 'ecommerce' | 'african_payment';

export interface Integration {
  id: string;
  type: IntegrationType;
  name: string;
  provider: string;
  connected: boolean;
  lastSync?: Date;
  status: 'active' | 'error' | 'disconnected';
  error?: string;
}

export interface IntegrationConfig {
  apiKey?: string;
  apiSecret?: string;
  refreshToken?: string;
  scope?: string[];
  webhookUrl?: string;
  metadata?: Record<string, any>;
  region?: string;
  currency?: string;
  settlementAccount?: {
    bankCode: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface SyncResult {
  success: boolean;
  message: string;
  timestamp: Date;
  details?: Record<string, any>;
}