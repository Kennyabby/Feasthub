import { Layout } from "@/components/layout";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const deliveryFee = 1500;
  const vat = total * 0.075;
  const finalTotal = total + deliveryFee + vat;

  return (
    <Layout>
      <div className="container max-w-screen-xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <div className="mb-6 text-6xl">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any delicious meals yet.</p>
            <Button size="lg" className="font-bold" asChild>
              <Link href="/menu">Start Ordering</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border items-center">
                  <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-heading text-lg truncate">{item.name}</h3>
                    <p className="text-primary font-bold">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-xl border border-border sticky top-24">
                <h3 className="font-heading text-xl font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (7.5%)</span>
                    <span>₦{vat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg text-foreground">
                    <span>Total</span>
                    <span>₦{finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <Button className="w-full font-bold py-6 text-lg" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <div className="mt-4 text-xs text-center text-muted-foreground">
                  Secured by Paystack 🔒
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
