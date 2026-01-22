export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
                    <p className="text-slate-700 mb-4">
                        We collect information you provide directly to us, including your name and email address when you sign up for Ana's Offer Flow.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="text-slate-700 mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-700 mb-4">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Send you updates and marketing communications (you can opt out at any time)</li>
                        <li>Respond to your comments and questions</li>
                        <li>Analyze usage patterns to improve user experience</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Information Sharing</h2>
                    <p className="text-slate-700 mb-4">
                        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Data Security</h2>
                    <p className="text-slate-700 mb-4">
                        We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Cookies</h2>
                    <p className="text-slate-700 mb-4">
                        We may use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to disable cookies through your browser settings.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Your Rights</h2>
                    <p className="text-slate-700 mb-4">
                        You have the right to access, update, or delete your personal information at any time. Contact us through <a href="https://howwegrowtoday.substack.com" className="text-rose-600 hover:text-rose-700 underline">How We Grow</a> to exercise these rights.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Changes to This Policy</h2>
                    <p className="text-slate-700 mb-4">
                        We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Contact Us</h2>
                    <p className="text-slate-700 mb-4">
                        If you have any questions about this Privacy Policy, please contact us through <a href="https://howwegrowtoday.substack.com" className="text-rose-600 hover:text-rose-700 underline">How We Grow</a>.
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
