import { Layout } from "@/components/layout";
import { CheckCircle2, ChefHat, Truck, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderTracking() {
  const steps = [
    { id: 1, title: "Order Received", description: "We have received your order.", icon: CheckCircle2, active: true, completed: true },
    { id: 2, title: "Preparing", description: "Our chef is cooking your meal.", icon: ChefHat, active: true, completed: false },
    { id: 3, title: "Out for Delivery", description: "Rider is on the way.", icon: Truck, active: false, completed: false },
    { id: 4, title: "Delivered", description: "Enjoy your meal!", icon: Home, active: false, completed: false },
  ];

  return (
    <Layout>
      <div className="container max-w-screen-md px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">Track Order</h1>

        <div className="bg-card border border-border rounded-xl p-8 relative overflow-hidden">
          {/* Map Placeholder */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/10 hidden md:block">
            {/* Simple pattern to simulate map */}
            <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">Order ID: <span className="font-mono font-bold text-foreground">#ORD-839201</span></p>
              <p className="text-sm text-muted-foreground">Est. Arrival: <span className="font-bold text-foreground">35 mins</span></p>
            </div>

            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-border -z-10"></div>

              {steps.map((step, idx) => (
                <div key={step.id} className={cn("flex gap-6", !step.active && "opacity-50")}>
                  <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors",
                    step.completed ? "bg-primary border-primary text-white" : 
                    step.active ? "bg-background border-primary text-primary animate-pulse" : 
                    "bg-muted border-border text-muted-foreground"
                  )}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
