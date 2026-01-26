export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Terms of Service & Data Agreement</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-500 mb-8 font-medium">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-wide text-sm">1. Binding Agreement & Affirmative Consent</h2>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                        By checking the agreement box and utilizing "Ana's Offer Flow" (the "Tool"), you hereby provide your **irrevocable affirmative consent** to be legally bound by these Terms and Conditions. If you do not agree to every provision herein, you are strictly prohibited from accessing or using the Tool.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-wide text-sm">2. Mandatory Newsletter Subscription (The "Quid Pro Quo")</h2>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                        Access to the Tool is provided free of charge in exchange for your agreement to join our digital community. By using this Tool, you explicitly agree and direct us to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                        <li>Enroll your provided email address into **Ana's "How We Grow" Substack**.</li>
                        <li>Receive regular marketing communications, business insights, and promotional offers.</li>
                        <li>Permit the tracking of engagement metrics related to said communications.</li>
                    </ul>
                    <p className="text-slate-700 mb-6 italic">
                        You may unsubscribe at any time after the initial delivery, but you acknowledge that your initial access was contingent upon this subscription agreement.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-wide text-sm">3. Intellectual Property & Commercial Use</h2>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                        All methodologies, AI prompts, and software logic underpinning the Tool remain the exclusive property of Ana Calin and How We Grow. While you own the specific "Output" (the generated offer stacks) for your own commercial use, you are strictly prohibited from reverse-engineering, scraping, or redistributing the Tool's underlying technology.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-wide text-sm">4. Professional Disclaimer & Limitation of Liability</h2>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                        The Tool provides AI-generated suggestions for educational and brainstorming purposes only. It does NOT constitute financial, legal, or professional business advice. Success in business depends on execution, market conditions, and individual effort.
                    </p>
                    <p className="text-slate-900 font-bold mb-6 bg-slate-50 p-4 border-l-4 border-slate-300">
                        IN NO EVENT SHALL ANA CALIN, HOW WE GROW, OR ITS AFFILIATES BE LIABLE FOR ANY FINANCIAL LOSS, BUSINESS INTERRUPTION, OR INCIDENTAL DAMAGES ARISING FROM THE USE OF THESE AI-GENERATED SUGGESTIONS. USE AT YOUR OWN DISCRETION AND RISK.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-wide text-sm">5. Data Privacy & Compliance</h2>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                        We collect and process your name and email address to provide the Tool's functionality and fulfill the subscription agreement mentioned in Section 2. We process data in accordance with our Privacy Policy and applicable data protection laws.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-wide text-sm">6. Amendments</h2>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                        We reserve the right to modify these terms at any time. Continued use of the Tool following any such changes constitutes your acceptance of the new Terms.
                    </p>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                    <a href="/ana-ai-offer-flow" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold transition-colors">
                        <span>← Return to Offer Flow</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

