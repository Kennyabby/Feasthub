import { Layout } from "@/components/layout";
import { FeatureCard } from "@/components/ui-custom";
import { Users, Award, Leaf, MapPin, ChefHat, UtensilsCrossed, History } from "lucide-react";
import { motion } from "framer-motion";

// Import downloaded images (assuming they will be downloaded by the parallel tool call)
// If not, we'll use placeholders or the ones we just requested
import chefTeamImg from '@assets/stock_images/professional_restaur_20b96f94.jpg';
import awardImg from '@assets/stock_images/restaurant_award_cer_213cee3d.jpg';
import ecoImg from '@assets/stock_images/eco_friendly_food_pa_28423af0.jpg';
import interiorImg from '@assets/stock_images/restaurant_interior__4c194c6a.jpg';
import freshImg from '@assets/stock_images/fresh_organic_vegeta_25d7111c.jpg';
import customersImg from '@assets/stock_images/happy_customers_eati_ce18fe7b.jpg';


export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={interiorImg} 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 container text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 text-glow"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
          >
            Redefining the art of food delivery with passion, quality, and speed.
          </motion.p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-background">
        <div className="container max-w-screen-xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img 
                  src={chefTeamImg} 
                  alt="Our Chefs" 
                  className="rounded-2xl shadow-2xl border border-white/10 relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/20 rounded-2xl -z-0 hidden md:block"></div>
                <div className="absolute -top-6 -left-6 w-2/3 h-2/3 bg-secondary/10 rounded-2xl -z-0 hidden md:block"></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Who We Are</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Passionate About Real Food</h3>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2024, Crave started with a simple mission: to prove that "fast food" doesn't have to mean "compromised quality". We noticed a gap in the market for meals that are delivered quickly but prepared with the care of fine dining.
                </p>
                <p>
                  Our kitchen is led by Executive Chef Michael Okon, who brings over 15 years of culinary expertise from top restaurants across Lagos and London. He believes that every dish tells a story, and we're here to share that story with you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-4xl font-bold text-foreground font-heading">15+</h4>
                  <span className="text-sm text-muted-foreground">Years of Experience</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-4xl font-bold text-foreground font-heading">50k+</h4>
                  <span className="text-sm text-muted-foreground">Happy Customers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why We Do What We Do</h2>
            <p className="text-muted-foreground text-lg">
              Our core values guide every decision we make, from the ingredients we source to the way we deliver your food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Users}
              title="Community First"
              description="We're more than just a business; we're part of the community. We hire locally and support local events."
            />
            <FeatureCard 
              icon={Award}
              title="Uncompromised Quality"
              description="We never cut corners. If an ingredient isn't fresh enough, it doesn't make it to your plate."
            />
            <FeatureCard 
              icon={Leaf}
              title="Sustainability"
              description="We use 100% biodegradable packaging and are constantly working to reduce our carbon footprint."
            />
          </div>
        </div>
      </section>

      {/* Fresh Ingredients Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container max-w-screen-xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 space-y-8"
            >
              <div>
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Farm to Table</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Freshness You Can Taste</h3>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Great food starts with great ingredients. That's why we've partnered with over 20 local farms to source our vegetables, poultry, and spices directly.
                </p>
                <p>
                  We receive fresh deliveries every morning. No frozen patties, no preservatives, just honest, real food prepared fresh daily. Our "Zero-Freezer" policy for vegetables ensures you get maximum nutrition and flavor in every bite.
                </p>
              </div>

              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-500"><Leaf className="h-5 w-5" /></div>
                  <span className="font-medium">100% Organic Vegetables</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-500"><UtensilsCrossed className="h-5 w-5" /></div>
                  <span className="font-medium">Antibiotic-Free Poultry</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-500"><History className="h-5 w-5" /></div>
                  <span className="font-medium">Sourced Daily, Never Frozen</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={freshImg} 
                  alt="Fresh Ingredients" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
                />
                 <img 
                  src={ecoImg} 
                  alt="Eco Packaging" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team/Gallery Strip */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container max-w-screen-xl px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Life at Crave</h2>
          <p className="text-muted-foreground">Peek behind the scenes of our kitchen and culture.</p>
        </div>
        
        {/* Simple masonry-style gallery using flex/grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-screen-2xl mx-auto">
          <div className="h-64 md:h-80 rounded-xl overflow-hidden">
            <img src={chefTeamImg} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Team" />
          </div>
          <div className="h-64 md:h-80 rounded-xl overflow-hidden md:col-span-2">
            <img src={customersImg} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Customers" />
          </div>
          <div className="h-64 md:h-80 rounded-xl overflow-hidden">
            <img src={awardImg} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Award" />
          </div>
        </div>
      </section>

    </Layout>
  );
}
