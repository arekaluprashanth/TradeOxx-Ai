import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Wallet, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../services/utils';
import { usePortfolioStore } from '../stores/portfolioStore';
import { useAuthStore } from '../stores/authStore';
import OtpModal from '../components/portfolio/OtpModal';
import toast from 'react-hot-toast';

export default function WithdrawPage() {
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

    setIsOtpOpen(true);
  };

  const executeWithdraw = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
            <Landmark size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest block">Secure Payout Verification</span>
            <h1 className="text-3xl font-black text-white mt-0.5">Withdraw Funds</h1>
          </div>
        </div>
      </div>

      <div className="bg-dark-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-glow-cyan">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <h2 className="text-md font-bold text-white uppercase tracking-wider">
            Enter Withdrawal Details
          </h2>
          <span className="text-xs text-dark-400 font-medium">Available: {formatCurrency(balance)}</span>
        </div>

        <div className="space-y-6">
          {/* Currency & Amount Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Payout Currency</label>
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

            {/* Conversion Display */}
            <div className="flex justify-between items-center text-xs text-dark-400 bg-dark-950/40 p-3 rounded-xl border border-white/5">
              <span>Exchange rate: 1 USD = 83.00 INR</span>
              <span className="font-mono text-accent-cyan font-bold">
                {inputCurrency === 'USD' 
                  ? `Equivalent: ₹${(parseFloat(amount || '0') * 83.0).toLocaleString(undefined, {minimumFractionDigits: 2})}` 
                  : `Equivalent: $${(parseFloat(amount || '0') / 83.0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                }
              </span>
            </div>
          </div>

          {/* Payout Channel Selector */}
          <div className="space-y-2">
            <label className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Payout Channel</label>
            <div className="flex gap-3">
              <button
                onClick={() => setPayoutType('bank')}
                className={`flex-1 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  payoutType === 'bank'
                    ? 'border-accent-cyan text-accent-cyan bg-dark-950 shadow-[0_0_10px_rgba(0,212,255,0.1)]'
                    : 'border-white/5 text-dark-300 hover:text-white'
                }`}
              >
                <Landmark size={16} />
                <span>Bank Transfer</span>
              </button>
              <button
                onClick={() => setPayoutType('upi')}
                className={`flex-1 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  payoutType === 'upi'
                    ? 'border-accent-cyan text-accent-cyan bg-dark-950 shadow-[0_0_10px_rgba(0,212,255,0.1)]'
                    : 'border-white/5 text-dark-300 hover:text-white'
                }`}
              >
                <Wallet size={16} />
                <span>UPI Payout</span>
              </button>
            </div>
          </div>

          {/* Form details parameters */}
          {payoutType === 'bank' ? (
            <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider">Verification credentials</p>
                <div className="group relative">
                  <HelpCircle size={14} className="text-dark-400 cursor-pointer" />
                  <span className="absolute bottom-full right-0 mb-1 w-48 p-2 rounded bg-dark-950 text-[9px] text-dark-200 border border-white/10 hidden group-hover:block z-20">
                    Account Name must exactly match your profile name: "{user?.name || 'Demo Trader'}"
                  </span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Account Holder Name (must match profile)"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
              />
              <input
                type="text"
                placeholder="10-Digit Linked Mobile Number"
                value={accountMobile}
                onChange={(e) => setAccountMobile(e.target.value)}
                className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
              />
              <input
                type="text"
                placeholder="Bank IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
              />
              <input
                type="text"
                placeholder="Bank Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
              />
              <input
                type="text"
                placeholder="Confirm Account Number"
                value={confirmAccountNumber}
                onChange={(e) => setConfirmAccountNumber(e.target.value)}
                className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
              />
            </div>
          ) : (
            <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
              <p className="text-[10px] text-dark-400 uppercase font-black tracking-wider">UPI Target Address</p>
              <input
                type="text"
                placeholder="Enter UPI ID Address (e.g. name@okhdfc)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-dark-950 border border-white/5 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-accent-cyan/35"
              />
            </div>
          )}

          {/* Calculations Breakdown */}
          <div className="bg-dark-950/50 border border-white/5 rounded-2xl p-5 space-y-3 text-xs">
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

          {/* Warnings */}
          {finalBalance < 0 && (
            <div className="p-4 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-start gap-2.5 text-accent-red text-xs font-semibold">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <span>Withdrawal amount exceeds available balance (including processing fee).</span>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleWithdrawInitiate}
              disabled={isProcessing || finalBalance < 0}
              className="w-full bg-accent-cyan text-dark-955 py-4 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Payout Request & Request OTP
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-dark-400">
              <ShieldCheck size={12} className="text-accent-green" />
              <span>Secure 256-bit encrypted payout transfer active</span>
            </div>
          </div>
        </div>
      </div>

      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onVerify={executeWithdraw}
        title="Approve Secure Withdrawal"
      />
    </div>
  );
}
