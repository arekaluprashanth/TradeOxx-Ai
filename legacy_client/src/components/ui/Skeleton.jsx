 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import React from 'react';
import { cn } from '../../services/utils';








export const Skeleton = ({
  className,
  width,
  height,
  variant = 'text',
}) => {
  const style = {
    width: _nullishCoalesce(width, () => ( undefined)),
    height: _nullishCoalesce(height, () => ( undefined)),
  };

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'bg-dark-800/50 border border-white/5 rounded-2xl p-5',
          className
        )}
        style={style}
      >
        <div className="skeleton h-4 w-1/3 mb-4 rounded" />
        <div className="skeleton h-8 w-2/3 mb-3 rounded" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
          <div className="skeleton h-3 w-4/6 rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div
        className={cn(
          'bg-dark-800/50 border border-white/5 rounded-2xl p-5',
          className
        )}
        style={style}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="flex gap-2">
            <div className="skeleton h-6 w-12 rounded" />
            <div className="skeleton h-6 w-12 rounded" />
            <div className="skeleton h-6 w-12 rounded" />
          </div>
        </div>
        <div className="skeleton w-full rounded" style={{ height: height || 300 }} />
      </div>
    );
  }

  // Default: text skeleton
  return (
    <div
      className={cn('skeleton rounded', className)}
      style={{
        width: _nullishCoalesce(width, () => ( '100%')),
        height: _nullishCoalesce(height, () => ( '1rem')),
      }}
    />
  );
};

// ── Skeleton Group ─────────────────────────────────────






export const SkeletonGroup = ({
  lines = 3,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={`${100 - i * 15}%`}
          height="0.75rem"
        />
      ))}
    </div>
  );
};

export default Skeleton;
