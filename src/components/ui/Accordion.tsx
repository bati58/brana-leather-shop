'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-brand-dark/10 border border-brand-dark/10 rounded-lg overflow-hidden', className)}>
      {items.map((item, index) => (
        <div key={item.title} className="bg-white">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-brand-cream/50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-display text-lg text-brand-dark">{item.title}</span>
            <ChevronDown
              size={20}
              className={cn(
                'text-brand-gold transition-transform duration-200',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-6 pb-4 text-brand-gray font-body leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
