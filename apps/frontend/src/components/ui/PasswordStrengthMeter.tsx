export function PasswordStrengthMeter({ password }: { password: string }) {
  const calculateStrength = () => {
    let strength = 0;
    if (password.length > 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strength = calculateStrength();
  
  const getColor = () => {
    if (strength === 0) return 'bg-white/10';
    if (strength <= 25) return 'bg-brand-danger';
    if (strength <= 50) return 'bg-brand-warning';
    if (strength <= 75) return 'bg-brand-cyan';
    return 'bg-brand-success';
  };

  const getLabel = () => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1 mb-1">
        {[25, 50, 75, 100].map((step) => (
          <div
            key={step}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              strength >= step ? getColor() : 'bg-white/10'
            }`}
          ></div>
        ))}
      </div>
      {strength > 0 && (
        <p className={`text-xs text-right ${strength >= 75 ? 'text-brand-success' : 'text-brand-textMuted'}`}>
          {getLabel()}
        </p>
      )}
    </div>
  );
}
