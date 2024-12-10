import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Integration } from '../types/integrations';
import { FlutterwaveIntegration } from '../services/integrations/flutterwave';
import { PaystackIntegration } from '../services/integrations/paystack';
import { OAuthManager } from '../services/integrations/oauth';
import { INTEGRATION_CONFIGS } from '../services/integrations/config';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

const flutterwaveIntegration = new FlutterwaveIntegration();
const paystackIntegration = new PaystackIntegration();

const oAuthManagers = {
  flutterwave: new OAuthManager(INTEGRATION_CONFIGS.flutterwave),
  paystack: new OAuthManager(INTEGRATION_CONFIGS.paystack)
};

const Settings = () => {
  const { currentUser } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (provider: string) => {
    setLoading(true);
    setError(null);

    try {
      if (provider in oAuthManagers) {
        const authUrl = await oAuthManagers[provider as keyof typeof oAuthManagers].initiateOAuth();
        window.location.href = authUrl;
      } else {
        throw new Error('Unsupported integration provider');
      }
    } catch (error) {
      setError('Failed to initiate connection. Please try again.');
      console.error('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Handle OAuth callback
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const provider = params.get('provider');

    if (code && state && provider) {
      handleOAuthCallback(code, state, provider);
    }
  }, []);

  const handleOAuthCallback = async (code: string, state: string, provider: string) => {
    try {
      setLoading(true);
      const manager = oAuthManagers[provider as keyof typeof oAuthManagers];
      const tokens = await manager.exchangeCode(code);
      
      let integration: Integration;
      if (provider === 'flutterwave') {
        integration = await flutterwaveIntegration.connect(currentUser?.uid || '', tokens.accessToken);
      } else if (provider === 'paystack') {
        integration = await paystackIntegration.connect(currentUser?.uid || '', tokens.accessToken);
      } else {
        throw new Error('Unknown provider');
      }

      setIntegrations(prev => [...prev, integration]);
    } catch (error) {
      setError('Failed to complete integration. Please try again.');
      console.error('OAuth callback error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
        <p className="mt-2 text-sm text-gray-500">
          Connect your business tools to automate your bookkeeping and tax filings.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: 'Flutterwave',
            description: 'Process payments across Africa',
            provider: 'flutterwave',
            connected: false
          },
          {
            name: 'Paystack',
            description: 'Accept payments in Nigeria and Ghana',
            provider: 'paystack',
            connected: false
          },
          {
            name: 'Stripe',
            description: 'Sync payment data and invoices',
            provider: 'stripe',
            connected: false
          },
          {
            name: 'Shopify',
            description: 'Import sales and customer data',
            provider: 'shopify',
            connected: false
          },
          {
            name: 'QuickBooks',
            description: 'Sync accounting data',
            provider: 'quickbooks',
            connected: false
          }
        ].map((integration) => (
          <div
            key={integration.provider}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {integration.name}
              </h3>
              {integration.connected ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : null}
            </div>
            <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
            <button
              onClick={() => handleConnect(integration.provider)}
              disabled={loading || integration.connected}
              className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                integration.connected
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'text-white bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : integration.connected ? (
                'Connected'
              ) : (
                'Connect'
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Integration Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Connecting your business tools helps us automate your bookkeeping
                and ensure accurate tax filings. All data is encrypted and securely
                stored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;