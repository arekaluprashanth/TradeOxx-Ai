import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import { useMarketStore } from '../../stores/marketStore';
import { usePortfolioStore } from '../../stores/portfolioStore';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am Apexx Ai, your dedicated trading assistant. I am linked to live market quotes, your portfolio, and advanced financial LLM logic. Ask me anything about your balance, holdings, crypto, or stocks!',
    },
  ]);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const quotes = useMarketStore((state) => state.quotes);
  const { portfolio } = usePortfolioStore();

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const generateSmartResponse = async (query) => {
    const lowerQ = query.toLowerCase();
    
    // Simulate API thinking latency for realism
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 800));

    // 1. Identity Queries
    if (lowerQ.includes('who are you') || lowerQ.includes('your name') || lowerQ.includes('what are you') || lowerQ.includes('apexx')) {
      return "I am Apexx Ai, the advanced financial intelligence agent embedded inside TradeOxx AI. I operate on Claude 3.5 Sonnet / Opus level reasoning capabilities, specifically fine-tuned for high-speed technical analysis, risk management, and quantitative trade execution.";
    }

    if (lowerQ.includes('hello') || lowerQ.includes('hi ') || lowerQ.includes('hey') || lowerQ.includes('greetings')) {
      return "Hello! I'm Apexx Ai, your digital trading co-pilot. I can check your live portfolio, pull real-time asset quotes, or explain quantitative trading theories. What would you like to analyze today?";
    }

    // 2. Portfolio Queries (Live data integration)
    if (lowerQ.includes('balance') || lowerQ.includes('my portfolio') || lowerQ.includes('my money') || lowerQ.includes('holdings') || lowerQ.includes('total value')) {
      const cash = portfolio?.balance || 0;
      const total = portfolio?.totalValue || 0;
      const holdingsCount = portfolio?.holdings?.length || 0;
      
      let holdingDetails = "";
      if (holdingsCount > 0) {
        holdingDetails = "\n\nActive Positions:\n" + portfolio.holdings.map(h => 
          `• ${h.symbol}: ${h.quantity} units @ average cost ${formatCurrency(h.avgPrice || h.avgCost)}`
        ).join('\n');
      } else {
        holdingDetails = "\n\nYou currently hold no active positions in your portfolio.";
      }

      return `Apexx Ai Portfolio Audit:\n\n• Available Cash Balance: ${formatCurrency(cash)}\n• Total Portfolio Value: ${formatCurrency(total)}\n• Open Positions: ${holdingsCount}${holdingDetails}\n\nYou can fund your account using the "Deposit" section, or withdraw using the "Withdraw" section on your dashboard.`;
    }

    // 3. Market Quotes Queries (Live price lookup)
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'BTC', 'ETH', 'SOL', 'USDT', 'SPY', 'QQQ', 'IWM'];
    let matchedSymbol = null;
    for (const sym of symbols) {
      if (lowerQ.includes(sym.toLowerCase())) {
        matchedSymbol = sym;
        break;
      }
    }

    if (matchedSymbol && (lowerQ.includes('price') || lowerQ.includes('quote') || lowerQ.includes('rate') || lowerQ.includes('how much') || lowerQ.includes('value of'))) {
      const quote = quotes[matchedSymbol];
      if (quote) {
        const sign = quote.changePercent >= 0 ? '+' : '';
        const colorText = quote.changePercent >= 0 ? '🟢 Bullish' : '🔴 Bearish';
        return `Apexx Ai Market Report for ${matchedSymbol}:\n\n• Current Quote: ${formatCurrency(quote.price)}\n• 24h Change: ${sign}${quote.changePercent.toFixed(2)}%\n• Volume Activity: High\n• Market Outlook: ${colorText} momentum\n\nWould you like me to draft a trade recommendation or check indicators for ${matchedSymbol}?`;
      }
    }

    // 4. General Stock/Crypto queries
    if (lowerQ.includes('bitcoin') || lowerQ.includes('btc')) {
      const quote = quotes['BTC'];
      const priceStr = quote ? `trading at ${formatCurrency(quote.price)}` : 'trading in a consolidation range';
      return `Bitcoin (BTC) is currently ${priceStr}. On-chain data indicates massive institutional accumulation. From a technical standpoint, a breakout above the 50-day EMA could trigger strong upward continuation.`;
    }
    if (lowerQ.includes('ethereum') || lowerQ.includes('eth')) {
      const quote = quotes['ETH'];
      const priceStr = quote ? `trading at ${formatCurrency(quote.price)}` : 'exhibiting relative strength';
      return `Ethereum (ETH) is currently ${priceStr}. Sizable smart contract volumes and layer-2 adoption continue to support network valuation. Support ranges remain firm.`;
    }
    if (lowerQ.includes('tesla') || lowerQ.includes('tsla')) {
      const quote = quotes['TSLA'];
      const priceStr = quote ? `trading at ${formatCurrency(quote.price)}` : 'showing high volatility';
      return `Tesla (TSLA) is ${priceStr}. Option volumes are heavily skewed toward call contracts. Resistance remains at the short-term swing high.`;
    }

    // 5. How to Trade / Interface Help
    if (lowerQ.includes('how to trade') || lowerQ.includes('how to buy') || lowerQ.includes('how to sell') || lowerQ.includes('start trading')) {
      return "To place a trade, select any asset from your Watchlist on the Dashboard, click on it to open the chart panel, specify your trade type (Buy or Sell), enter the quantity, and confirm. Trades are processed instantly with real-time slippage metrics.";
    }

    if (lowerQ.includes('deposit') || lowerQ.includes('add cash') || lowerQ.includes('payment')) {
      return "To deposit funds, click 'Add Cash' on your dashboard. You can select your currency (USD or INR) and choose your preferred payment option: UPI QR Code scan (Paytm, GPay, PhonePe), Visa, Rupay card input, or PayPal.";
    }

    if (lowerQ.includes('withdraw') || lowerQ.includes('payout')) {
      return "To withdraw funds, click 'Withdraw' on the dashboard. Enter the amount in either USD or INR, select your payout method (Direct Bank Wire, PayPal, or UPI), and verify the withdrawal. Payout calculations include a flat 0.5% brokerage fee.";
    }

    // 6. Quantitative Terms
    if (lowerQ.includes('leverage')) {
      return "Leverage allows you to amplify your trading capital. In our Futures Desk, you can trade up to 100x leverage. Keep in mind: while leverage increases potential profits, it also heightens liquidation risk. Proper stop-losses are highly recommended.";
    }

    if (lowerQ.includes('refresh') || lowerQ.includes('hz') || lowerQ.includes('lag') || lowerQ.includes('speed')) {
      return "TradeOxx AI is built with an ultra-responsive layout running at up to 165Hz refresh rates. This allows charts, orders, and Apexx Ai response times to process dynamically with zero lag.";
    }

    // 7. General Financial Fallback (Opus style intelligent reasoning)
    const sophisticatedAnswers = [
      "Analyzing the macro parameters: global indices are currently showing consolidation. This volatility presents excellent entry opportunities for scalp-trading strategies. Which specific ticker are we auditing?",
      "From a risk-management perspective, it is critical to size your positions at no more than 2% of your available portfolio balance. Would you like to review risk parameters or backtest an active strategy?",
      "Looking at the technical indicators, the Relative Strength Index (RSI) is signaling a neutral condition. This suggests a continuation of the current range-bound channel before the next major breakout.",
      "That is a sophisticated question. Most algorithmic frameworks approach this by combining MACD momentum crossovers with volume profile distribution. Let me know if you would like me to explain this formula in detail!"
    ];

    return sophisticatedAnswers[Math.floor(Math.random() * sophisticatedAnswers.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const replyText = await generateSmartResponse(userMessage.text);
    
    const botResponse = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: replyText,
    };
    
    setIsTyping(false);
    setMessages((prev) => [...prev, botResponse]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-accent-cyan hover:text-accent-cyan/80 transition-colors relative"
        title="Ask Apexx AI"
      >
        <Sparkles size={20} className="absolute top-1 right-1 w-3 h-3 text-accent-purple animate-pulse" />
        <Bot size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-dark-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 origin-top-right"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-dark-800 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white relative">
                    <Bot size={18} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent-green border-2 border-dark-800 rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-1">
                      Apexx Ai <Sparkles size={12} className="text-accent-purple" />
                    </h3>
                    <p className="text-accent-cyan text-[10px] font-mono tracking-wider uppercase">Opus intelligence engine</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-dark-400 hover:text-white p-1 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide scroll-smooth overscroll-contain">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-dark-700 text-white'
                          : 'bg-dark-800 text-accent-cyan border border-white/5'
                      }`}
                    >
                      {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`max-w-[80%] p-3 text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-accent-purple to-accent-cyan text-white rounded-2xl rounded-br-none shadow-glow-cyan/20'
                          : 'bg-dark-800 text-dark-100 rounded-2xl rounded-bl-none border border-white/5 shadow-inner'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-dark-800 text-accent-cyan border border-white/5 flex items-center justify-center flex-shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="p-3 bg-dark-800 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-1.5 h-[42px]">
                      <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-dark-800 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Apexx Ai about the markets..."
                    className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-dark-400 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="p-2.5 bg-gradient-to-r from-accent-cyan to-accent-purple text-white rounded-xl shadow-glow-cyan hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
