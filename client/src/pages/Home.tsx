import { Layout } from "@/components/layout";
import { FeatureCard, HeroSection } from "@/components/ui-custom"; // Use the exported HeroSection from ui-custom
import { testimonials } from "@/lib/data";
import { Clock, ShieldCheck, Truck, Quote, Smartphone, ChevronRight, Star, Utensils, Gift, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { fetchMenuProducts, fetchProductCategories, type MenuProduct, type ProductCategory } from "@/lib/products-api";

// Hero environment & food images for Plantain Planet home page
import heroImg1 from "@assets/stock_images/restaurant_interior__4c194c6a.jpg";
import heroImg2 from "@assets/stock_images/happy_customers_eati_ce18fe7b.jpg";
import heroImg3 from "@assets/stock_images/professional_restaur_20b96f94.jpg";
import heroImg4 from "@assets/stock_images/dark_food_website_he_af16fb5c.jpg";

// Category Component (uses live product categories)
function CategoryItem({ category, index }: { category: ProductCategory, index: number }) {
  return (
    <Link href={`/menu?category=${encodeURIComponent(category.code)}`} className="group block w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="flex flex-col items-center gap-4 p-4 rounded-2xl hover:bg-card/50 transition-colors"
      >
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-border bg-card text-sm font-semibold group-hover:border-primary group-hover:text-primary transition-colors text-center">
          {category.name}
        </span>
      </motion.div>
    </Link>
  );
}

// Updated Food Card for Home
function HomeFoodCard({ product, index }: { product: any, index: number }) {
  return (
    <Link href="/menu">
       <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 border border-white/5">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex justify-between items-end mb-2">
              <h3 className="font-heading text-xl font-bold text-white leading-tight line-clamp-2 flex-1 mr-2">
                {product.name}
              </h3>
              <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded">
                ₦{product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <Star className="h-3 w-3 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-300 text-xs truncate max-w-[150px]">{product.category}</span>
            </div>
          </div>

          {product.popular && (
            <span className="absolute top-4 right-4 bg-secondary text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              BESTSELLER
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

// Process Step Component
function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center space-y-4 relative"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-bold font-heading text-primary">
        {number}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-[250px]">{description}</p>
    </motion.div>
  );
}

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<MenuProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(true);
  const heroImages: string[] = [heroImg1, heroImg2, heroImg3, heroImg4];

  useEffect(() => {
    (async () => {
      const [menuProducts, fetchedCategories] = await Promise.all([
        fetchMenuProducts("normal"),
        fetchProductCategories(),
      ]);
      setPopularProducts(menuProducts.slice(0, 4));
      setCategories(fetchedCategories);
      setIsLoadingPopular(false);
      setIsLoadingCategories(false);
    })();
  }, []);

  return (
    <Layout>
      <HeroSection 
        headline="The Plantain Planet • Rivers"
        subheadline="All your favorite Nigerian meals, soups, swallows, and chilled drinks in one vibrant restaurant and lounge in Rivers."
        ctaText="View Food & Drinks Menu"
        images={heroImages}
      />

      {/* Categories Strip */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container max-w-screen-xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-10 px-2"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              What are you craving at The Plantain Planet?
            </h2>
            <Link href="/menu" className="text-primary text-sm font-bold hover:underline flex items-center">
              View Full Menu <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {isLoadingCategories
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 p-4">
                    <div className="w-24 h-8 rounded-full bg-muted animate-pulse" />
                  </div>
                ))
              : categories.map((cat, idx) => (
                  <CategoryItem key={cat.id} category={cat} index={idx} />
                ))}
          </div>
        </div>
      </section>

      {/* Rooms & Accommodation */}
      <section className="py-24 bg-card/40 border-y border-border/40">
        <div className="container max-w-screen-xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2"
          >
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Rooms & Accommodation</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2">
                Stay Above The Bar
              </h2>
              <p className="text-muted-foreground text-lg mt-4">
                Our lounge offers comfortable, private rooms for short rests and overnight stays, perfect for guests who want to enjoy Port Harcourt without rushing home.
              </p>
            </div>
            <Button size="lg" className="rounded-full font-bold group" asChild>
              <Link href="/accommodation">
                View All Rooms <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="h-48 overflow-hidden">
                <img src="/premises/images/photo1.jpeg" alt="Regular Rooms" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-bold">Regular Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    Cozy standard rooms with comfortable beds, AC, and private bathrooms for a full night's rest.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Starting from ₦15,000 / night
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="h-48 overflow-hidden">
                <img src="/premises/images/photo2.jpeg" alt="Short-Rest Room" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-bold">Short-Rest Room</h3>
                  <p className="text-muted-foreground text-sm">
                    Dedicated short-rest rooms for guests who need a private space to relax for a few hours.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Flexible Hourly Pricing
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="h-48 overflow-hidden">
                <img src="/premises/images/photo3.jpeg" alt="Room Service" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-bold">Room Service</h3>
                  <p className="text-muted-foreground text-sm">
                    Order from our full food and drinks menu directly to your door, served fresh from the kitchen.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    24/7 Guest Service
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card/50">
        <div className="container max-w-screen-xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm">At The Plantain Planet</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">How It Works</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop only) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
            
            <ProcessStep 
              number="01" 
              title="Scan & Browse" 
              description="Scan the QR on your table or visit our menu to see what's available tonight." 
            />
            <ProcessStep 
              number="02" 
              title="Pick Your Combo" 
              description="Choose your grills, drinks, and plantain sides just the way you like them." 
            />
            <ProcessStep 
              number="03" 
              title="Order & Relax" 
              description="Place your order with the bar or your waiter and enjoy The Plantain Planet experience." 
            />
          </div>
        </div>
      </section>

      {/* Chef's Special Feature */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container max-w-screen-xl px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/20 via-background to-secondary/10 border border-border rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm">
                  <Utensils className="h-4 w-4" /> Chef's Recommendation
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                  The Royal Jollof Platter
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Signature smoky jollof rice, grilled turkey or chicken, fried plantain, and a rich Port Harcourt-style pepper sauce. Exactly the kind of weekend plate you will find at The Plantain Planet.
                </p>
                <p className="text-sm text-muted-foreground">
                  Ask your waiter or the bar team about today's chef specials, portions, and pricing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="font-bold px-8 rounded-full" asChild>
                    <Link href="/menu">View Full Food & Drinks Menu</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[260px] md:h-[320px] rounded-3xl bg-black/40 border border-white/10 flex flex-col justify-center px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/60 to-secondary/30 opacity-80" />
                <div className="relative space-y-4 text-white">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold">What you can expect</h3>
                  <ul className="space-y-2 text-sm md:text-base text-white/90 list-disc list-inside">
                    <li>Jollof, fried rice, coconut rice, and native specials</li>
                    <li>Swallows with rich Port Harcourt soups and assorted proteins</li>
                    <li>Cold beers, spirits, Hollandia, Chi Exotic, malt, and soft drinks</li>
                    <li>Late-night bites served at the VIP lounge and open bar</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-0 rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 blur-3xl -z-0 rounded-full -translate-x-1/2"></div>

        <div className="container max-w-screen-xl px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Crowd Favorites</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Trending This Week</h2>
            <p className="text-muted-foreground text-lg">
              The most ordered items from our kitchen. Tried, tested, and loved by thousands.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoadingPopular
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden"
                  >
                    <div className="relative aspect-[4/5] bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))
              : popularProducts.map((product, idx) => (
                  <HomeFoodCard key={product.id} product={product} index={idx} />
                ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button size="lg" variant="outline" className="font-bold text-lg px-8 py-6 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white transition-all" asChild>
              <Link href="/menu">See All Popular Meals</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* App/Mobile Section */}
      <section className="py-24 bg-card border-y border-border overflow-hidden">
        <div className="container max-w-screen-xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Stay updated with <span className="text-primary">The Plantain Planet</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                This website is your official home for our full food and drinks menu, VIP lounge and room information, and special nights at Ozuoba / Rumuosi in Port Harcourt.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-black hover:bg-gray-200 h-14 px-6 rounded-xl flex items-center gap-3" asChild>
                  <Link href="/menu">
                    <Smartphone className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase leading-none">View</div>
                      <div className="text-sm font-bold">Food & Drinks Menu</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/20 h-14 px-6 rounded-xl flex items-center gap-3 bg-transparent hover:bg-white/5" asChild>
                  <Link href="/about">
                    <Utensils className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase leading-none">Explore</div>
                      <div className="text-sm font-bold">Rooms & Lounge Story</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative lg:h-[500px] flex justify-center items-center"
            >
              {/* Abstract representation of phone app */}
              <div className="relative w-[280px] h-[550px] bg-black border-8 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-700 z-10">
                <div className="absolute top-0 w-full h-full bg-background flex flex-col">
                  <div className="h-1/2 bg-primary/10 p-6 flex flex-col justify-end">
                    <div className="w-16 h-16 bg-primary rounded-full mb-4 shadow-lg shadow-primary/30"></div>
                    <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-800 rounded"></div>
                  </div>
                  <div className="h-1/2 p-4 grid grid-cols-2 gap-2">
                    <div className="bg-card rounded-xl h-32 animate-pulse"></div>
                    <div className="bg-card rounded-xl h-32 animate-pulse delay-75"></div>
                    <div className="bg-card rounded-xl h-32 animate-pulse delay-150"></div>
                    <div className="bg-card rounded-xl h-32 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
              {/* Decorative circles behind phone */}
              <div className="absolute w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-muted/20 border-b border-border">
        <div className="container max-w-screen-xl px-4 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-8 rounded-3xl border border-border relative shadow-sm hover:shadow-xl transition-shadow"
              >
                <Quote className="absolute top-8 right-8 h-10 w-10 text-primary/10" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-border pt-6">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                  <div>
                    <span className="font-bold font-heading text-lg block">{t.name}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Verified Buyer</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
