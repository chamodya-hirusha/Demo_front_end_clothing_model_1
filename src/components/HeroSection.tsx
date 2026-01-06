import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-1.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-muted">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion model in luxury coat"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight"
          >
            Elevate Your Style
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-md"
          >
            Premium quality clothing for the modern lifestyle. Discover timeless pieces crafted with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Shop Now
              </Button>
            </Link>
            <Link to="/shop?category=new-arrivals">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                New Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
