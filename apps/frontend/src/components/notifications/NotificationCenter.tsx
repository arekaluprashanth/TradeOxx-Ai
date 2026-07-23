"use client";

import { useEffect, useState } from 'react';
import { useNotificationStore } from '@/store/useNotificationStore';
import { Bell, X, Check, Activity, ShieldAlert, Bot, Info } from 'lucide-react';
import Link from 'next/link';

export function NotificationCenter() {
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    // In a real app, this would also connect to a WebSocket to listen for real-time notifications
  }, [fetchNotifications]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const getIcon = (type: string) => {
    switch (type) {
      case 'MARKET': return <Activity size={16} className="text-brand-success" />;
      case 'SECURITY': return <ShieldAlert size={16} className="text-brand-danger" />;
      case 'AI': return <Bot size={16} className="text-brand-cyan" />;
      default: return <Info size={16} className="text-brand-textMuted" />;
    }
  };

  return (
    <div className="relative">
      
      {/* Trigger Button */}
      <button 
        onClick={toggleOpen}
        className="relative p-2 text-brand-textSecondary hover:text-white transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-cyan rounded-full border-2 border-brand-bgPrimary shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-brand-surfaceElevated border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]">
            
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-brand-bgPrimary/50 backdrop-blur-md">
              <h3 className="font-bold text-white flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-brand-cyan/20 text-brand-cyan text-xs px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={() => markAllAsRead()}
                    className="p-1.5 text-brand-textMuted hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                    title="Mark all as read"
                  >
                    <Check size={16} className="group-hover:text-brand-success" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-brand-textMuted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto custom-scrollbar flex-1 bg-brand-surface">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-brand-textMuted flex flex-col items-center justify-center gap-2">
                  <Bell size={24} className="opacity-20" />
                  <p>You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 flex gap-3 transition-colors ${notification.isRead ? 'opacity-60' : 'bg-brand-cyan/5 hover:bg-brand-cyan/10'}`}
                    >
                      <div className="mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-bold ${notification.isRead ? 'text-brand-textSecondary' : 'text-white'}`}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-brand-cyan hover:text-white p-1"
                              title="Mark as read"
                            >
                              <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-brand-textMuted mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        {notification.link && (
                          <Link 
                            href={notification.link}
                            onClick={() => {
                              markAsRead(notification.id);
                              setIsOpen(false);
                            }}
                            className="text-xs font-bold text-brand-cyan hover:text-white transition-colors mt-2 inline-block"
                          >
                            View details &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5 bg-brand-bgPrimary/50 text-center">
              <Link 
                href="/dashboard/settings/notifications" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-brand-textSecondary hover:text-white transition-colors"
              >
                Notification Preferences
              </Link>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
