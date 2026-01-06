import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

interface FeaturedProductsProps {
  title?: string;
  category?: string;
  limit?: number;
}

export function FeaturedProducts({ 
  title = 'Featured Products', 
  category,
  limit = 4 
}: FeaturedProductsProps) {
  const filteredProducts = category
    ? products.filter((p) => p.category === category || (category === 'new-arrivals' && p.isNew))
    : products;

  const displayProducts = filteredProducts.slice(0, limit);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-3xl md:text-4xl font-medium mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
