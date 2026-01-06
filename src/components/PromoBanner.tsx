import { X } from 'lucide-react';
import { useState } from 'react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-foreground text-background py-2.5 text-center text-sm relative">
      <p className="px-8">
        Free shipping on all orders over $100 | Use code <span className="font-semibold">LUXE20</span> for 20% off
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
