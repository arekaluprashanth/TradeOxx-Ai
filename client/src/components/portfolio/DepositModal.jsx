import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CreditCard, Wallet, Landmark, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import { usePortfolioStore } from '../../stores/portfolioStore';
import toast from 'react-hot-toast';

export default function DepositModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('5000');
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputCurrency, setInputCurrency] = useState('USD');

  const { portfolio } = usePortfolioStore();

  const handleDeposit = async () => {
    let val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    // Convert INR to USD base for internal portfolio store value calculations
    if (inputCurrency === 'INR') {
      val = val / 83.0;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate gateway

    const currentBalance = portfolio?.balance || 0;
    const currentTotalValue = portfolio?.totalValue || 0;
    
    // Perform calculation
    portfolio.balance = currentBalance + val;
    portfolio.totalValue = currentTotalValue + val;
    
    // Add transaction to history
    if (!portfolio.transactions) portfolio.transactions = [];
    portfolio.transactions.unshift({
      id: `dep-${Date.now()}`,
      type: 'deposit',
      amount: val,
      method: paymentMethod.toUpperCase(),
      timestamp: Date.now(),
      status: 'success',
      startBalance: currentBalance,
      endBalance: portfolio.balance
    });

    toast.success(`Successfully deposited ${formatCurrency(val)}!`);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-md bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-glow-cyan flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-dark-850">
            <div>
              <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest block">Secure Funding</span>
              <h2 className="text-lg font-bold text-white mt-0.5">Deposit Funds</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-dark-300 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Currency Selector & Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Select Currency</label>
                <div className="flex gap-1.5 p-0.5 bg-dark-950 rounded-lg border border-white/5">
                  <button
                    onClick={() => { setInputCurrency('USD'); }}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${inputCurrency === 'USD' ? 'bg-accent-cyan text-dark-955' : 'text-dark-400'}`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => { setInputCurrency('INR'); }}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${inputCurrency === 'INR' ? 'bg-accent-cyan text-dark-955' : 'text-dark-400'}`}
                  >
                    INR (₹)
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Amount to Deposit</label>
                <span className="text-[10px] text-dark-400">Current: {formatCurrency(portfolio?.balance || 0)}</span>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-mono font-bold text-dark-300">
                  {inputCurrency === 'USD' ? '$' : '₹'}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 focus:border-accent-cyan/40 outline-none rounded-xl py-3 pl-8 pr-4 text-lg font-mono font-bold text-white transition-all"
                  placeholder="0.00"
                />
              </div>

              {/* Live Conversion Display helper */}
              <div className="flex justify-between items-center text-[10px] text-dark-400">
                <span>Exchange rate: 1 USD = 83.00 INR</span>
                <span className="font-mono text-accent-cyan">
                  {inputCurrency === 'USD' 
                    ? `Equivalent: ₹${(parseFloat(amount || '0') * 83.0).toLocaleString(undefined, {minimumFractionDigits: 2})}` 
                    : `Equivalent: $${(parseFloat(amount || '0') / 83.0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                  }
                </span>
              </div>

              <div className="flex gap-2">
                {['1000', '5000', '10000', '25000'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-dark-950 border border-white/5 text-dark-300 hover:text-white hover:border-white/10"
                  >
                    +{inputCurrency === 'USD' ? '$' : '₹'}{parseInt(val).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Payment Options</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gpay', label: 'GPay', icon: Wallet },
                  { id: 'paypal', label: 'PayPal', icon: Wallet },
                  { id: 'visa', label: 'Visa', icon: CreditCard },
                  { id: 'rupay', label: 'Rupay', icon: CreditCard },
                  { id: 'phonepay', label: 'PhonePe', icon: QrCode },
                  { id: 'paytem', label: 'Paytm', icon: QrCode }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all bg-dark-950 ${
                      paymentMethod === method.id
                        ? 'border-accent-cyan text-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                        : 'border-white/5 text-dark-300 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <method.icon size={16} />
                    <span className="text-[10px] font-bold">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code Scan Mockup */}
            {['gpay', 'phonepay', 'paytem'].includes(paymentMethod) && (
              <div className="bg-dark-950/60 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-4">
                <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider text-center">Scan QR Code via mobile app</p>
                <div className="w-36 h-36 bg-white p-2.5 rounded-2xl relative shadow-glow-cyan flex items-center justify-center">
                  <div className="absolute inset-0 bg-accent-cyan/10 rounded-2xl animate-pulse pointer-events-none" />
                  <svg className="w-full h-full text-dark-950" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M5 5h25v25H5zm5 5h15v15H5zm5 5h5v5h-5zM70 5h25v25H70zm5 5h15v15H70zm5 5h5v5h-5zM5 70h25v25H5zm5 5h15v15H5zm5 5h5v5h-5z" />
                    <rect x="40" y="10" width="5" height="15" />
                    <rect x="50" y="5" width="10" height="5" />
                    <rect x="45" y="25" width="15" height="10" />
                    <rect x="10" y="40" width="20" height="5" />
                    <rect x="5" y="50" width="10" height="10" />
                    <rect x="25" y="45" width="5" height="15" />
                    <rect x="75" y="40" width="15" height="5" />
                    <rect x="70" y="50" width="10" height="15" />
                    <rect x="90" y="45" width="5" height="10" />
                    <rect x="40" y="70" width="15" height="5" />
                    <rect x="50" y="80" width="10" height="15" />
                    <rect x="45" y="75" width="15" height="5" />
                    <rect x="75" y="70" width="5" height="15" />
                    <rect x="85" y="75" width="10" height="15" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="text-xs text-white font-bold block">TradeOxx UPI Gateway</span>
                  <span className="text-[10px] text-dark-400 mt-0.5 block">merchant@tradeoxx</span>
                </div>
              </div>
            )}

            {/* Card Payment Form */}
            {['visa', 'rupay'].includes(paymentMethod) && (
              <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
                <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider mb-2">Secure Card Details</p>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="flex-1 bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-1/3 bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                </div>
              </div>
            )}

            {/* PayPal sandox */}
            {paymentMethod === 'paypal' && (
              <div className="bg-dark-950/50 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                <p className="text-xs text-dark-300">Redirecting to secure PayPal Checkout gateway on confirmation.</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDeposit}
                disabled={isProcessing}
                className="w-full bg-accent-cyan text-dark-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing Transaction...' : `Confirm Deposit of ${formatCurrency(parseFloat(amount) || 0)}`}
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-dark-400">
                <ShieldCheck size={12} className="text-accent-green" />
                <span>Secure 256-bit encrypted deposit</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
