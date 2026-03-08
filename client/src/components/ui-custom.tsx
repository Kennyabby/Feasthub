import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Star, Plus, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// Hero Section Component
export function HeroSection({ 
  headline, 
  subheadline, 
  ctaText, 
  images 
}: { 
  headline: string; 
  subheadline: string; 
  ctaText: string; 
  images: string[]; 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {images && images.length > 0 && (
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentImageIndex}
              src={images[currentImageIndex]} 
              alt="Hero Food" 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
      </div>

      <div className="container relative z-10 px-4 max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl space-y-8 py-6 md:py-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 md:mb-4 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now Serving at The Plantain Planet
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] text-glow">
            {headline}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-lg">
            {subheadline}
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-7 rounded-full font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40" asChild>
              <Link href="/menu">
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg px-10 py-7 rounded-full transition-all hover:border-white/40" asChild>
              <Link href="/about">
                Our Story
              </Link>
            </Button>
          </div>
          
          <div className="pt-8 pb-4 md:pb-6 flex items-center gap-8 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Chilled drinks & hot grills</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-secondary fill-secondary" />
              <span>The Plantain Planet favorites</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Food Product Card
export function FoodCard({
  product,
  showBothPrices = false,
  priceType,
  onRoomDetails,
}: {
  product: any;
  showBothPrices?: boolean;
  priceType?: "normal" | "vip";
  onRoomDetails?: (product: any) => void;
}) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {product.popular && (
          <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
            POPULAR
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium bg-yellow-500/10 px-1.5 py-0.5 rounded">
            <Star className="h-3 w-3 fill-current" />
            {product.rating}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col items-start">
            {showBothPrices ? (
              <>
                <span className="text-xs text-muted-foreground">Regular</span>
                <span className="text-lg font-bold text-primary">
                  ₦{Number(product.salesPrice ?? product.price).toLocaleString()}
                </span>
                {product.vipPrice !== undefined && Number(product.vipPrice) > 0 && (
                  <div className="mt-1">
                    <span className="text-xs text-muted-foreground">VIP</span>
                    <div className="text-sm font-semibold text-secondary">
                      ₦{Number(product.vipPrice).toLocaleString()}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <span className="text-xs text-muted-foreground">
                  {priceType === "vip" ? "VIP Price" : "Regular Price"}
                </span>
                <span className="text-lg font-bold text-primary">
                  ₦{Number(product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>
          <Button 
            size="sm" 
            className="rounded-full bg-muted text-muted-foreground cursor-not-allowed"
            disabled
          >
            {product.type === 'goods' ? 'IN-STOCK' : 'SERVICES'}
          </Button>
        </div>

        {String(product?.category || "").toLowerCase() === "room" && onRoomDetails && (
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onRoomDetails(product)}
            >
              Room Services
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Category Card
export function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/menu?category=${category.id}`} className="cursor-pointer flex flex-col items-center gap-3 group block w-full">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors p-1 mb-3">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <span className="font-heading font-medium text-lg group-hover:text-primary transition-colors">
          {category.name}
        </span>
      </motion.div>
    </Link>
  );
}

// Feature/Why Us Card
export function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:bg-card transition-colors">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
