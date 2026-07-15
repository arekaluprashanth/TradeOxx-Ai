import { useState } from 'react';
import { User, Shield, Bell, Key, LogOut, Copy, Check, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import FuturesDesk from '../components/dashboard/FuturesDesk';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Profile Settings');

  // Interactive profile state
  const [profileName, setProfileName] = useState(user?.name || 'Forex Trader');
  const [profileEmail] = useState(user?.email || 'trader@tradeoxx.ai');

  // Preferences toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [marketingAlerts, setMarketingAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Default Read-Only Key', key: 'pk_live_8f7b2c9a1d4e6f3a0b', created: '2026-07-10' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState('');

  const handleSaveProfile = () => {
    toast.success('Profile changes saved successfully!');
  };

  const handleAvatarChange = () => {
    toast.success('Avatar updated successfully!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Please fill out all password fields.');
      return;
    }
    toast.success('Security settings updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key.');
      return;
    }
    const newKey = {
      id: String(Date.now()),
      name: newKeyName.trim(),
      key: `pk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    toast.success('API Key generated successfully!');
  };

  const handleCopyKey = (keyText, id) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKeyId(id);
    toast.success('API Key copied to clipboard!');
    setTimeout(() => setCopiedKeyId(''), 2000);
  };

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    toast.error('API Key revoked.');
  };

  return (
    <div className="w-full space-y-6 pb-20 high-refresh-smooth">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Settings & Profile</h1>
        <p className="text-dark-300">Configure your paper trading profile, security, and developer keys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar Menu */}
        <div className="space-y-2">
          {[
            { icon: User, label: 'Profile Settings' },
            { icon: Shield, label: 'Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Key, label: 'API Keys' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                activeTab === item.label 
                  ? 'bg-accent-cyan/15 border-accent-cyan/30 text-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.1)]' 
                  : 'bg-dark-900/40 border-transparent text-dark-300 hover:text-white hover:border-white/5'
              }`}
            >
              <item.icon size={18} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-accent-red hover:bg-accent-red/5 border border-transparent hover:border-accent-red/10 transition-all mt-4"
          >
            <LogOut size={18} />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Settings Tab */}
          {activeTab === 'Profile Settings' && (
            <div className="space-y-6">
              <div className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4">Profile Information</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white text-xl font-bold shadow-glow-cyan">
                    {profileName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <Button variant="outline" size="sm" onClick={handleAvatarChange}>Change Avatar</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-dark-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={profileEmail}
                      disabled
                      className="w-full px-4 py-2.5 bg-dark-950/50 border border-white/5 rounded-xl text-dark-400 cursor-not-allowed"
                    />
                  </div>
                  <div className="pt-2">
                    <Button onClick={handleSaveProfile} className="hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]">Save Changes</Button>
                  </div>
                </div>
              </div>

              <div className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Email Notifications</p>
                      <p className="text-xs text-dark-400">Receive trade alerts and summaries via email</p>
                    </div>
                    <button 
                      onClick={() => setEmailAlerts(!emailAlerts)}
                      className={`w-10 h-6 rounded-full transition-all relative ${emailAlerts ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.3)]' : 'bg-dark-950 border border-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${emailAlerts ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Marketing Emails</p>
                      <p className="text-xs text-dark-400">Receive news and promotional offers</p>
                    </div>
                    <button 
                      onClick={() => setMarketingAlerts(!marketingAlerts)}
                      className={`w-10 h-6 rounded-full transition-all relative ${marketingAlerts ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.3)]' : 'bg-dark-950 border border-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${marketingAlerts ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <form onSubmit={handleUpdatePassword} className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl space-y-4">
                <h2 className="text-lg font-bold text-white">Change Password</h2>
                <div>
                  <label className="block text-xs font-bold text-dark-400 mb-1.5 uppercase tracking-wider">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-dark-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-dark-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-dark-400 mb-1.5 uppercase tracking-wider">New Password</label>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-dark-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all"
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>

              <div className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Two-Factor Authentication (2FA)</h3>
                  <p className="text-xs text-dark-400 mt-1">Protect your simulator account with custom auth credentials</p>
                </div>
                <button 
                  onClick={() => {
                    setTwoFactor(!twoFactor);
                    toast.success(twoFactor ? '2FA disabled' : '2FA activated successfully!');
                  }}
                  className={`w-10 h-6 rounded-full transition-all relative ${twoFactor ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.3)]' : 'bg-dark-950 border border-white/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${twoFactor ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'Notifications' && (
            <div className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl space-y-6">
              <h2 className="text-lg font-bold text-white">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Browser Push Notifications</h3>
                    <p className="text-xs text-dark-400 mt-0.5">Receive instant alerts for filled trades and margin calls</p>
                  </div>
                  <button 
                    onClick={() => setPushAlerts(!pushAlerts)}
                    className={`w-10 h-6 rounded-full transition-all relative ${pushAlerts ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.3)]' : 'bg-dark-950 border border-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pushAlerts ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Daily Telemetry digest</h3>
                    <p className="text-xs text-dark-400 mt-0.5">Receive portfolio telemetry updates and market analysis summaries</p>
                  </div>
                  <button 
                    onClick={() => {
                      toast.success('Telemetry digest settings updated');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-xs font-bold hover:border-accent-cyan text-white transition-all"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'API Keys' && (
            <div className="space-y-6">
              <div className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl space-y-4">
                <h2 className="text-lg font-bold text-white">Developer API Access</h2>
                <p className="text-xs text-dark-300 leading-relaxed">
                  Authenticate your custom algorithmic strategy backtesting bots and script engines to access simulator telemetry feeds.
                </p>

                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Key Label (e.g. Backtest Bot)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="flex-1 px-4 py-2 bg-dark-950 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent-cyan transition-all"
                  />
                  <Button onClick={handleCreateApiKey} size="sm" icon={<Plus size={14} />}>Generate</Button>
                </div>
              </div>

              {apiKeys.length > 0 && (
                <div className="bg-dark-850 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Keys</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {apiKeys.map((k) => (
                      <div key={k.id} className="p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">{k.name}</p>
                          <p className="text-xs font-mono text-dark-400 mt-1 truncate">{k.key}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => handleCopyKey(k.key, k.id)}
                            className="p-2 rounded-lg bg-dark-950 border border-white/10 hover:border-accent-cyan text-dark-300 hover:text-white transition-all"
                          >
                            {copiedKeyId === k.id ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
                          </button>
                          <button 
                            onClick={() => handleDeleteKey(k.id)}
                            className="p-2 rounded-lg bg-dark-950 border border-white/10 hover:border-accent-red text-dark-300 hover:text-accent-red transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <FuturesDesk />
      </div>
    </div>
  );
}
