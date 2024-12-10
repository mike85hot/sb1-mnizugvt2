export const INTEGRATION_CONFIGS = {
  flutterwave: {
    clientId: import.meta.env.VITE_FLUTTERWAVE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_FLUTTERWAVE_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/dashboard/settings/callback`,
    scope: ['transactions', 'transfers', 'payment_links'],
    authUrl: 'https://api.flutterwave.com/v3/oauth/authorize',
    tokenUrl: 'https://api.flutterwave.com/v3/oauth/token',
    apiBase: 'https://api.flutterwave.com/v3'
  },
  paystack: {
    clientId: import.meta.env.VITE_PAYSTACK_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_PAYSTACK_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/dashboard/settings/callback`,
    scope: ['transactions', 'transfers', 'customers'],
    authUrl: 'https://api.paystack.com/oauth/authorize',
    tokenUrl: 'https://api.paystack.com/oauth/token',
    apiBase: 'https://api.paystack.com'
  }
} as const;