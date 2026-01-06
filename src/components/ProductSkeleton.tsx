import { motion } from 'framer-motion';

interface ProductSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 4 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-4"
        >
          <div className="aspect-[3/4] bg-muted rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
