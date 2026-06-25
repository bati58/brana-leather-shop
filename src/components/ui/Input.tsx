import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-brand-dark mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 bg-white border border-brand-dark/20 rounded-md font-body text-brand-dark placeholder:text-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-brand-dark mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'w-full px-4 py-3 bg-white border border-brand-dark/20 rounded-md font-body text-brand-dark placeholder:text-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all resize-none',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
