import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CreditCard, Wallet, Landmark, CheckCircle, ArrowDownLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import { usePortfolioStore } from '../../stores/portfolioStore';
import toast from 'react-hot-toast';

export default function DepositWithdrawModal({ isOpen, onClose, initialTab = 'deposit' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [amount, setAmount] = useState('5000');
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { portfolio, fetchPortfolio } = usePortfolioStore();

  const handleAction = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    if (activeTab === 'withdraw' && val > (portfolio?.balance || 0)) {
      toast.error('Insufficient funds for this withdrawal.');
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate gateway

    // Update local store balance
    const currentBalance = portfolio?.balance || 0;
    const currentTotalValue = portfolio?.totalValue || 0;
    
    if (activeTab === 'deposit') {
      portfolio.balance = currentBalance + val;
      portfolio.totalValue = currentTotalValue + val;
      toast.success(`Successfully deposited ${formatCurrency(val)}!`);
    } else {
      portfolio.balance = currentBalance - val;
      portfolio.totalValue = currentTotalValue - val;
      toast.success(`Withdrawal of ${formatCurrency(val)} initiated successfully!`);
    }

    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-md bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-glow-cyan flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-dark-850">
            <div className="flex gap-2 p-0.5 bg-dark-950 rounded-xl border border-white/5">
              <button
                onClick={() => { setActiveTab('deposit'); setAmount('5000'); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  activeTab === 'deposit' 
                    ? 'bg-accent-cyan text-dark-950 shadow-[0_0_10px_rgba(0,212,255,0.3)]' 
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                Deposit
              </button>
              <button
                onClick={() => { setActiveTab('withdraw'); setAmount('5000'); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  activeTab === 'withdraw' 
                    ? 'bg-accent-cyan text-dark-950 shadow-[0_0_10px_rgba(0,212,255,0.3)]' 
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                Withdraw
              </button>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-dark-300 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">
                Amount ({activeTab === 'deposit' ? 'to Deposit' : 'to Withdraw'})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-mono font-bold text-dark-300">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 focus:border-accent-cyan/40 outline-none rounded-xl py-3 pl-8 pr-4 text-lg font-mono font-bold text-white transition-all"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-2">
                {['1000', '5000', '10000', '25000'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-dark-950 border border-white/5 text-dark-300 hover:text-white hover:border-white/10"
                  >
                    +${parseInt(val).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* DEPOSIT MODULE */}
            {activeTab === 'deposit' && (
              <div className="space-y-5">
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

                {/* QR Code Scan Mockup (UPI/GPAY/Paytm/PhonePe) */}
                {['gpay', 'phonepay', 'paytem'].includes(paymentMethod) && (
                  <div className="bg-dark-950/60 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-4">
                    <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider text-center">Scan QR Code via mobile app</p>
                    
                    {/* Simulated High-Tech Vector QR Code */}
                    <div className="w-36 h-36 bg-white p-2.5 rounded-2xl relative shadow-glow-cyan flex items-center justify-center">
                      <div className="absolute inset-0 bg-accent-cyan/10 rounded-2xl animate-pulse pointer-events-none" />
                      <svg className="w-full h-full text-dark-950" viewBox="0 0 100 100" fill="currentColor">
                        {/* QR Code corners */}
                        <path d="M5 5h25v25H5zm5 5h15v15H5zm5 5h5v5h-5zM70 5h25v25H70zm5 5h15v15H70zm5 5h5v5h-5zM5 70h25v25H5zm5 5h15v15H5zm5 5h5v5h-5z" />
                        {/* QR Code random bits */}
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

                {/* PayPal sandbox banner */}
                {paymentMethod === 'paypal' && (
                  <div className="bg-dark-950/50 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center space-y-3">
                    <p className="text-xs text-dark-300 text-center">Redirecting to secure PayPal Sandbox checkout gateway on confirmation.</p>
                  </div>
                )}
              </div>
            )}

            {/* WITHDRAW MODULE */}
            {activeTab === 'withdraw' && (
              <div className="space-y-4">
                <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-dark-400">Available Account Balance</span>
                    <span className="font-mono font-bold text-white">{formatCurrency(portfolio?.balance || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-dark-400">Amount to Withdraw</span>
                    <span className="font-mono font-bold text-white">{formatCurrency(parseFloat(amount) || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-accent-red font-bold">
                    <span>Remaining Balance</span>
                    <span className="font-mono">{formatCurrency((portfolio?.balance || 0) - (parseFloat(amount) || 0))}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Payout Payout Destination</label>
                  <select className="w-full bg-dark-950 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-white outline-none focus:border-accent-cyan/35">
                    <option>Bank Transfer (Visa/Rupay Direct)</option>
                    <option>PayPal Wallet Account Payout</option>
                    <option>UPI ID Address Destination</option>
                  </select>
                </div>
              </div>
            )}

            {/* Confirm action button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAction}
                disabled={isProcessing}
                className="w-full bg-accent-cyan text-dark-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-dark-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Transaction...
                  </>
                ) : (
                  <>
                    Confirm {activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'}
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-dark-400">
                <ShieldCheck size={12} className="text-accent-green" />
                <span>Secure 256-bit encrypted gateway</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
