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

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-muted/30 py-16 border-b border-border">
        <div className="container max-w-screen-xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reach out to The Plantain Planet team for reservations, events, or general enquiries.
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
                    <h3 className="font-bold text-lg mb-1">Restaurant & Lounge Location</h3>
                    <p className="text-muted-foreground text-sm">The Plantain Planet • Ozuoba / Rumuosi, Port Harcourt,<br />Rivers State, Nigeria (easily spotted on Google Maps)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground text-sm">09064648510</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">theplantainplanet22@gmail.com</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                    <p className="text-muted-foreground text-sm">Mon - Fri: 8am - 11pm<br />Sat - Sun: 10am - 11pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Prefer chatting? Reach the Plantain Planet team directly on WhatsApp.
                    </p>
                    <a
                      href="https://wa.me/2349064648510?text=Hello%20Plantain%20Planet%2C%20I%27d%20like%20to%20make%20an%20enquiry."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="inline-flex items-center gap-2">
                        Chat on WhatsApp
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-border h-[250px] relative">
              <iframe
                title="Plantain Planet Location Map"
                src="https://www.google.com/maps?q=Plantain+Planet+Ozuoba+Rumuosi+Port+Harcourt+Nigeria&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" />
                <span>The Plantain Planet • Ozuoba / Rumuosi, Port Harcourt, Rivers</span>
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
                      <p className="text-muted-foreground">Our team will respond to you as soon as possible.</p>
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
                      <label className="text-sm font-medium">Phone</label>
                      <Input type="text" placeholder="+234 8001 234 790" className="bg-background h-12" />
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
             <p className="text-muted-foreground">Find quick answers to common questions about visiting The Plantain Planet, booking rooms, and enjoying our food and drinks.</p>
           </div>

           <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">Do you offer food delivery or an app?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                For now, The Plantain Planet focuses on on-site restaurant and lounge service in Port Harcourt, Rivers. The website is the single official place for our menu, room information, and updates but there is no mobile app yet.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We accept all major debit/credit cards, bank transfers, and USSD payments through our secure POS payment machine.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="hover:no-underline text-lg font-bold">Do you have rooms and accommodation?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Yes. The Plantain Planet also operates a lounge with accommodation. We offer different room types and price points, plus dedicated room service for food and drinks ordered to your room.
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
