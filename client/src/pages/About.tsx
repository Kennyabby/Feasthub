import { Layout } from "@/components/layout";
import { FeatureCard } from "@/components/ui-custom";
import { Users, Award, Leaf } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="bg-muted/30 py-20 border-b border-border">
        <div className="container max-w-screen-md text-center px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Our Story</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Founded in 2024, Crave was born from a simple idea: exceptional food shouldn't be hard to get. We bridge the gap between gourmet dining and fast delivery.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80" 
              alt="Chefs cooking" 
              className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Passionate About Food</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our kitchen is led by award-winning chefs who believe that fast food doesn't have to mean low quality. We source our ingredients daily from local farms, ensuring that every bite is fresh, organic, and bursting with flavor.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether it's our signature smoky jollof rice or our hand-crafted burgers, we put love into every dish we serve.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Users}
            title="Expert Team"
            description="A dedicated team of chefs, riders, and support staff working round the clock."
          />
          <FeatureCard 
            icon={Award}
            title="Award Winning"
            description="Recognized as the 'Best Online Food Delivery Service' in 2024."
          />
          <FeatureCard 
            icon={Leaf}
            title="Eco Friendly"
            description="We use 100% biodegradable packaging to keep our planet safe."
          />
        </div>
      </div>
    </Layout>
  );
}
