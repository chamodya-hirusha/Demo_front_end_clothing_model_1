import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=new-arrivals', label: 'New Arrivals' },
  { href: '/shop?category=men', label: 'Men' },
  { href: '/shop?category=women', label: 'Women' },
  { href: '/shop?category=sale', label: 'Sale' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md'
            : 'bg-background'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl md:text-2xl font-semibold tracking-wide"
            >
              LUXE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground/80 relative',
                    link.label === 'Sale' && 'text-sale',
                    location.pathname === link.href && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>

              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-foreground text-background rounded-full flex items-center justify-center">
                      {wishlistItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-foreground text-background rounded-full flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display text-xl font-semibold">LUXE</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'block py-3 text-lg font-medium transition-colors hover:text-foreground/80',
                      link.label === 'Sale' && 'text-sale'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
