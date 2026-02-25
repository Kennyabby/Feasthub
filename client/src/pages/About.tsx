import { Layout } from "@/components/layout";
import { FeatureCard } from "@/components/ui-custom";
import { Users, Award, Leaf, MapPin, ChefHat, UtensilsCrossed, History } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

// Images
import heroBg from "@assets/stock_images/restaurant_interior__4c194c6a.jpg";
import servingImg1 from "@assets/stock_images/jollof_rice_with_gri_6e3baba3.jpg";
import servingImg2 from "@assets/stock_images/cocktail_drink_glass_696ec9f0.jpg";
import gallery1 from "@assets/stock_images/happy_customers_eati_ce18fe7b.jpg";
import gallery2 from "@assets/stock_images/professional_restaur_20b96f94.jpg";
import gallery3 from "@assets/stock_images/chef_presenting_a_go_8f87265b.jpg";


export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
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
            The story of a Port Harcourt hangout where good food and great music meet.
          </motion.p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-background">
        <div className="container max-w-screen-xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                   <ChefHat className="w-full h-full -rotate-12 translate-x-1/4 -translate-y-1/4" />
                </div>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest relative z-10">
                  <ChefHat className="h-5 w-5" /> The Plantain Planet Kitchen
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    From weekday lunches to late-night lounge service, our kitchen focuses on the kind of food Port Harcourt people actually crave: assorted, chicken, pepper soup, swallows, rich soups, nutritious proteins, and chilled bar drinks.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Every plate is designed to pair perfectly with cold beers, spirits, malt, Hollandia, Chi Exotic, and other refreshments from our bar and VIP sections.
                  </p>
                </div>
                <div className="pt-4 border-t border-border relative z-10">
                   <img src={gallery3} alt="Chef" className="rounded-xl w-full h-48 object-cover shadow-inner" />
                </div>
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
                <div className="relative rounded-2xl shadow-lg w-full h-64 overflow-hidden group">
                  <img src={servingImg1} alt="Port Harcourt Soups" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
                    <p className="text-sm md:text-base text-white font-bold drop-shadow-lg">
                      Signature Nigerian Soups & Seafood
                    </p>
                  </div>
                </div>
                <div className="relative rounded-2xl shadow-lg w-full h-64 overflow-hidden group">
                  <img src={servingImg2} alt="Chilled Drinks" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
                    <p className="text-sm md:text-base text-white font-bold drop-shadow-lg">
                      Chilled Drinks & Signature Cocktails
                    </p>
                  </div>
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
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
            <img src={servingImg1} alt="Food Gallery" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-bold">Authentic Port Harcourt Flavors</p>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden md:col-span-2 group">
            <img src={gallery1} alt="Vibe" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
              <p className="text-white text-base md:text-xl font-heading font-bold drop-shadow-md">
                Great Food, Great Music, Best Vibes.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group cursor-pointer">
            <img src={gallery2} alt="Lounge" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
            <Link href="/accommodation" className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors px-4 text-center">
              <p className="text-white text-sm md:text-base font-bold transition-transform group-hover:scale-105">
                VIP Lounge & Rooms
              </p>
              <span className="text-primary text-xs font-bold mt-2 uppercase tracking-widest border-b border-primary">Explore Service</span>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
