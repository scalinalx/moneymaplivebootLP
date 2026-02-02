import React, { useState } from 'react';
import InputForm from './components/InputForm';
import EmailSequenceDisplay from './components/EmailSequenceDisplay';
import { generateEmailSequence } from './services/geminiService';
import { LaunchFormData, SequenceResponse } from './types';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
    const [sequenceData, setSequenceData] = useState<SequenceResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (data: LaunchFormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await generateEmailSequence(data);
            setSequenceData(response);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSequenceData(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[#fff1f2] selection:bg-rose-200">
            {/* Navigation / Header */}
            <nav className="w-full bg-white/70 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-rose-500 to-purple-600 p-2 rounded-lg text-white">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">
                            Launch<span className="text-rose-500">Stack</span>
                        </span>
                    </div>
                    <div className="hidden md:block text-sm text-gray-500 font-medium">
                        AI-Powered Campaign Architect
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Error Notification */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                        <button onClick={() => setError(null)} className="text-red-400 hover:text-red-500">
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                )}

                {/* Dynamic View */}
                {!sequenceData ? (
                    <div className="animate-fadeIn">
                        <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
                    </div>
                ) : (
                    <div className="animate-slideUp">
                        <EmailSequenceDisplay sequence={sequenceData.sequence} onReset={handleReset} />
                    </div>
                )}

            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} LaunchStack. Designed for conversion.</p>
            </footer>
        </div>
    );
};

export default App;
