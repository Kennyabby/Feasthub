import { Layout } from "@/components/layout";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
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
    // Simulate Paystack processing
    setTimeout(() => {
      clearCart();
      setLocation('/order-success');
    }, 2000);
  };

  return (
    <Layout>
      <div className="container max-w-screen-md px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Delivery Details */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="font-heading text-xl font-bold mb-6 border-b border-border pb-2">1. Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name", { required: true })} placeholder="John Doe" />
                {errors.name && <span className="text-destructive text-xs">Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone", { required: true })} placeholder="+234..." />
                {errors.phone && <span className="text-destructive text-xs">Required</span>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea id="address" {...register("address", { required: true })} placeholder="Street address, Apartment, Suite, etc." />
                {errors.address && <span className="text-destructive text-xs">Required</span>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="landmark">Nearest Landmark (Optional)</Label>
                <Input id="landmark" {...register("landmark")} placeholder="e.g., Near the big filling station" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="font-heading text-xl font-bold mb-6 border-b border-border pb-2">2. Payment Method</h2>
            <RadioGroup defaultValue="paystack">
              <div className="flex items-center space-x-2 border border-border rounded-lg p-4 bg-background">
                <RadioGroupItem value="paystack" id="paystack" />
                <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                  <span className="font-bold block">Pay with Paystack</span>
                  <span className="text-xs text-muted-foreground">Cards, USSD, Bank Transfer</span>
                </Label>
                <div className="text-xl">🔒</div>
              </div>
              <div className="flex items-center space-x-2 border border-border rounded-lg p-4 bg-background opacity-60">
                <RadioGroupItem value="cod" id="cod" disabled />
                <Label htmlFor="cod" className="flex-1">
                  <span className="font-bold block">Pay on Delivery</span>
                  <span className="text-xs text-muted-foreground">Currently unavailable for your area</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Total & Pay Button */}
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total to Pay:</span>
              <span className="font-heading text-2xl font-bold text-primary">₦{finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <Button 
              type="submit" 
              className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20" 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Payment..." : `Pay ₦${finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              By clicking pay, you agree to our Terms of Service.
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}
