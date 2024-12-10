import { GoogleGenerativeAI } from '@google/generative-ai';
import { captureError } from './errorHandling';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export const generateInvestorESGReport = async (
  metrics: any,
  answers: Record<string, string | number>
) => {
  try {
    if (!genAI) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Generate a concise, investor-focused ESG report for a tech startup/e-commerce company. Use the following data:

      Metrics:
      ${JSON.stringify(metrics, null, 2)}

      Questionnaire Answers:
      ${JSON.stringify(answers, null, 2)}

      Structure the report as follows:
      1. ESG Highlights & Key Metrics
         - Focus on quantifiable achievements
         - Industry benchmarking
         - Year-over-year improvements

      2. Environmental Innovation
         - Data center efficiency
         - Cloud infrastructure sustainability
         - E-waste and hardware lifecycle management

      3. Social Impact & Digital Inclusion
         - Tech workforce diversity
         - Community tech education initiatives
         - Digital accessibility efforts

      4. Tech Governance & Security
         - AI ethics and responsible innovation
         - Data privacy framework
         - Security measures and certifications

      5. Forward-Looking Commitments
         - Specific sustainability targets
         - Digital inclusion goals
         - Governance enhancement plans

      Format in markdown with a focus on:
      - Metrics that matter to investors
      - Competitive advantages through ESG initiatives
      - Risk management and compliance
      - Growth opportunities through sustainability
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    captureError(error as Error, { context: 'generateInvestorESGReport' });
    throw new Error('Failed to generate investor ESG report');
  }
};

export const createShareableReport = async (reportContent: string): Promise<string> => {
  try {
    if (!reportContent) {
      throw new Error('Report content cannot be empty');
    }

    const reportId = uuidv4();
    const timestamp = new Date().toISOString().split('T')[0];
    const reportRef = ref(storage, `esg-reports/${timestamp}-${reportId}.md`);
    
    // Convert report content to Blob
    const reportBlob = new Blob([reportContent], { type: 'text/markdown' });
    
    // Upload to Firebase Storage
    await uploadBytes(reportRef, reportBlob);
    
    // Get shareable URL
    const shareableUrl = await getDownloadURL(reportRef);
    return shareableUrl;
  } catch (error) {
    captureError(error as Error, { context: 'createShareableReport' });
    throw new Error('Failed to create shareable report. Please try again.');
  }
};
export const generateESGReport = async (
  metrics: any,
  answers: Record<string, string | number>
) => {
  if (!genAI) {
    throw new Error('Gemini API key is not configured');
  }

  if (!metrics || !answers || Object.keys(answers).length === 0) {
    throw new Error('Metrics and answers are required');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Generate a comprehensive ESG (Environmental, Social, and Governance) report based on the following data:

      Metrics:
      ${JSON.stringify(metrics, null, 2)}

      Questionnaire Answers:
      ${JSON.stringify(answers, null, 2)}

      Please structure the report with:
      1. Executive Summary
      2. Environmental Impact Analysis
      3. Social Responsibility Assessment
      4. Governance Framework Review
      5. Key Achievements
      6. Areas for Improvement
      7. Recommendations
      8. Future Targets

      Focus on:
      - Quantitative analysis of metrics
      - Qualitative assessment of initiatives
      - Industry benchmarking where possible
      - Specific, actionable recommendations
      - Clear presentation of achievements and challenges

      Format the response in markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    captureError(error as Error, { context: 'generateESGReport' });
    throw new Error('Failed to generate ESG report');
  }
};