export default function FinancialDisclaimer() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Financial & AI Transparency Disclaimer</h1>
        
        <div className="prose prose-invert max-w-none text-slate-300">
          
          <div className="p-6 bg-red-950/30 border border-red-500/30 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-red-400 mt-0 mb-2">NOT FINANCIAL ADVICE</h2>
            <p className="text-red-200 m-0">
              The content, analysis, charts, and AI-generated insights provided on TradeOXX AI are for educational and informational purposes only. Nothing contained on this platform constitutes financial, investment, tax, or legal advice. 
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Risk of Trading</h2>
          <p>Trading in financial markets, including equities, options, forex, and cryptocurrencies, involves a high degree of risk. You could lose some or all of your initial investment. You should carefully consider your financial situation and consult a qualified financial advisor before making any investment decisions.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. AI Hallucinations & Inaccuracies</h2>
          <p>TradeOXX AI utilizes Large Language Models (LLMs) to generate summaries, insights, and educational content. While we strive for accuracy, AI models can and do make mistakes, commonly known as "hallucinations."</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI may generate false, outdated, or fundamentally incorrect data.</li>
            <li>AI may misinterpret market sentiment or technical indicators.</li>
            <li><strong>You must independently verify all information before making any decisions based on it.</strong></li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Accuracy & Latency</h2>
          <p>Market data displayed on TradeOXX AI may be delayed as specified by our exchange partners or data providers. We do not guarantee the timeliness, sequence, accuracy, or completeness of the market data. We are not liable for any interruptions, delays, or errors in the data feed.</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. No Endorsement</h2>
          <p>Any mention of specific securities, assets, or trading strategies does not constitute an endorsement or recommendation by TradeOXX AI to buy, sell, or hold that asset.</p>

          <div className="mt-12 p-4 bg-amber-950/30 border border-amber-500/20 rounded-lg">
            <p className="text-amber-400 text-sm">
              <strong>Legal Notice:</strong> This is a boilerplate disclaimer. Due to the strict regulations imposed by the SEC, FINRA, and other global regulatory bodies regarding financial information platforms, this disclaimer must be heavily reviewed by legal counsel before commercial launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
