import { captureError } from '../../utils/errorHandling';
import { trackEvent } from '../../utils/analytics';

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
  authUrl: string;
  tokenUrl: string;
}

export class OAuthManager {
  constructor(private config: OAuthConfig) {}

  async initiateOAuth(): Promise<string> {
    try {
      const params = new URLSearchParams({
        client_id: this.config.clientId,
        redirect_uri: this.config.redirectUri,
        scope: this.config.scope.join(' '),
        response_type: 'code',
        state: this.generateState()
      });

      return `${this.config.authUrl}?${params.toString()}`;
    } catch (error) {
      captureError(error as Error, { context: 'initiateOAuth' });
      throw new Error('Failed to initiate OAuth flow');
    }
  }

  async exchangeCode(code: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const response = await fetch(this.config.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
          redirect_uri: this.config.redirectUri,
          grant_type: 'authorization_code'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for tokens');
      }

      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      };
    } catch (error) {
      captureError(error as Error, { context: 'exchangeCode' });
      throw error;
    }
  }

  private generateState(): string {
    return Math.random().toString(36).substring(7);
  }
}