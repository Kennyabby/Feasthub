import { Layout } from "@/components/layout";
import { CheckCircle2, ChefHat, Truck, Home, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/lib/order-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function OrderTracking() {
  const { currentOrder } = useOrder();

  // If no order exists, show empty state
  if (!currentOrder) {
    return (
      <Layout>
        <div className="container max-w-screen-md px-4 py-20 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">No Active Order</h1>
          <p className="text-muted-foreground mb-8">You don't have any active orders at the moment.</p>
          <Button asChild>
            <Link href="/menu">Order Now</Link>
          </Button>
        </div>
      </Layout>
    );
  }

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

        <div className="bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden shadow-lg">
          {/* Map Placeholder */}
          <div className="absolute top-0 right-0 w-full md:w-1/3 h-32 md:h-full bg-muted/10 block border-b md:border-b-0 md:border-l border-border">
            <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-sm p-2 rounded text-xs font-bold border border-border flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" /> Live Map
              </div>
            </div>
          </div>

          <div className="relative z-10 md:pr-[35%] pt-32 md:pt-0">
            <div className="mb-8 pb-6 border-b border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="font-mono font-bold text-foreground text-lg">{currentOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Est. Arrival</span>
                <span className="font-bold text-primary text-xl">
                  {currentOrder.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <div className="space-y-8 relative pl-2">
              {/* Vertical Line */}
              <div className="absolute left-8 top-2 bottom-6 w-0.5 bg-border -z-10"></div>

              {steps.map((step, idx) => (
                <div key={step.id} className={cn("flex gap-6", !step.active && "opacity-50")}>
                  <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors z-10 bg-background",
                    step.completed ? "bg-primary border-primary text-white" : 
                    step.active ? "bg-background border-primary text-primary shadow-[0_0_0_4px_rgba(230,57,70,0.2)]" : 
                    "bg-muted border-border text-muted-foreground"
                  )}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-lg leading-none mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-bold mb-2">Delivery Address</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {currentOrder.customer.address}
              </p>
              <Button variant="outline" className="w-full gap-2">
                <Phone className="h-4 w-4" /> Call Rider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
