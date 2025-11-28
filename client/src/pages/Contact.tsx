import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, HelpCircle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import supportImg from '@assets/stock_images/customer_support_tea_27c2ff04.jpg';
import mapImg from '@assets/stock_images/city_map_top_view_fo_d699b8e8.jpg';

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-muted/30 py-16 border-b border-border">
        <div className="container max-w-screen-xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Chat with our friendly team 24/7.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
               <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Head Office</h3>
                    <p className="text-muted-foreground text-sm">123 Gourmet Street,<br />Victoria Island, Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground text-sm">+234 800 CRAVE FOOD<br />+234 801 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">support@crave.com<br />partnerships@crave.com</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                    <p className="text-muted-foreground text-sm">Mon - Fri: 8am - 10pm<br />Sat - Sun: 10am - 11pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-[250px] relative">
              <img src={mapImg} alt="Location Map" className="w-full h-full object-cover opacity-60 grayscale" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-primary text-white p-2 rounded-full shadow-lg animate-bounce">
                   <MapPin className="h-6 w-6" />
                 </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded text-xs font-bold shadow-sm">
                Victoria Island
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
             <div className="bg-card border border-border rounded-2xl p-8 shadow-lg relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={supportImg} alt="Support Team" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                    <div>
                      <h2 className="text-2xl font-bold">Send us a message</h2>
                      <p className="text-muted-foreground">We typically reply within 2 hours.</p>
                    </div>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input placeholder="John" className="bg-background h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input placeholder="Doe" className="bg-background h-12" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="john@example.com" className="bg-background h-12" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="Order Inquiry" className="bg-background h-12" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-background" />
                    </div>

                    <Button size="lg" className="w-full md:w-auto font-bold px-8 py-6 text-lg">
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
             </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
           <div className="text-center mb-12">
             <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-4">
               <HelpCircle className="h-6 w-6 text-muted-foreground" />
             </div>
             <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
             <p className="text-muted-foreground">Find quick answers to common questions about our service.</p>
           </div>

           <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">How long does delivery take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We aim to deliver all orders within 30-45 minutes, depending on your location and the current traffic conditions. You can track your order in real-time on our app.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We accept all major debit/credit cards, bank transfers, and USSD payments through our secure payment partner, Paystack.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">Do you offer contactless delivery?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Yes! You can request contactless delivery at checkout. Our rider will leave your order at your doorstep and notify you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">Can I schedule an order for later?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Currently, we only process immediate orders to ensure freshness. We are working on a scheduled order feature that will be available soon.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Layout>
  );
}
