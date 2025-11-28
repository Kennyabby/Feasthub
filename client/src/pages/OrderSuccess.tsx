import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Package, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const orderId = "#ORD-" + Math.floor(Math.random() * 1000000);
  const deliveryTime = new Date();
  deliveryTime.setMinutes(deliveryTime.getMinutes() + 45);

  return (
    <Layout>
      <div className="container max-w-screen-sm px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-12 w-12" />
        </motion.div>

        <h1 className="text-4xl font-heading font-bold mb-2">Order Successful! 🎉</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We've received it and are preparing your delicious meal.
        </p>

        <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between border-b border-border pb-3">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-3">
            <span className="text-muted-foreground">Est. Delivery</span>
            <span className="font-bold">{deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Status</span>
            <span className="text-green-500 font-bold text-sm bg-green-500/10 px-2 py-1 rounded">PAID</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full py-6 text-lg font-bold" asChild>
            <Link href="/order-tracking">Track Your Order</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
