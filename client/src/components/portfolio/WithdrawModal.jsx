import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Landmark, Wallet, ShieldCheck, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import { usePortfolioStore } from '../../stores/portfolioStore';
import toast from 'react-hot-toast';

export default function WithdrawModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('5000');
  const [payoutDest, setPayoutDest] = useState('bank');
  const [destDetails, setDestDetails] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputCurrency, setInputCurrency] = useState('USD');

  const { portfolio } = usePortfolioStore();

  const balance = portfolio?.balance || 0;
  
  const withdrawVal = useMemo(() => {
    const rawVal = parseFloat(amount) || 0;
    return inputCurrency === 'INR' ? rawVal / 83.0 : rawVal;
  }, [amount, inputCurrency]);

  // Perfect calculations
  const transactionFee = useMemo(() => {
    return withdrawVal * 0.005; // 0.5% flat fee
  }, [withdrawVal]);

  const totalDeduction = useMemo(() => {
    return withdrawVal + transactionFee;
  }, [withdrawVal, transactionFee]);

  const finalBalance = useMemo(() => {
    return balance - totalDeduction;
  }, [balance, totalDeduction]);

  const handleWithdraw = async () => {
    if (isNaN(withdrawVal) || withdrawVal <= 0) {
      toast.error('Please enter a valid withdrawal amount.');
      return;
    }

    if (totalDeduction > balance) {
      toast.error('Insufficient funds (including transaction fees) for this withdrawal.');
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate gateway

    // Update store balance
    portfolio.balance = finalBalance;
    portfolio.totalValue = (portfolio.totalValue || 0) - totalDeduction;

    // Add transaction to history
    if (!portfolio.transactions) portfolio.transactions = [];
    portfolio.transactions.unshift({
      id: `wit-${Date.now()}`,
      type: 'withdraw',
      amount: withdrawVal,
      fee: transactionFee,
      method: payoutDest.toUpperCase(),
      timestamp: Date.now(),
      status: 'success',
      startBalance: balance,
      endBalance: finalBalance
    });

    toast.success(`Successfully withdrew ${formatCurrency(withdrawVal)}!`);
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
              <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest block">Secure Payout</span>
              <h2 className="text-lg font-bold text-white mt-0.5">Withdraw Funds</h2>
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
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Amount to Withdraw</label>
                <span className="text-[10px] text-dark-400">Available: {formatCurrency(balance)}</span>
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
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-dark-950/50 border border-white/5 rounded-2xl p-4 space-y-3 text-xs">
              <p className="text-[10px] text-dark-400 font-black uppercase tracking-wider mb-1">Receipt Math Breakdown</p>
              
              <div className="flex justify-between items-center text-dark-300">
                <span>Current Account Balance</span>
                <span className="font-mono font-semibold">{formatCurrency(balance)}</span>
              </div>
              
              <div className="flex justify-between items-center text-dark-300">
                <span>Withdrawal Base Amount</span>
                <span className="font-mono font-semibold text-white">-{formatCurrency(withdrawVal)}</span>
              </div>

              <div className="flex justify-between items-center text-dark-300">
                <span>Brokerage Payout Fee (0.5%)</span>
                <span className="font-mono font-semibold text-accent-red">-{formatCurrency(transactionFee)}</span>
              </div>

              <div className="h-px bg-white/5 my-2" />

              <div className="flex justify-between items-center text-accent-green font-bold text-sm">
                <span>Estimated Final Balance</span>
                <span className="font-mono">{formatCurrency(finalBalance >= 0 ? finalBalance : 0)}</span>
              </div>
            </div>

            {/* Payout Options */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block mb-1.5">Payout Destination</label>
                <select 
                  value={payoutDest}
                  onChange={(e) => setPayoutDest(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-white outline-none focus:border-accent-cyan/35 cursor-pointer"
                >
                  <option value="bank">Bank Wire Transfer (Direct Deposit)</option>
                  <option value="paypal">PayPal Merchant Account Payout</option>
                  <option value="upi">UPI Address Destination (PhonePe/Paytm)</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder={
                    payoutDest === 'bank' ? 'Enter Bank Account / Routing Number' :
                    payoutDest === 'paypal' ? 'Enter PayPal Email Address' :
                    'Enter UPI ID Address (e.g. name@paytm)'
                  }
                  value={destDetails}
                  onChange={(e) => setDestDetails(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                />
              </div>
            </div>

            {/* Warning indicator */}
            {finalBalance < 0 && (
              <div className="p-3 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-start gap-2.5 text-accent-red text-xs font-semibold">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>Withdrawal amount exceeds available balance (including processing fee).</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWithdraw}
                disabled={isProcessing || finalBalance < 0}
                className="w-full bg-accent-cyan text-dark-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing Transaction...' : `Confirm Withdrawal`}
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-dark-400">
                <ShieldCheck size={12} className="text-accent-green" />
                <span>Secure 256-bit encrypted payout transfer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
