import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Gemini API
vi.mock('../config/gemini', () => ({
  generateInvestorUpdate: vi.fn(),
}));

// Mock Firebase
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));