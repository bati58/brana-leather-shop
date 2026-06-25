import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'new' | 'bestseller' | 'last-one' | 'default';
  children?: React.ReactNode;
  className?: string;
}

const labels = {
  new: 'New',
  bestseller: 'Bestseller',
  'last-one': 'Last One',
  default: '',
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variantStyles = {
    new: 'bg-brand-gold text-white',
    bestseller: 'bg-brand-dark text-brand-gold border border-brand-gold',
    'last-one': 'bg-red-700 text-white',
    default: 'bg-brand-cream text-brand-dark',
  };

  return (
    <span
      className={cn(
        'inline-block px-2.5 py-0.5 text-xs font-medium rounded-full uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
    >
      {children || labels[variant]}
    </span>
  );
}
