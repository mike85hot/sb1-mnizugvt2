import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  category: 'environmental' | 'social' | 'governance';
  text: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

const questions: Question[] = [
  // Environmental
  {
    id: 'env_1',
    category: 'environmental',
    text: 'What is your data center energy efficiency (PUE - Power Usage Effectiveness)?',
    type: 'number'
  },
  {
    id: 'env_2',
    category: 'environmental',
    text: 'What percentage of your cloud infrastructure uses renewable energy?',
    type: 'number'
  },
  {
    id: 'env_3',
    category: 'environmental',
    text: 'Do you have a hardware recycling program for end-of-life devices?',
    type: 'select',
    options: ['Yes, comprehensive', 'Yes, limited', 'In development', 'No']
  },
  {
    id: 'env_4',
    category: 'environmental',
    text: 'What percentage of your packaging materials are recyclable/biodegradable?',
    type: 'number'
  },
  {
    id: 'env_5',
    category: 'environmental',
    text: 'Describe your e-waste management practices:',
    type: 'text'
  },
  {
    id: 'social_1',
    category: 'social',
    text: 'What percentage of your tech roles are filled by underrepresented groups?',
    type: 'number'
  },
  {
    id: 'social_2',
    category: 'social',
    text: 'What is your gender pay gap in technical roles?',
    type: 'number'
  },
  {
    id: 'social_3',
    category: 'social',
    text: 'Do you have a formal program for hiring and training local tech talent?',
    type: 'select',
    options: ['Yes, established', 'Yes, in development', 'Planned', 'No']
  },
  {
    id: 'social_4',
    category: 'social',
    text: 'Describe your initiatives for digital inclusion and tech education in your community:',
    type: 'text'
  },
  {
    id: 'gov_1',
    category: 'governance',
    text: 'Do you have a dedicated committee for AI ethics and responsible innovation?',
    type: 'select',
    options: ['Yes, board level', 'Yes, executive level', 'In formation', 'No']
  },
  {
    id: 'gov_2',
    category: 'governance',
    text: 'Describe your data privacy and security governance framework:',
    type: 'text'
  },
  {
    id: 'gov_3',
    category: 'governance',
    text: 'What percentage of your board has tech/digital expertise?',
    type: 'number'
  },
  {
    id: 'gov_4',
    category: 'governance',
    text: 'How frequently do you conduct third-party security audits?',
    type: 'select',
    options: ['Quarterly', 'Semi-annually', 'Annually', 'As needed']
  },
  {
    id: 'gov_5',
    category: 'governance',
    text: 'Describe your approach to algorithmic bias monitoring and mitigation:',
    type: 'text'
  }
];

interface ESGQuestionnaireProps {
  onSubmit: (answers: Record<string, string | number>) => void;
  loading: boolean;
}

export const ESGQuestionnaire: React.FC<ESGQuestionnaireProps> = ({ onSubmit, loading }) => {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [currentSection, setCurrentSection] = useState<'environmental' | 'social' | 'governance'>('environmental');
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (id: string, value: string | number) => {
    setError(null);
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      setError(`Please complete all questions before generating the report.`);
      return;
    }

    try {
      onSubmit(answers);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
    }
  };

  const isComplete = (category: string) => {
    return questions
      .filter(q => q.category === category)
      .every(q => answers[q.id] !== undefined && answers[q.id] !== '');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">ESG Questionnaire</h2>
      
      <div className="flex space-x-4 mb-8">
        {(['environmental', 'social', 'governance'] as const).map((section) => (
          <button
            key={section}
            onClick={() => setCurrentSection(section)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentSection === section
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {isComplete(section) ? (
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
            )}
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        {questions
          .filter(q => q.category === currentSection)
          .map((question) => (
            <div key={question.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {question.text}
              </label>
              {question.type === 'text' ? (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                />
              ) : question.type === 'number' ? (
                <input
                  type="number"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <select
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  {question.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !Object.keys(answers).length}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating Report...' : 'Generate AI Report'}
          </button>
        </div>
      </form>
    </div>
  );
};