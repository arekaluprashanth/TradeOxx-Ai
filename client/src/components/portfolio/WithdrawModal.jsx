import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Landmark, Wallet, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { useAuthStore } from '../../stores/authStore';
import OtpModal from './OtpModal';
import toast from 'react-hot-toast';

export default function WithdrawModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('5000');
  const [payoutType, setPayoutType] = useState('bank'); // 'bank' or 'upi'
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputCurrency, setInputCurrency] = useState('USD');
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  // Bank Form State
  const [accountName, setAccountName] = useState('');
  const [accountMobile, setAccountMobile] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');

  // UPI Form State
  const [upiId, setUpiId] = useState('');

  const { portfolio } = usePortfolioStore();
  const { user } = useAuthStore();

  const balance = portfolio?.balance || 0;

  const withdrawVal = useMemo(() => {
    const rawVal = parseFloat(amount) || 0;
    return inputCurrency === 'INR' ? rawVal / 83.0 : rawVal;
  }, [amount, inputCurrency]);

  // Calculations
  const transactionFee = useMemo(() => {
    return withdrawVal * 0.005; // 0.5% flat fee
  }, [withdrawVal]);

  const totalDeduction = useMemo(() => {
    return withdrawVal + transactionFee;
  }, [withdrawVal, transactionFee]);

  const finalBalance = useMemo(() => {
    return balance - totalDeduction;
  }, [balance, totalDeduction]);

  const handleWithdrawInitiate = () => {
    if (isNaN(withdrawVal) || withdrawVal <= 0) {
      toast.error('Please enter a valid withdrawal amount.');
      return;
    }

    if (totalDeduction > balance) {
      toast.error('Insufficient funds (including transaction fees) for this withdrawal.');
      return;
    }

    // 1. Validation for Bank Account Type
    if (payoutType === 'bank') {
      if (!accountName || !accountMobile || !ifscCode || !accountNumber || !confirmAccountNumber) {
        toast.error('Please fill in all bank details.');
        return;
      }

      if (accountNumber !== confirmAccountNumber) {
        toast.error('Account numbers do not match. Please verify.');
        return;
      }

      // Verification check: Name matches user profile name
      const profileName = (user?.name || 'Demo Trader').toLowerCase().trim();
      const inputName = accountName.toLowerCase().trim();

      if (profileName !== inputName) {
        toast.error(`Verification Failed: Account Holder Name ("${accountName}") must exactly match your profile name ("${user?.name || 'Demo Trader'}").`);
        return;
      }

      // Verification check: Mobile matches user registered mobile (simulated)
      if (accountMobile.trim().length < 10) {
        toast.error('Please enter a valid 10-digit mobile number linked to your bank account.');
        return;
      }
    } else {
      // 2. Validation for UPI Payout
      if (!upiId || !upiId.includes('@')) {
        toast.error('Please enter a valid UPI ID (e.g. name@paytm).');
        return;
      }
    }

    // Trigger OTP check
    setIsOtpOpen(true);
  };

  const executeWithdraw = async () => {
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
      method: payoutType === 'bank' ? 'BANK TRANSFER' : `UPI (${upiId})`,
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
    <>
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
              {/* Currency Selector */}
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

                {/* Conversion Display */}
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

              {/* Payout Options */}
              <div className="space-y-3">
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Payout Channel</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPayoutType('bank')}
                    className={`flex-1 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      payoutType === 'bank'
                        ? 'border-accent-cyan text-accent-cyan bg-dark-950'
                        : 'border-white/5 text-dark-300 hover:text-white'
                    }`}
                  >
                    <Landmark size={14} />
                    <span>Bank Transfer</span>
                  </button>
                  <button
                    onClick={() => setPayoutType('upi')}
                    className={`flex-1 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      payoutType === 'upi'
                        ? 'border-accent-cyan text-accent-cyan bg-dark-950'
                        : 'border-white/5 text-dark-300 hover:text-white'
                    }`}
                  >
                    <Wallet size={14} />
                    <span>UPI Payout</span>
                  </button>
                </div>
              </div>

              {/* Form Input parameters */}
              {payoutType === 'bank' ? (
                <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider">Account Credentials Verification</p>
                    <div className="group relative">
                      <HelpCircle size={12} className="text-dark-400 cursor-pointer" />
                      <span className="absolute bottom-full right-0 mb-1 w-48 p-2 rounded bg-dark-950 text-[9px] text-dark-200 border border-white/10 hidden group-hover:block z-20">
                        Verification requires Account Name to exactly match your profile name: "{user?.name || 'Demo Trader'}"
                      </span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Account Holder Name (must match profile)"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                  <input
                    type="text"
                    placeholder="10-Digit Linked Mobile Number"
                    value={accountMobile}
                    onChange={(e) => setAccountMobile(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                  <input
                    type="text"
                    placeholder="Bank IFSC Code"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                  <input
                    type="text"
                    placeholder="Bank Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                  <input
                    type="text"
                    placeholder="Confirm Account Number"
                    value={confirmAccountNumber}
                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                </div>
              ) : (
                <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
                  <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider">UPI Payout Credentials</p>
                  <input
                    type="text"
                    placeholder="Enter UPI ID Address (e.g. name@okaxis)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-cyan/35"
                  />
                </div>
              )}

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
                  onClick={handleWithdrawInitiate}
                  disabled={isProcessing || finalBalance < 0}
                  className="w-full bg-accent-cyan text-dark-955 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Withdrawal & Request OTP
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

      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onVerify={executeWithdraw}
        title="Approve Secure Withdrawal"
      />
    </>
  );
}
