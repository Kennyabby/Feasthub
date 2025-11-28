import { Layout } from "@/components/layout";
import { CheckCircle2, ChefHat, Truck, Home, MapPin, Phone, MessageSquare, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/lib/order-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import mapImg from '@assets/stock_images/city_map_top_view_fo_d699b8e8.jpg';
import riderImg from '@assets/stock_images/delivery_rider_on_sc_e5d0230d.jpg';

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
    { id: 1, title: "Order Received", description: "We have received your order.", icon: CheckCircle2, active: true, completed: true, time: "10:30 AM" },
    { id: 2, title: "Preparing", description: "Our chef is cooking your meal.", icon: ChefHat, active: true, completed: false, time: "10:35 AM" },
    { id: 3, title: "Out for Delivery", description: "Rider is on the way.", icon: Truck, active: false, completed: false, time: "10:55 AM" },
    { id: 4, title: "Delivered", description: "Enjoy your meal!", icon: Home, active: false, completed: false, time: "11:15 AM" },
  ];

  return (
    <Layout>
      <div className="container max-w-screen-xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Map & Rider Info */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-heading font-bold">Track Order</h1>
            
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg relative h-[400px]">
               {/* Map Image */}
               <img 
                  src={mapImg} 
                  alt="Delivery Map" 
                  className="w-full h-full object-cover opacity-50 invert-[.9] dark:invert-0"
                />
               <div className="absolute inset-0 bg-black/20" />
               
               {/* Overlay UI */}
               <div className="absolute inset-0 p-6 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                   <div className="bg-background/90 backdrop-blur-md p-3 rounded-xl border border-border shadow-sm">
                     <span className="text-xs text-muted-foreground uppercase font-bold">Estimated Arrival</span>
                     <div className="text-xl font-bold text-primary">
                       {currentOrder.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </div>
                   </div>
                 </div>

                 {/* Rider Card */}
                 <div className="bg-background/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg flex items-center gap-4">
                   <Avatar className="h-14 w-14 border-2 border-primary">
                     <AvatarImage src={riderImg} className="object-cover" />
                     <AvatarFallback>DR</AvatarFallback>
                   </Avatar>
                   <div className="flex-1">
                     <h4 className="font-bold text-lg">David Okeke</h4>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <span className="flex items-center gap-1 text-secondary font-bold"><Star className="h-3 w-3 fill-current" /> 4.9</span>
                       <span>•</span>
                       <span>Bajaj Boxer (LND-832-XA)</span>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                       <MessageSquare className="h-4 w-4" />
                     </Button>
                     <Button size="icon" className="rounded-full h-10 w-10">
                       <Phone className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Support Card */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-background p-3 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Need help with this order?</h4>
                  <p className="text-sm text-muted-foreground">Our support team is here to assist you.</p>
                </div>
              </div>
              <Button variant="outline">Chat Support</Button>
            </div>
          </div>

          {/* Right Column: Timeline & Details */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full">
               <div className="mb-8 pb-6 border-b border-border">
                 <h3 className="font-heading font-bold text-xl mb-1">Order Status</h3>
                 <p className="text-sm text-muted-foreground">Order ID: <span className="font-mono font-bold text-foreground">{currentOrder.id}</span></p>
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
                    <div className="pt-1">
                      <h3 className="font-bold text-lg leading-none mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                      <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-border">
                <h4 className="font-bold mb-3 text-sm uppercase text-muted-foreground">Delivery Address</h4>
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    {currentOrder.customer.address}
                  </p>
                </div>
              </div>
             </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
