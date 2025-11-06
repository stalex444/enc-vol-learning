import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
  showLabel = false,
  size = 'md',
  variant = 'default',
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const variants = {
    default: 'bg-butterfly-purple',
    gradient: 'bg-gradient-to-r from-butterfly-purple via-butterfly-blue to-butterfly-gold',
  };
  
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm text-gray-600">
          <span>Progress</span>
          <span className="font-semibold">{clampedValue}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full transition-all duration-500 ease-out', variants[variant])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
