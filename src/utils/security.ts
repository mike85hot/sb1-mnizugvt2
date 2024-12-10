import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import app from '../config/firebase';

export const initSecurity = () => {
  if (import.meta.env.PROD) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true
    });
  }
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  return file.size <= maxSizeInMB * 1024 * 1024;
};