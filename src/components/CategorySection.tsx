import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroMen from '@/assets/hero-2.jpg';

const categories = [
  {
    name: 'Women',
    href: '/shop?category=women',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800',
  },
  {
    name: 'Men',
    href: '/shop?category=men',
    image: heroMen,
  },
  {
    name: 'New Arrivals',
    href: '/shop?category=new-arrivals',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
  },
];

export function CategorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-3xl md:text-4xl font-medium mb-12"
        >
          Shop by Category
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={category.href}
                className="group block relative aspect-[3/4] overflow-hidden rounded bg-muted"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20 transition-opacity group-hover:bg-foreground/30" />
                <div className="absolute inset-0 flex items-end p-6 md:p-8">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-card">
                      {category.name}
                    </h3>
                    <span className="inline-block mt-2 text-sm text-card/80 border-b border-card/60">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
