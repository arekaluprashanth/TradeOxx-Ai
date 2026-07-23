export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p className="text-sm text-slate-400 mb-8">Last Updated: October 2026</p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
          <p>Welcome to TradeOXX AI. We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, and share your data when you use our platform.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, and authentication credentials.</li>
            <li><strong>Financial Data:</strong> Portfolios, watchlists, and trading preferences you input into the system.</li>
            <li><strong>AI Interactions:</strong> Prompts, questions, and conversations you have with our AI models to improve the service.</li>
            <li><strong>Usage Data:</strong> Device information, IP addresses, and browsing actions within the app.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use your information strictly to provide, maintain, and improve our services, including generating personalized AI insights and ensuring account security.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact our Data Protection Officer at privacy@tradeoxx.ai.</p>

          <div className="mt-12 p-4 bg-amber-950/30 border border-amber-500/20 rounded-lg">
            <p className="text-amber-400 text-sm">
              <strong>Legal Notice:</strong> This is a boilerplate privacy policy for demonstration purposes. Before launching commercially, you must consult legal counsel to ensure compliance with GDPR, CCPA, and other relevant data protection laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
