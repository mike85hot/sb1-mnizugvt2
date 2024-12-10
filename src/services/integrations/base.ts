import { Integration, IntegrationConfig, SyncResult } from '../../types/integrations';
import { captureError } from '../../utils/errorHandling';
import { trackEvent } from '../../utils/analytics';

export abstract class BaseIntegration {
  protected abstract provider: string;
  protected abstract type: Integration['type'];

  protected async validateConfig(config: IntegrationConfig): Promise<boolean> {
    const requiredFields = ['apiKey', 'webhookUrl'];
    return requiredFields.every(field => config[field]);
  }

  protected async handleError(error: Error, context: string, metadata?: Record<string, any>) {
    captureError(error, { context, provider: this.provider, ...metadata });
    trackEvent({
      category: 'Integration',
      action: 'Error',
      label: `${this.provider}_${context}`
    });
    throw error;
  }

  protected async trackSuccess(action: string, metadata?: Record<string, any>) {
    trackEvent({
      category: 'Integration',
      action: 'Success',
      label: `${this.provider}_${action}`,
      ...metadata
    });
  }

  protected async validateWebhook(signature: string, payload: string, secret: string): Promise<boolean> {
    // Implement webhook signature validation
    return true;
  }
}