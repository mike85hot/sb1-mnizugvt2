interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ category, action, label, value }: AnalyticsEvent): void => {
  if (import.meta.env.PROD) {
    try {
      // Track event using your analytics service
      console.log('Analytics Event:', {
        category,
        action,
        label,
        value,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }
};

export const trackPageView = (path: string): void => {
  if (import.meta.env.PROD) {
    try {
      // Track page view using your analytics service
      console.log('Page View:', {
        path,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }
};