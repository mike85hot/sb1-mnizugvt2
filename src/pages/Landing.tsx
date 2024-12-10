import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ArrowRight, Bot, Receipt, FileSpreadsheet } from 'lucide-react';

const Landing = () => {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold">Tizora</span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Bookkeeping and tax platform</span>
            <span className="block text-indigo-600">for African SMBs</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Focus on growing your business, while Tizora takes care of your bookkeeping, 
            income and sales taxes. Purpose built for tech startups and e-commerce brands.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Bot className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Insights</h3>
              <p className="mt-2 text-gray-500">
                Get real-time financial insights and tax recommendations powered by AI
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Receipt className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Automated Bookkeeping</h3>
              <p className="mt-2 text-gray-500">
                Automatic transaction categorization and financial statements
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FileSpreadsheet className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Tax Compliance</h3>
              <p className="mt-2 text-gray-500">
                Stay compliant with local tax regulations and file returns on time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Billed monthly, cancel anytime.
            </p>
          </div>
          <div className="mt-16 max-w-lg mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">Starting from</h3>
                <p className="mt-4 text-center">
                  <span className="text-5xl font-extrabold text-gray-900">$50</span>
                  <span className="text-xl font-medium text-gray-500">/month</span>
                </p>
                <Link
                  to="/login"
                  className="mt-8 block w-full bg-indigo-600 text-white text-center px-4 py-3 rounded-md hover:bg-indigo-700 text-lg font-medium"
                >
                  Get started
                </Link>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <span className="ml-3 text-base text-gray-600">Bookkeeping services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <span className="ml-3 text-base text-gray-600">Monthly financial statements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <span className="ml-3 text-base text-gray-600">Sales Tax</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <span className="ml-3 text-base text-gray-600">Year end corporate taxes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                About Tizora
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                We're building Africa's first AI-powered bookkeeping and tax platform,
                designed specifically for the unique needs of African SMBs and startups.
                Our mission is to simplify financial management and tax compliance,
                enabling businesses to focus on growth.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Built for African businesses',
                  'Compliant with local tax regulations',
                  'Powered by advanced AI technology',
                  'Dedicated support team',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <img
                className="rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800&h=600"
                alt="Team working"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-base text-gray-500 hover:text-gray-900">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#about" className="text-base text-gray-500 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2024 Tizora. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;