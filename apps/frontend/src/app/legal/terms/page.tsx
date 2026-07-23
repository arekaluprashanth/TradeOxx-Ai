export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p className="text-sm text-slate-400 mb-8">Last Updated: October 2026</p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using TradeOXX AI, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Description of Service</h2>
          <p>TradeOXX AI provides an educational and analytical platform utilizing artificial intelligence to process financial market data. <strong>The Service does NOT provide personalized financial advice, investment recommendations, or brokerage services.</strong></p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. User Accounts</h2>
          <p>You are responsible for safeguarding the password that you use to access the Service. You agree not to disclose your password to any third party.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Acceptable Use of AI</h2>
          <p>Users must not attempt to reverse engineer, prompt-inject, or otherwise abuse the AI models provided within the Service. The outputs of the AI are for informational purposes only and should be verified independently.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p>In no event shall TradeOXX AI, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, resulting from your access to or use of the Service.</p>

          <div className="mt-12 p-4 bg-amber-950/30 border border-amber-500/20 rounded-lg">
            <p className="text-amber-400 text-sm">
              <strong>Legal Notice:</strong> This is a boilerplate Terms of Service for demonstration purposes. Before launching commercially, you must consult legal counsel to ensure compliance and adequate limitation of liability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
