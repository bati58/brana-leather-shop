import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-display text-8xl text-brand-gold/30 mb-4">404</p>
        <h1 className="font-display text-3xl text-brand-dark mb-3">Page Not Found</h1>
        <p className="text-brand-gray font-body mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
