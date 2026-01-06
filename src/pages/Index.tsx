import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { PromoBanner } from '@/components/PromoBanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts title="New Arrivals" category="new-arrivals" limit={4} />
        <FeaturedProducts title="Best Sellers" limit={4} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
