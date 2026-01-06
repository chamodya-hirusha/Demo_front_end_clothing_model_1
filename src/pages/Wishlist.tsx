import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useCartStore } from '@/stores/useCartStore';
import { useToast } from '@/hooks/use-toast';
import { getProductById } from '@/data/products';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleMoveToCart = (item: typeof items[0]) => {
    const product = getProductById(item.id);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        size: product.sizes[0],
        color: product.colors[0].name,
        quantity: 1,
      });
      removeItem(item.id);
      toast({
        title: 'Moved to cart',
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">Wishlist</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save items you love by clicking the heart icon on products.
              </p>
              <Link to="/shop">
                <Button>Start Shopping</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Image */}
                  <Link to={`/product/${item.id}`}>
                    <div className="aspect-[3/4] overflow-hidden bg-muted rounded mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="space-y-2">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-sm font-medium truncate hover:underline">{item.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Move to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
