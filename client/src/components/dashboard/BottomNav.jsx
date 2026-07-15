import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, Crosshair, Star } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Explore', end: true },
  { to: '/portfolio', icon: Wallet, label: 'Portfolio' },
  { to: '/strategy', icon: Crosshair, label: 'Strategy' },
  { to: '/watchlist', icon: Star, label: 'Watchlist' },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-600 z-50 px-2 pb-safe-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-accent-blue' : 'text-dark-300 hover:text-white'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
