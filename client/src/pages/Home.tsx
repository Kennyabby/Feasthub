import { Layout } from "@/components/layout";
import { HeroSection, CategoryCard, FoodCard, FeatureCard } from "@/components/ui-custom";
import { categories, products, testimonials } from "@/lib/data";
import { Clock, ShieldCheck, Truck, Quote } from "lucide-react";
import { motion } from "framer-motion";

// Updated to the wide hero image
import heroImg from '@assets/stock_images/dark_food_website_he_af16fb5c.jpg'; 

export default function Home() {
  const popularProducts = products.filter(p => p.popular);

  return (
    <Layout>
      <HeroSection 
        headline="Delicious Meals Delivered Hot & Fresh 🔥"
        subheadline="Experience the best gourmet burgers, pizzas, and local favorites in town. Ready to eat in 30 minutes."
        ctaText="Order Food"
        image={heroImg}
      />

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container max-w-screen-xl px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Explore Our Menu
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Meals */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-screen-xl px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Popular Meals</h2>
              <p className="text-muted-foreground">Our customers' top picks this week.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <FoodCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container max-w-screen-xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Truck}
              title="Fast Delivery"
              description="We deliver within 30-45 minutes depending on your location. Hot and fresh."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Fresh Ingredients"
              description="We work with local farmers to ensure every meal is prepared with the freshest produce."
            />
            <FeatureCard 
              icon={Clock}
              title="Secure Payment"
              description="Seamless and secure payments powered by Paystack. Cards, transfers, and USSD accepted."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container max-w-screen-xl px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-8 rounded-2xl border border-border relative"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <span className="font-bold font-heading text-lg">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
