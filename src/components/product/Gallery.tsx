'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface GalleryProps {
  images: string[];
  productName: string;
}

export default function Gallery({ images, productName }: GalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-square rounded-lg overflow-hidden bg-brand-cream cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={images[selected]}
            alt={`${productName} - view ${selected + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={20} className="text-brand-dark" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'relative aspect-square rounded-md overflow-hidden border-2 transition-colors',
                selected === i ? 'border-brand-gold' : 'border-transparent hover:border-brand-dark/20'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        className="max-w-4xl bg-brand-dark p-0"
      >
        <div className="relative aspect-square">
          <Image
            src={images[selected]}
            alt={`${productName} enlarged`}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
        <div className="flex justify-center gap-2 p-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'relative w-16 h-16 rounded overflow-hidden border-2',
                selected === i ? 'border-brand-gold' : 'border-transparent'
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
