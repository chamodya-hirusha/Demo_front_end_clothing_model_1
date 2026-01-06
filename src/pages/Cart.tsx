import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/useCartStore';
import { cn } from '@/lib/utils';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-4 bg-card rounded border border-border"
                  >
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-32 object-cover rounded"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-medium hover:underline truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.color,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                            }
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-semibold">${item.price * item.quantity}</span>
                          {item.originalPrice && (
                            <span className="block text-sm text-muted-foreground line-through">
                              ${item.originalPrice * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card p-6 rounded border border-border">
                  <h2 className="font-medium text-lg mb-4">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $100
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between font-semibold text-lg pt-4 mt-4 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button className="w-full mt-6" size="lg">
                    Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <Link
                    to="/shop"
                    className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
