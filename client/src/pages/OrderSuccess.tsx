import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { CheckCircle, Package, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useOrder } from "@/lib/order-context";
import { useEffect } from "react";

export default function OrderSuccess() {
  const { currentOrder } = useOrder();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!currentOrder) {
      setLocation('/');
    }
  }, [currentOrder, setLocation]);

  if (!currentOrder) return null;

  return (
    <Layout>
      <div className="container max-w-screen-md px-4 py-12 md:py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-28 h-28 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="h-14 w-14" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Order Successful! 🎉</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
          Thank you for your order, <span className="font-bold text-foreground">{currentOrder.customer.name}</span>. We've received it and are preparing your delicious meal.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-10 text-left shadow-lg">
          <div className="flex flex-col md:flex-row justify-between border-b border-border pb-6 mb-6 gap-4">
            <div>
              <span className="text-sm text-muted-foreground block mb-1">Order ID</span>
              <span className="font-mono font-bold text-xl">{currentOrder.id}</span>
            </div>
            <div className="md:text-right">
              <span className="text-sm text-muted-foreground block mb-1">Est. Delivery</span>
              <span className="font-bold text-xl text-primary">
                {currentOrder.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Order Details</h3>
            {currentOrder.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-muted text-foreground w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                    {item.quantity}x
                  </span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-muted-foreground">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-border items-center">
            <span className="font-bold">Total Paid</span>
            <span className="font-heading text-2xl font-bold text-primary">₦{currentOrder.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="w-full sm:w-auto py-6 px-8 text-lg font-bold rounded-xl" asChild>
            <Link href="/order-tracking">
              Track Your Order <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto py-6 px-8 text-lg font-bold rounded-xl" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
