import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, Minus, Plus, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/data/products';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = product ? isInWishlist(product.id) : false;
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Product not found</h1>
            <Link to="/shop">
              <Button variant="outline">Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: 'Please select a color',
        variant: 'destructive',
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed.`,
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
        description: `${product.name} has been saved.`,
      });
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted rounded">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-24 overflow-hidden rounded border-2 transition-colors',
                      selectedImage === index ? 'border-foreground' : 'border-transparent'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Badges */}
              <div className="flex gap-2">
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

              {/* Title & Price */}
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-medium">{product.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl md:text-2xl font-semibold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < Math.floor(product.rating) ? 'fill-foreground text-foreground' : 'text-border'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">
                  Color: {selectedColor || 'Select a color'}
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor === color.name
                          ? 'border-foreground ring-2 ring-foreground ring-offset-2'
                          : 'border-border'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">
                  Size: {selectedSize || 'Select a size'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[3rem] px-4 py-2 border border-border text-sm font-medium rounded transition-colors',
                        selectedSize === size && 'bg-foreground text-background border-foreground'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center border border-border rounded w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" onClick={handleWishlist}>
                  <Heart
                    className={cn(
                      'h-5 w-5',
                      inWishlist && 'fill-sale text-sale'
                    )}
                  />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">30 Day Returns</span>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-border space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Fabric</h3>
                  <p className="text-sm text-muted-foreground">{product.fabric}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Care Instructions</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.care.map((instruction, i) => (
                      <li key={i}>• {instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
