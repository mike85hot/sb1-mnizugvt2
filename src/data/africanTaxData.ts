import { CountryTaxInfo } from '../types/tax';

export const africanCountries: CountryTaxInfo[] = [
  {
    country: 'Egypt',
    registrationThreshold: 500000, // in EGP
    currency: 'EGP',
    vatRate: 14,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
  {
    country: 'Nigeria',
    registrationThreshold: 25000000, // in NGN
    currency: 'NGN',
    vatRate: 7.5,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
  {
    country: 'Kenya',
    registrationThreshold: 5000000, // in KES
    currency: 'KES',
    vatRate: 16,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
  {
    country: 'South Africa',
    registrationThreshold: 1000000, // in ZAR
    currency: 'ZAR',
    vatRate: 15,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
  {
    country: 'Ghana',
    registrationThreshold: 200000, // in GHS
    currency: 'GHS',
    vatRate: 12.5,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
  {
    country: 'Rwanda',
    registrationThreshold: 20000000, // in RWF
    currency: 'RWF',
    vatRate: 18,
    filingFrequency: 'quarterly',
    hasEconomicNexus: true
  },
  {
    country: 'Tanzania',
    registrationThreshold: 100000000, // in TZS
    currency: 'TZS',
    vatRate: 18,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
  {
    country: 'Uganda',
    registrationThreshold: 150000000, // in UGX
    currency: 'UGX',
    vatRate: 18,
    filingFrequency: 'monthly',
    hasEconomicNexus: true
  },
];