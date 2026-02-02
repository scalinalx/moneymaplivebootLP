'use client';

import React, { useState } from 'react';
import { EmailDay } from '../types';
import { Copy, Check, ChevronDown, ChevronUp, Lightbulb, Calendar, Rocket, Clock, CheckCircle } from 'lucide-react';

interface EmailSequenceDisplayProps {
    sequence: EmailDay[];
    onReset: () => void;
}

const getPhaseColor = (phase: string) => {
    switch (phase) {
        case 'Pre-Launch':
            return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'Launch Day':
            return 'bg-rose-500 text-white border-rose-500 shadow-rose-200 shadow-md';
        case 'Post-Launch':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getPhaseIcon = (phase: string) => {
    switch (phase) {
        case 'Pre-Launch':
            return <Clock size={14} className="mr-1" />;
        case 'Launch Day':
            return <Rocket size={14} className="mr-1" />;
        case 'Post-Launch':
            return <CheckCircle size={14} className="mr-1" />;
        default:
            return null;
    }
};

const EmailCard: React.FC<{ day: EmailDay; isOpen: boolean; onToggle: () => void }> = ({ day, isOpen, onToggle }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const contentToCopy = `Send Date: ${day.formattedDate}\nSubject: ${day.subject}\nPreview: ${day.previewText}\n\n${day.body.replace(/<br\/>/g, '\n').replace(/<[^>]+>/g, '')}`;
        navigator.clipboard.writeText(contentToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isLaunchDay = day.phase === 'Launch Day';

    return (
        <div className={`
      border rounded-2xl bg-white overflow-hidden transition-all duration-300
      ${isLaunchDay ? 'border-rose-300 shadow-md' : 'border-gray-200 shadow-sm hover:shadow-md'}
    `}>
            <div
                onClick={onToggle}
                className={`
          p-5 cursor-pointer flex justify-between items-center transition-colors relative
          ${isOpen ? 'bg-rose-50/50' : 'bg-white hover:bg-gray-50'}
        `}
            >
                {/* Left Side: Date & Info */}
                <div className="flex items-start md:items-center gap-4 w-full">
                    {/* Date Box */}
                    <div className={`
                hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-xl border flex-shrink-0
                ${isLaunchDay ? 'bg-rose-500 border-rose-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600'}
            `}>
                        <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                            {day.formattedDate?.split(',')[0]}
                        </span>
                        <span className="text-xl font-bold leading-none mt-1">
                            {day.formattedDate?.split(' ')[2]}
                        </span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border
                        ${getPhaseColor(day.phase)}
                    `}>
                                {getPhaseIcon(day.phase)}
                                {day.phase}
                            </span>
                            <span className="text-xs text-gray-400 font-medium flex items-center gap-1 md:hidden">
                                <Calendar size={12} /> {day.formattedDate}
                            </span>
                        </div>
                        <h4 className={`font-bold text-lg leading-tight truncate pr-4 ${isLaunchDay ? 'text-rose-600' : 'text-gray-800'}`}>
                            {day.subject}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 truncate">{day.previewText}</p>
                    </div>
                </div>

                {/* Right Side: Toggle Icon */}
                <div className="flex items-center gap-3 pl-2">
                    <span className={`
                flex items-center justify-center w-8 h-8 rounded-full transition-colors
                ${isOpen ? 'bg-rose-200 text-rose-700' : 'bg-gray-100 text-gray-400'}
             `}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="p-6 md:p-8 animate-fadeIn border-t border-gray-100">
                    {/* Strategy Note */}
                    <div className="mb-6 bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3">
                        <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                        <div>
                            <h5 className="font-bold text-amber-800 text-xs uppercase tracking-wide mb-1">Psychological Strategy</h5>
                            <p className="text-amber-900 text-sm leading-relaxed">{day.strategyNote}</p>
                        </div>
                    </div>

                    {/* Email Body */}
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Content</span>
                    </div>
                    <div className="prose prose-rose max-w-none text-gray-700 bg-gray-50/80 p-6 rounded-xl border border-gray-100 font-serif leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: day.body }} />
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <Calendar size={14} />
                            Scheduled for: <span className="text-gray-600">{day.formattedDate}</span>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm
                ${copied
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-rose-100 text-rose-700 border border-rose-200 hover:bg-rose-200 hover:shadow-md'
                                }
              `}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy Email'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const EmailSequenceDisplay: React.FC<EmailSequenceDisplayProps> = ({ sequence, onReset }) => {
    // Try to default open the Launch Day email (Day Offset 0)
    const launchDayIndex = sequence.findIndex(d => d.dayOffset === 0);
    const [openIndex, setOpenIndex] = useState<number | null>(launchDayIndex !== -1 ? launchDayIndex : 0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 font-sans tracking-tight">Your Launch Timeline</h2>
                    <p className="text-gray-500 mt-1">High-converting, psychology-backed copy.</p>
                </div>
                <button
                    onClick={onReset}
                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all text-sm font-bold shadow-sm"
                >
                    Create New Sequence
                </button>
            </div>

            <div className="space-y-4 relative">
                {/* Simple vertical line connector for desktop */}
                <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200 hidden md:block -z-10"></div>

                {sequence.map((day, index) => (
                    <EmailCard
                        key={index}
                        day={day}
                        isOpen={openIndex === index}
                        onToggle={() => toggleIndex(index)}
                    />
                ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-rose-500 to-purple-700 rounded-3xl text-white text-center shadow-xl shadow-rose-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Ready for Lift Off? 🚀</h3>
                    <p className="text-rose-100 max-w-lg mx-auto mb-6 text-lg">
                        Your sequence is mapped to your calendar dates. Import these into your email tool and schedule them now!
                    </p>
                    <button onClick={() => window.print()} className="bg-white text-rose-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-rose-50 transition-colors shadow-lg">
                        Print / Save PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailSequenceDisplay;
