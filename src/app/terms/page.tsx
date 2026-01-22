export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Terms & Conditions</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-slate-700 mb-4">
                        By accessing and using Ana's Offer Flow, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Use License</h2>
                    <p className="text-slate-700 mb-4">
                        Permission is granted to use this tool for personal and commercial purposes. The generated offer stacks are yours to use as you see fit.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Disclaimer</h2>
                    <p className="text-slate-700 mb-4">
                        The materials and suggestions provided by Ana's Offer Flow are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Limitations</h2>
                    <p className="text-slate-700 mb-4">
                        In no event shall Ana Calin or How We Grow be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ana's Offer Flow.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Revisions</h2>
                    <p className="text-slate-700 mb-4">
                        We may revise these terms of service at any time without notice. By using this tool you are agreeing to be bound by the then current version of these terms of service.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Contact</h2>
                    <p className="text-slate-700 mb-4">
                        For any questions regarding these terms, please contact us through <a href="https://howwegrowtoday.substack.com" className="text-rose-600 hover:text-rose-700 underline">How We Grow</a>.
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <a href="/" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium">
                        ← Back to Ana's Offer Flow
                    </a>
                </div>
            </div>
        </div>
    );
}
