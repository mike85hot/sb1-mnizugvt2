import { GoogleGenerativeAI } from '@google/generative-ai';
import { captureError } from '../utils/errorHandling';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (import.meta.env.PROD && !GEMINI_API_KEY) {
  captureError(new Error('Missing Gemini API key in environment variables'));
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export const generateInvestorUpdate = async (metrics: {
  mrr: number;
  growth: number;
  runway: number;
  burn: number;
}) => {
  if (!genAI) {
    throw new Error('Gemini AI is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate a professional investor update email based on the following metrics:
    - Monthly Recurring Revenue (MRR): $${metrics.mrr.toLocaleString()}
    - Month-over-Month Growth: ${metrics.growth}%
    - Runway: ${metrics.runway} months
    - Monthly Burn: $${metrics.burn.toLocaleString()}

    Context: This is for an African tech startup/e-commerce business.

    Focus on:
    1. Key achievements and milestones
    2. Growth metrics and analysis
    3. Challenges and how we're addressing them
    4. Plans for the next month
    5. Areas where we need help
    6. Impact on the African tech ecosystem

    Write in a professional but conversational tone. Keep it concise but informative. 
    Include specific context about operating in African markets where relevant.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    captureError(error as Error, { context: 'generateInvestorUpdate', metrics });
    throw new Error('Failed to generate investor update');
  }
};