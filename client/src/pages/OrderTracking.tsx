import { Layout } from "@/components/layout";
import { CheckCircle2, ChefHat, Truck, Home, MapPin, Phone, MessageSquare, Shield, Star, Package, Clock, Navigation, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/lib/order-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

// Images
import mapRouteImg from '@assets/stock_images/delivery_app_map_rou_e0818971.jpg';
import chefCookingImg from '@assets/stock_images/chef_putting_garnish_16dae681.jpg';
import packageImg from '@assets/stock_images/food_delivery_packag_0fe0fc6a.jpg';
import riderNightImg from '@assets/stock_images/delivery_rider_check_4993cd13.jpg';
import riderProfileImg from '@assets/stock_images/delivery_rider_on_sc_e5d0230d.jpg';

export default function OrderTracking() {
  const { currentOrder } = useOrder();

  // If no order exists, show empty state
  if (!currentOrder) {
    return (
      <Layout>
        <div className="container max-w-screen-md px-4 py-24 text-center">
          <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Truck className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4">No Active Order</h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            It looks like you haven't placed an order yet. Hungry? Let's fix that.
          </p>
          <Button size="lg" className="font-bold text-lg px-8 py-6 rounded-full" asChild>
            <Link href="/menu">Explore Menu</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Calculate progress based on status (mock logic)
  const progress = 65; // Hardcoded for demo (Preparing/Out for delivery transition)

  const timelineEvents = [
    { 
      id: 1, 
      title: "Order Confirmed", 
      desc: "We've received your order and sent it to the kitchen.",
      time: "10:30 AM",
      status: "completed",
      icon: CheckCircle2 
    },
    { 
      id: 2, 
      title: "Preparing Your Meal", 
      desc: "Chef Michael is grilling the patties to perfection.",
      time: "10:35 AM",
      status: "current",
      icon: ChefHat,
      image: chefCookingImg
    },
    { 
      id: 3, 
      title: "Quality Check", 
      desc: "Final inspection of packaging and hygiene standards.",
      time: "10:50 AM",
      status: "pending",
      icon: Shield 
    },
    { 
      id: 4, 
      title: "Rider Picked Up", 
      desc: "David has picked up your order and is on the way.",
      time: "---",
      status: "pending",
      icon: Truck,
      image: riderNightImg
    },
    { 
      id: 5, 
      title: "Arriving Soon", 
      desc: "Rider is 5 minutes away from your location.",
      time: "---",
      status: "pending",
      icon: Navigation 
    }
  ];

  return (
    <Layout>
      {/* Header Status Bar */}
      <div className="bg-muted/30 border-b border-border py-8">
        <div className="container max-w-screen-xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                In Progress
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">Preparing Your Order</h1>
              <p className="text-muted-foreground mt-1">Order ID: <span className="font-mono font-bold text-foreground">{currentOrder.id}</span></p>
            </div>
            <div className="text-left md:text-right bg-background/50 backdrop-blur px-6 py-3 rounded-xl border border-border">
              <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Estimated Delivery</span>
              <span className="text-2xl font-bold font-heading text-primary">
                {currentOrder.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs font-bold text-muted-foreground mt-2">
            <span>Confirmed</span>
            <span className="text-primary">Preparing</span>
            <span>On the Way</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Live Map & Rider */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Map Card */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl relative h-[500px] group">
               {/* Map Image */}
               <img 
                  src={mapRouteImg} 
                  alt="Delivery Map Route" 
                  className="w-full h-full object-cover opacity-60 invert-[.85] hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-transform duration-1000 group-hover:scale-105"
                />
               <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />
               
               {/* Map Markers Overlay (Visual only) */}
               <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white text-black p-2 rounded-full shadow-xl border-4 border-primary animate-bounce">
                    <ChefHat className="h-6 w-6 text-primary" />
                  </div>
               </div>
                <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white p-3 rounded-full shadow-xl ring-4 ring-primary/30">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div className="bg-black/80 text-white text-xs font-bold px-2 py-1 rounded mt-2 whitespace-nowrap">
                    David is here
                  </div>
               </div>

               {/* Rider Info Overlay */}
               <div className="absolute bottom-0 left-0 right-0 p-6">
                 <div className="bg-background/95 backdrop-blur-md p-5 rounded-2xl border border-border shadow-2xl flex flex-col md:flex-row items-center gap-6">
                   <div className="relative">
                     <Avatar className="h-16 w-16 border-2 border-primary ring-2 ring-background">
                       <AvatarImage src={riderProfileImg} className="object-cover" />
                       <AvatarFallback>DR</AvatarFallback>
                     </Avatar>
                     <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-background"></div>
                   </div>
                   
                   <div className="flex-1 text-center md:text-left">
                     <h4 className="font-bold text-xl">David Okeke</h4>
                     <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm text-muted-foreground mt-1">
                       <span className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded"><Star className="h-3 w-3 fill-current" /> 4.9</span>
                       <span>•</span>
                       <span>1,240 trips</span>
                       <span>•</span>
                       <span>Bajaj Boxer (LND-832-XA)</span>
                     </div>
                     <div className="flex items-center gap-2 mt-2 text-xs text-green-500 font-bold bg-green-500/10 w-fit mx-auto md:mx-0 px-2 py-1 rounded-full">
                        <Shield className="h-3 w-3" /> Vaccinated & Hygiene Checked
                     </div>
                   </div>
                   
                   <div className="flex gap-3 w-full md:w-auto">
                     <Button className="flex-1 md:flex-none rounded-xl gap-2 font-bold" variant="default">
                       <Phone className="h-4 w-4" /> Call
                     </Button>
                     <Button className="flex-1 md:flex-none rounded-xl gap-2 font-bold" variant="secondary">
                       <MessageSquare className="h-4 w-4" /> Chat
                     </Button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Order Summary Card (Mobile only - hidden on desktop usually, but let's show for context) */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-primary/10 p-2 rounded-lg text-primary">
                   <Package className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">Order Summary</h3>
                   <p className="text-sm text-muted-foreground">{currentOrder.items.length} items • ₦{currentOrder.total.toLocaleString()}</p>
                 </div>
              </div>
              <div className="space-y-3">
                {currentOrder.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-medium"><span className="text-primary font-bold">{item.quantity}x</span> {item.name}</span>
                    <span className="text-muted-foreground">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Timeline */}
          <div className="lg:col-span-1">
             <div className="bg-card border border-border rounded-3xl p-8 h-full">
               <h3 className="font-heading font-bold text-2xl mb-8">Live Updates</h3>

               <div className="relative space-y-0">
                 {/* Continuous Vertical Line */}
                 <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border -z-10" />

                 {timelineEvents.map((event, idx) => (
                   <div key={event.id} className={cn("relative pl-16 pb-10 last:pb-0", event.status === "pending" && "opacity-50")}>
                     {/* Icon Bubble */}
                     <div className={cn(
                       "absolute left-0 top-0 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-background transition-all duration-500",
                       event.status === "completed" ? "border-primary text-primary" :
                       event.status === "current" ? "border-primary bg-primary text-white shadow-[0_0_0_4px_rgba(230,57,70,0.2)] scale-110" :
                       "border-border text-muted-foreground"
                     )}>
                       <event.icon className="h-5 w-5" />
                     </div>

                     {/* Content */}
                     <div>
                       <div className="flex justify-between items-start mb-1">
                         <h4 className={cn("font-bold text-lg leading-tight", event.status === "current" && "text-primary")}>{event.title}</h4>
                         <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{event.time}</span>
                       </div>
                       <p className="text-sm text-muted-foreground leading-relaxed mb-3">{event.desc}</p>
                       
                       {/* Optional Image for step */}
                       {event.image && event.status !== "pending" && (
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="mt-3 rounded-xl overflow-hidden border border-border/50 shadow-sm"
                         >
                           <img src={event.image} alt={event.title} className="w-full h-32 object-cover" />
                         </motion.div>
                       )}
                     </div>
                   </div>
                 ))}
               </div>

               {/* Help Box */}
               <div className="mt-12 pt-8 border-t border-border">
                 <p className="text-sm text-muted-foreground mb-4 text-center">
                   Having trouble with this order?
                 </p>
                 <Button variant="outline" className="w-full rounded-xl font-bold h-12 hover:bg-primary hover:text-white hover:border-primary transition-colors" asChild>
                    <Link href="/contact">Contact Support</Link>
                 </Button>
               </div>
             </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
