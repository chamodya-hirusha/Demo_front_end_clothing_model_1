import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products, getProductsByCategory } from '@/data/products';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'new-arrivals', label: 'New Arrivals' },
  { value: 'sale', label: 'Sale' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  // Use categoryParam directly as selectedCategory
  const selectedCategory = categoryParam;

  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(selectedCategory);
    
    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // newest - already sorted
        break;
    }

    return result;
  }, [selectedCategory, selectedSize, sortBy]);

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedSize(null);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-medium">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.value === selectedCategory)?.label}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredProducts.length} products
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-4 overflow-x-auto">
              {/* Desktop Category Filter */}
              <div className="hidden md:flex items-center gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={cn(
                      cat.value === 'sale' && selectedCategory !== cat.value && 'text-sale'
                    )}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border border-border rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {(selectedSize || selectedCategory !== 'all') && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-sm rounded">
                  {categories.find(c => c.value === selectedCategory)?.label}
                  <button onClick={() => handleCategoryChange('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedSize && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-sm rounded">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize(null)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 z-50 md:hidden"
            onClick={() => setShowFilters(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-medium">Filters</span>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* Category */}
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={cn(
                        'block w-full text-left py-2 text-sm transition-colors',
                        selectedCategory === cat.value ? 'text-foreground font-medium' : 'text-muted-foreground',
                        cat.value === 'sale' && 'text-sale'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={cn(
                        'px-3 py-1.5 border border-border text-sm rounded transition-colors',
                        selectedSize === size && 'bg-foreground text-background border-foreground'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <Button className="w-full" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
