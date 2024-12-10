import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';
import { captureError } from './errorHandling';

type MetricType = 'CLS' | 'FID' | 'LCP' | 'TTFB' | 'FCP';

const reportMetric = (metric: { name: MetricType; value: number }) => {
  if (import.meta.env.PROD) {
    try {
      // Send to analytics or monitoring service
      console.log(`${metric.name}:`, Math.round(metric.value * 100) / 100);
      
      // Example thresholds based on Core Web Vitals
      const thresholds: Record<MetricType, number> = {
        CLS: 0.1,   // Good < 0.1, Poor > 0.25
        FID: 100,   // Good < 100ms, Poor > 300ms
        LCP: 2500,  // Good < 2.5s, Poor > 4s
        TTFB: 600,  // Good < 600ms
        FCP: 1800   // Good < 1.8s
      };

      if (metric.value > thresholds[metric.name]) {
        captureError(new Error(`Poor ${metric.name} value: ${metric.value}`), {
          metric: metric.name,
          value: metric.value,
          threshold: thresholds[metric.name]
        });
      }
    } catch (error) {
      captureError(error as Error);
    }
  }
};

export const reportWebVitals = (): void => {
  getCLS(reportMetric);
  getFID(reportMetric);
  getLCP(reportMetric);
  getTTFB(reportMetric);
  getFCP(reportMetric);
};