import { Layout } from "@/components/layout";
import { FeatureCard } from "@/components/ui-custom";
import { Users, Award, Leaf, MapPin, ChefHat, UtensilsCrossed, History } from "lucide-react";
import { motion } from "framer-motion";


export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/40 via-black to-secondary/40">
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_55%)]" />
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
            The story of a Port Harcourt hangout where good food and great music meet.
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
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest">
                  <ChefHat className="h-5 w-5" /> The Plantain Planet Kitchen
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  From weekday lunches to late-night lounge service, our kitchen focuses on the kind of food Port Harcourt people actually crave: assorted, chicken, pepper soup, swallows, rich soups, nutritious proteins, and chilled bar drinks.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Every plate is designed to pair perfectly with cold beers, spirits, malt, Hollandia, Chi Exotic, and other refreshments from our bar and VIP sections.
                </p>
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
                  The Plantain Planet is a neighborhood restaurant, VIP lounge, and open bar created for people who love good Nigerian food, cold drinks, and relaxed nights out with friends.
                </p>
                <p>
                  From rich rice dishes and grills to sharable bar snacks and cocktails, we focus on simple, satisfying meals made to enjoy on-site at our Port Harcourt location.
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

      {/* Plantain Planet Food & Drinks Section */}
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
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">What We Serve</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Food and drinks the Port Harcourt way</h3>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At The Plantain Planet, the focus is on comforting Nigerian meals and lounge bites you can actually enjoy in Port Harcourt – jollof and fried rice, swallows with rich soups, grilled meats, and sharable plates for the table.
                </p>
                <p>
                  Everything is prepared fresh from our kitchen and bar so you can relax, eat, and sip without worrying about delivery apps or third-party menus. What you see on this website is what you can order on ground at Ozuoba / Rumuosi.
                </p>
              </div>

              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-500"><Leaf className="h-5 w-5" /></div>
                  <span className="font-medium">Rice specials, swallows, and Port Harcourt soups</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-500"><UtensilsCrossed className="h-5 w-5" /></div>
                  <span className="font-medium">Grilled proteins, peppered meats, and bar snacks</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-500"><History className="h-5 w-5" /></div>
                  <span className="font-medium">Cold beers, spirits, malt, Hollandia, Chi Exotic, and soft drinks</span>
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
                <div className="rounded-2xl shadow-lg w-full h-64 bg-gradient-to-br from-primary/40 via-background to-secondary/30 flex items-center justify-center text-center px-4">
                  <p className="text-sm md:text-base text-white/90 font-medium">
                    Signature Port Harcourt pots simmering with native soups, seafood, and assorted meats.
                  </p>
                </div>
                <div className="rounded-2xl shadow-lg w-full h-64 bg-gradient-to-br from-secondary/40 via-background to-primary/30 flex items-center justify-center text-center px-4">
                  <p className="text-sm md:text-base text-white/90 font-medium">
                    Chilled drinks on ice: beers, spirits, cocktails, malt, Hollandia, Chi Exotic, and more.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team/Gallery Strip */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container max-w-screen-xl px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Life at The Plantain Planet</h2>
          <p className="text-muted-foreground">A glimpse into our restaurant, VIP lounge, and open bar experience.</p>
        </div>
        
        {/* Simple masonry-style gallery using flex/grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-screen-2xl mx-auto">
          <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary/40 via-background to-secondary/40 flex items-center justify-center px-4 text-center">
            <p className="text-white/90 text-sm md:text-base font-medium">
              After-work chill spots with music, football on screen, and easy access to food and drinks.
            </p>
          </div>
          <div className="h-64 md:h-80 rounded-xl overflow-hidden md:col-span-2 bg-gradient-to-br from-secondary/40 via-background to-primary/40 flex items-center justify-center px-4 text-center">
            <p className="text-white/90 text-sm md:text-base font-medium">
              Friends and colleagues gathering for birthdays, link-ups, and game nights in Port Harcourt.
            </p>
          </div>
          <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary/30 via-background to-secondary/30 flex items-center justify-center px-4 text-center">
            <p className="text-white/90 text-sm md:text-base font-medium">
              VIP lounge and room service for guests who want a more private "The Plantain Planet" experience.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
}
