import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CreditCard, Wallet, ShieldCheck, Loader2, ArrowLeft, Landmark } from 'lucide-react';
import { formatCurrency } from '../services/utils';
import { usePortfolioStore } from '../stores/portfolioStore';
import OtpModal from '../components/portfolio/OtpModal';
import toast from 'react-hot-toast';

export default function DepositPage() {
  const [step, setStep] = useState(1); // 1 = Amount Entry, 2 = Payment Channel Selector & QR
  const [amount, setAmount] = useState('5000');
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputCurrency, setInputCurrency] = useState('USD');
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const { portfolio } = usePortfolioStore();

  const handleProceedToPayment = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid deposit amount.');
      return;
    }
    setStep(2);
  };

  const handleDepositInitiate = () => {
    if (['visa', 'rupay'].includes(paymentMethod)) {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        toast.error('Please fill in your credit card credentials.');
        return;
      }
    }
    setIsOtpOpen(true);
  };

  const executeDeposit = async () => {
    let val = parseFloat(amount);
    if (inputCurrency === 'INR') {
      val = val / 83.0; // convert to USD base
    }

    setIsProcessing(true);
    setShowPaymentGate(true);

    // Simulate payment platform redirection
    await new Promise((resolve) => setTimeout(resolve, 2200));

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
    setShowPaymentGate(false);
    setStep(1); // Reset
  };

  // Calculate equivalent in alternate currency
  const enteredVal = parseFloat(amount) || 0;
  const inrEq = enteredVal * 83.0;
  const usdEq = enteredVal / 83.0;
  const upiAmount = inputCurrency === 'INR' ? enteredVal : inrEq;

  // Generate dynamic UPI payload
  const upiPayload = `upi://pay?pa=merchant@tradeoxx&pn=TradeOxx%20AI&am=${upiAmount.toFixed(2)}&cu=INR`;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
            <Landmark size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest block">Secure Payment Gateway</span>
            <h1 className="text-3xl font-black text-white mt-0.5">Deposit Funds</h1>
          </div>
        </div>
      </div>

      <div className="bg-dark-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-glow-cyan">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button 
                onClick={() => setStep(1)} 
                className="p-1.5 rounded-lg bg-dark-950 border border-white/5 text-dark-300 hover:text-white transition-all"
              >
                <ArrowLeft size={14} />
              </button>
            )}
            <h2 className="text-md font-bold text-white uppercase tracking-wider">
              {step === 1 ? "Step 1: Enter Deposit Amount" : "Step 2: Choose Payment Mode"}
            </h2>
          </div>
          <span className="text-xs text-dark-400">Step {step} of 2</span>
        </div>

        {/* STEP 1: AMOUNT SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Currency Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Input Currency</label>
                <div className="flex gap-1.5 p-0.5 bg-dark-950 rounded-lg border border-white/5">
                  <button
                    onClick={() => { setInputCurrency('USD'); }}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${inputCurrency === 'USD' ? 'bg-accent-cyan text-dark-955' : 'text-dark-400 hover:text-white'}`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => { setInputCurrency('INR'); }}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${inputCurrency === 'INR' ? 'bg-accent-cyan text-dark-955' : 'text-dark-400 hover:text-white'}`}
                  >
                    INR (₹)
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-dark-300">Wallet balance</span>
                <span className="font-mono text-white font-bold">{formatCurrency(portfolio?.balance || 0)}</span>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-mono font-bold text-dark-300">
                  {inputCurrency === 'USD' ? '$' : '₹'}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 focus:border-accent-cyan/40 outline-none rounded-2xl py-4 pl-10 pr-4 text-2xl font-mono font-bold text-white transition-all"
                  placeholder="0.00"
                />
              </div>

              {/* Conversion displays */}
              <div className="flex justify-between items-center text-xs text-dark-400 bg-dark-950/40 p-3 rounded-xl border border-white/5">
                <span>Rate conversion: 1 USD = 83.00 INR</span>
                <span className="font-mono text-accent-cyan font-bold">
                  {inputCurrency === 'USD' 
                    ? `₹${inrEq.toLocaleString(undefined, {minimumFractionDigits: 2})}` 
                    : `$${usdEq.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                  }
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2">
                {['1000', '5000', '10000', '25000'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="py-2.5 rounded-xl text-xs font-bold bg-dark-950 border border-white/5 text-dark-300 hover:text-white hover:border-white/10 hover:bg-dark-850 transition-all"
                  >
                    +{inputCurrency === 'USD' ? '$' : '₹'}{parseInt(val).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full bg-accent-cyan text-dark-955 py-4 rounded-2xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              Continue to Payment options
            </button>
          </div>
        )}

        {/* STEP 2: CHANNELS & DYNAMIC QR */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Amount Summary Panel */}
            <div className="bg-dark-950 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-dark-400 uppercase font-black tracking-wider">Deposit Value</span>
                <p className="text-lg font-bold text-white mt-0.5">
                  {inputCurrency === 'USD' 
                    ? `$${enteredVal.toLocaleString(undefined, {minimumFractionDigits: 2})}`
                    : `₹${enteredVal.toLocaleString(undefined, {minimumFractionDigits: 2})}`
                  }
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-dark-400 uppercase font-black tracking-wider">In-App Valuation</span>
                <p className="text-md font-mono font-bold text-accent-cyan mt-0.5">
                  {inputCurrency === 'USD' 
                    ? `₹${inrEq.toLocaleString(undefined, {minimumFractionDigits: 2})}`
                    : `$${usdEq.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                  }
                </p>
              </div>
            </div>

            {/* Channels Grid */}
            <div className="space-y-2">
              <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Choose Channel</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'gpay', label: 'Google Pay', icon: Wallet },
                  { id: 'phonepay', label: 'PhonePe', icon: QrCode },
                  { id: 'paytem', label: 'Paytm', icon: QrCode },
                  { id: 'paypal', label: 'PayPal', icon: Wallet },
                  { id: 'visa', label: 'Visa Card', icon: CreditCard },
                  { id: 'rupay', label: 'Rupay Card', icon: CreditCard }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all bg-dark-950 ${
                      paymentMethod === method.id
                        ? 'border-accent-cyan text-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                        : 'border-white/5 text-dark-300 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <method.icon size={18} />
                    <span className="text-[10px] font-bold">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic QR Display */}
            {['gpay', 'phonepay', 'paytem'].includes(paymentMethod) && (
              <div className="bg-dark-950/60 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
                <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider text-center">Dynamic UPI QR Code</p>
                <div className="w-40 h-40 bg-white p-3 rounded-2xl relative shadow-glow-cyan flex items-center justify-center">
                  <div className="absolute inset-0 bg-accent-cyan/10 rounded-2xl animate-pulse pointer-events-none" />
                  <svg className="w-full h-full text-dark-955" viewBox="0 0 100 100" fill="currentColor">
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
                <div className="text-center font-mono text-[9px] text-dark-300 max-w-sm break-all bg-dark-900 p-2.5 rounded-lg border border-white/5">
                  <strong>UPI URI: </strong> {upiPayload}
                </div>
                <div className="text-center">
                  <span className="text-xs text-white font-bold block">TradeOxx AI UPI Terminal</span>
                  <span className="text-xs text-accent-cyan font-bold mt-0.5 block">
                    Payable: ₹{upiAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </span>
                </div>
              </div>
            )}

            {/* Credit Card inputs */}
            {['visa', 'rupay'].includes(paymentMethod) && (
              <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
                <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider mb-1">Card Specifications</p>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
                />
                <input
                  type="text"
                  placeholder="16-Digit Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="flex-1 bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-1/3 bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
                  />
                </div>
              </div>
            )}

            {/* PayPal */}
            {paymentMethod === 'paypal' && (
              <div className="bg-dark-950/50 border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-xs text-dark-300">Will redirect to PayPal secure portal on checkout.</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDepositInitiate}
                className="w-full bg-accent-cyan text-dark-955 py-4 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                Confirm Payment & Request OTP
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-dark-400">
                <ShieldCheck size={12} className="text-accent-green" />
                <span>Encrypted 256-bit SSL gateway interface</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Redirect overlay */}
      <AnimatePresence>
        {showPaymentGate && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl text-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="space-y-6 max-w-sm"
            >
              <Loader2 className="animate-spin text-accent-cyan mx-auto" size={48} />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                  Redirecting to {paymentMethod.toUpperCase()}
                </h3>
                <p className="text-xs text-dark-300 leading-relaxed">
                  Initializing secure channel to authorize your deposit of {formatCurrency(inputCurrency === 'INR' ? parseFloat(amount) / 83 : parseFloat(amount))}...
                </p>
              </div>
              <div className="p-3 bg-dark-850 rounded-2xl border border-white/5 font-mono text-[10px] text-dark-400">
                Secure Channel: HTTPS_AES_256_GCM
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onVerify={executeDeposit}
        title="Approve Secure Deposit"
      />
    </div>
  );
}
