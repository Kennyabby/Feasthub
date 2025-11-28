import { Layout } from "@/components/layout";
import { useCart } from "@/lib/cart-context";
import { useOrder } from "@/lib/order-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Loader2, Lock, CreditCard, Smartphone } from "lucide-react";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const [location, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const deliveryFee = 1500;
  const vat = total * 0.075;
  const finalTotal = total + deliveryFee + vat;

  useEffect(() => {
    if (items.length === 0) {
      setLocation('/cart');
    }
  }, [items, setLocation]);

  const onSubmit = (data: any) => {
    setIsProcessing(true);
    
    // Simulate Paystack processing delay
    setTimeout(() => {
      const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 1000000),
        items: [...items],
        total: finalTotal,
        customer: {
          name: data.name,
          phone: data.phone,
          address: data.address
        },
        status: 'received' as const,
        createdAt: new Date(),
        estimatedDelivery: new Date(new Date().getTime() + 45 * 60000) // +45 mins
      };

      placeOrder(newOrder);
      clearCart();
      setLocation('/order-success');
    }, 2500);
  };

  return (
    <Layout>
      <div className="container max-w-screen-md px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Delivery Details */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="font-heading text-xl font-bold mb-6 border-b border-border pb-2 flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name", { required: true })} placeholder="John Doe" className="h-12" />
                {errors.name && <span className="text-destructive text-xs">Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone", { required: true })} placeholder="+234..." className="h-12" />
                {errors.phone && <span className="text-destructive text-xs">Required</span>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea id="address" {...register("address", { required: true })} placeholder="Street address, Apartment, Suite, etc." className="min-h-[100px]" />
                {errors.address && <span className="text-destructive text-xs">Required</span>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="landmark">Nearest Landmark (Optional)</Label>
                <Input id="landmark" {...register("landmark")} placeholder="e.g., Near the big filling station" className="h-12" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="font-heading text-xl font-bold mb-6 border-b border-border pb-2 flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            <RadioGroup defaultValue="paystack">
              <div className="relative flex items-center space-x-2 border-2 border-primary/50 rounded-lg p-4 bg-primary/5 transition-all">
                <RadioGroupItem value="paystack" id="paystack" />
                <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                  <span className="font-bold block text-lg">Pay with Paystack</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <CreditCard className="h-4 w-4" /> Cards 
                    <Smartphone className="h-4 w-4 ml-2" /> USSD / Transfer
                  </span>
                </Label>
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Lock className="h-4 w-4" /> Secured
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border border-border rounded-lg p-4 bg-muted/50 opacity-60 cursor-not-allowed">
                <RadioGroupItem value="cod" id="cod" disabled />
                <Label htmlFor="cod" className="flex-1 cursor-not-allowed">
                  <span className="font-bold block">Pay on Delivery</span>
                  <span className="text-xs text-muted-foreground">Currently unavailable for your location</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Total & Pay Button */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-lg sticky bottom-4 md:relative md:bottom-auto">
            <div className="flex justify-between items-center mb-2 text-muted-foreground">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-muted-foreground">
              <span>Delivery + VAT</span>
              <span>₦{(deliveryFee + vat).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
              <span className="font-bold text-lg">Total to Pay</span>
              <span className="font-heading text-3xl font-bold text-primary">₦{finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-8 text-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Processing Payment...
                </>
              ) : (
                `Pay ₦${finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> 
              Payments are 100% secured by Paystack. We do not store your card details.
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
