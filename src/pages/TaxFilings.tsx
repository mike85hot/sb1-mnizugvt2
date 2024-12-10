import React, { useState } from 'react';
import { africanCountries } from '../data/africanTaxData';
import { CountryTaxInfo } from '../types/tax';
import { AlertCircle, ChevronRight, Calendar, Clock, FileText, AlertTriangle } from 'lucide-react';

const TaxFilings = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryTaxInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = africanCountries.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tax Registration Status</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            African Countries Requiring Registration
          </h2>
          <div className="text-sm text-gray-500 mb-4">
            Based on your business activity, you may need to register for VAT in the following countries.
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-4">
            {filteredCountries.map((country) => (
              <div 
                key={country.country}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedCountry(country)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {country.country}
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Registration threshold: {country.currency} {country.registrationThreshold.toLocaleString()}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      VAT rate: {country.vatRate}%
                    </div>
                    <div className="mt-1 text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Filing frequency: {country.filingFrequency}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {country.hasEconomicNexus && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Registration required
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCountry && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              <div className="flex items-center justify-between">
                <span>{selectedCountry.country} Tax Details</span>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                    <FileText className="w-4 h-4 mr-1" />
                    Download guide
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                    <Calendar className="w-4 h-4 mr-1" />
                    View deadlines
                  </button>
                </div>
              </div>
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Registration Requirements</h3>
                <p className="mt-1 text-sm text-gray-900">
                  You must register for VAT when your taxable supplies exceed {selectedCountry.currency} {selectedCountry.registrationThreshold.toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Filing Frequency</h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {selectedCountry.filingFrequency}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">VAT Rate</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedCountry.vatRate}%
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                    <p className="mt-1 text-sm text-yellow-700">Failure to register for VAT when required may result in penalties and interest charges.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Begin registration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxFilings;