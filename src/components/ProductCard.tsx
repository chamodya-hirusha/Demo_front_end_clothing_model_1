import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
      });
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded">
          <img
            src={product.images[0]}
            alt={product.name}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              isHovered && product.images[1] && 'opacity-0'
            )}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-all duration-500',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 text-xs font-medium bg-foreground text-background">
                NEW
              </span>
            )}
            {discount && (
              <span className="px-2 py-1 text-xs font-medium bg-sale text-sale-foreground">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className={cn(
              'absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 bg-background/95 hover:bg-background text-foreground backdrop-blur-sm"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/95 hover:bg-background backdrop-blur-sm"
              onClick={handleWishlist}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  inWishlist && 'fill-sale text-sale'
                )}
              />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium truncate">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {/* Color Options */}
          <div className="flex items-center gap-1 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
