import { Layout } from "@/components/layout";
import { FeatureCard } from "@/components/ui-custom";
import { categories, products, testimonials } from "@/lib/data";
import { Clock, ShieldCheck, Truck, Quote, Smartphone, ChevronRight, Star, Utensils, Gift, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import heroImg from '@assets/stock_images/dark_food_website_he_af16fb5c.jpg'; 
import chefSpecialImg from '@assets/stock_images/chef_presenting_a_go_8f87265b.jpg'; 

// Hero Section Component
function HeroSection({ 
  headline, 
  subheadline, 
  ctaText, 
  image 
}: { 
  headline: string; 
  subheadline: string; 
  ctaText: string; 
  image: string; 
}) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt="Hero Food" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent/20" />
      </div>

      <div className="container relative z-10 px-4 max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Taking Orders Now
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
                {ctaText} <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg px-10 py-7 rounded-full transition-all hover:border-white/40" asChild>
              <Link href="/about">
                Our Story
              </Link>
            </Button>
          </div>
          
          <div className="pt-8 flex items-center gap-8 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>30-45 min Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-secondary fill-secondary" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Category Component
function CategoryItem({ category, index }: { category: any, index: number }) {
  return (
    <Link href={`/menu?category=${category.id}`} className="group block w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="flex flex-col items-center gap-4 p-4 rounded-2xl hover:bg-card/50 transition-colors"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all p-1">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <span className="font-heading font-bold text-lg group-hover:text-primary transition-colors text-center">
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
    <div className="flex flex-col items-center text-center space-y-4 relative">
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-bold font-heading text-primary">
        {number}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-[250px]">{description}</p>
    </div>
  );
}

export default function Home() {
  const popularProducts = products.filter(p => p.popular).slice(0, 4);

  return (
    <Layout>
      <HeroSection 
        headline="Taste the Extraordinary"
        subheadline="Gourmet meals crafted with passion, delivered hot to your doorstep in minutes."
        ctaText="Start Ordering"
        image={heroImg}
      />

      {/* Categories Strip */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container max-w-screen-xl px-4">
          <div className="flex justify-between items-end mb-10 px-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              What are you craving?
            </h2>
            <Link href="/menu" className="text-primary text-sm font-bold hover:underline flex items-center">
              View Full Menu <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {categories.map((cat, idx) => (
              <CategoryItem key={cat.id} category={cat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card/50">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Simple & Fast</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop only) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
            
            <ProcessStep 
              number="01" 
              title="Choose Your Meal" 
              description="Browse our diverse menu of gourmet burgers, local favorites, and more." 
            />
            <ProcessStep 
              number="02" 
              title="Fast Checkout" 
              description="Securely pay online or choose payment on delivery. It's that simple." 
            />
            <ProcessStep 
              number="03" 
              title="Track & Enjoy" 
              description="Watch your rider arrive in real-time and enjoy your hot, fresh meal." 
            />
          </div>
        </div>
      </section>

      {/* Chef's Special Feature */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container max-w-screen-xl px-4">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto">
                <img 
                  src={chefSpecialImg} 
                  alt="Chef's Special" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm">
                  <Utensils className="h-4 w-4" /> Chef's Recommendation
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                  The Royal Jollof Platter
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Experience the authentic taste of Nigeria with our signature smoky Jollof Rice, served with tender grilled turkey, fried plantains, and our secret spicy sauce. A meal fit for royalty.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="font-bold px-8 rounded-full" asChild>
                    <Link href="/menu">Order This Dish - ₦4,500</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-0 rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 blur-3xl -z-0 rounded-full -translate-x-1/2"></div>

        <div className="container max-w-screen-xl px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Crowd Favorites</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Trending This Week</h2>
            <p className="text-muted-foreground text-lg">
              The most ordered items from our kitchen. Tried, tested, and loved by thousands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {popularProducts.map((product, idx) => (
              <HomeFoodCard key={product.id} product={product} index={idx} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" className="font-bold text-lg px-8 py-6 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white transition-all" asChild>
              <Link href="/menu">See All Popular Meals</Link>
            </Button>
          </div>
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
                Order on the go with the <span className="text-primary">Crave App</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get exclusive deals, track your order in real-time, and enjoy faster checkout. Available for iOS and Android.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-black hover:bg-gray-200 h-14 px-6 rounded-xl flex items-center gap-3">
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase leading-none">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </Button>
                <Button variant="outline" className="border-white/20 h-14 px-6 rounded-xl flex items-center gap-3 bg-transparent hover:bg-white/5">
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase leading-none">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
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

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container max-w-screen-xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-4">
              <div className="flex items-center gap-2 text-black/60 font-bold uppercase text-sm">
                <Gift className="h-5 w-5" /> Exclusive Deals
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Get 15% Off Your First Order
              </h2>
              <p className="text-white/80 text-lg">
                Subscribe to our newsletter to get special offers, free delivery codes, and menu updates.
              </p>
            </div>
            <div className="md:w-1/2 w-full max-w-md">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-lg focus-visible:ring-white"
                />
                <Button variant="secondary" className="h-12 px-6 font-bold">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/60 mt-2">
                No spam. Unsubscribe anytime.
              </p>
            </div>
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
