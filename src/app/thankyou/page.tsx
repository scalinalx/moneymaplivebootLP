export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-brand-950 text-brand-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8 border border-brand-800 bg-brand-900/60 px-8 py-12 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-brand-lime/10 border border-brand-lime/30">
          <span className="text-2xl font-display font-bold text-brand-lime">✓</span>
        </div>
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-lime">
            Thank You
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold">You’re on the waitlist</h1>
          <p className="text-brand-grey text-lg">
            You’ll be first to know when doors open—and you’ll get exclusive discounts for being here early.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-brand-grey">
            While you wait, grab Ana’s daily playbooks on monetizing newsletters.
          </p>
          <a
            href="https://howwegrowtoday.substack.com/"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-lime text-brand-950 font-display font-semibold uppercase tracking-wide hover:bg-brand-white transition-colors"
          >
            Get Daily Monetization Playbooks
          </a>
        </div>
      </div>
    </main>
  );
}
