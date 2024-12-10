import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { AIChatPanel } from './components/AIChatPanel';
import { PrivateRoute } from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Insights from './pages/Insights';
import DataRoom from './pages/DataRoom';
import ESGDashboard from './pages/ESGDashboard';
import InvestorUpdates from './pages/InvestorUpdates';
import TaxFilings from './pages/TaxFilings';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-100 flex">
                <Sidebar />
                <main className="flex-1 p-8 overflow-auto">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="data-room" element={<DataRoom />} />
                    <Route path="esg" element={<ESGDashboard />} />
                    <Route path="insights" element={<Insights />} />
                    <Route path="updates" element={<InvestorUpdates />} />
                    <Route path="tax-filings" element={<TaxFilings />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </main>
                <AIChatPanel />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;