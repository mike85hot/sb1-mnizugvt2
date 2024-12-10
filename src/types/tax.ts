export interface CountryTaxInfo {
  country: string;
  registrationThreshold: number;
  currency: string;
  vatRate: number;
  filingFrequency: 'monthly' | 'quarterly' | 'annually';
  hasEconomicNexus: boolean;
}

export interface TaxFiling {
  id: string;
  country: string;
  period: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  amount: number;
  currency: string;
}