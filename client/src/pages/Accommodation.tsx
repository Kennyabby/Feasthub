import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Camera, MapPin, Video, Star, Bed, Bath, Wifi, Tv, Wind, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Environment images
import loungeImg from "@assets/stock_images/restaurant_interior__4c194c6a.jpg";
import customersImg from "@assets/stock_images/happy_customers_eati_ce18fe7b.jpg";
import professionalImg from "@assets/stock_images/professional_restaur_20b96f94.jpg";

const galleryItems = [
  { type: 'image', src: loungeImg, alt: 'Lounge Interior' },
  { type: 'image', src: customersImg, alt: 'Happy Guests' },
  { type: 'image', src: professionalImg, alt: 'Restaurant Setting' },
  // Placeholders for room videos/pictures
  { type: 'image', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000', alt: 'Standard Room' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000', alt: 'Luxury Room' },
  { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Room Walkthrough', placeholder: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000' },
];

const rooms = [
  {
    title: "Regular Standard Room",
    description: "Our cozy standard rooms are designed for maximum comfort. Each room features a plush queen-sized bed, individual climate control, and a private en-suite bathroom.",
    price: "₦15,000 - ₦25,000",
    features: ["Queen Bed", "AC", "Private Bathroom", "Flat Screen TV", "Free Wifi"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Short-Rest Room",
    description: "Perfect for a quick refresh or a few hours of privacy. Our short-rest rooms offer all the amenities of our standard rooms at a flexible rate.",
    price: "Flexible Hourly Rates",
    features: ["Flexible Hours", "AC", "Privacy", "Room Service"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600"
  }
];

export default function Accommodation() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${loungeImg})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Stay With Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-heading font-bold text-white mb-6"
          >
            Luxury Accommodation & Lounge
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light"
          >
            Experience true Port Harcourt hospitality. Comfortable rooms, premium service, and the vibrant atmosphere of The Plantain Planet.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Gallery & Tours</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take a virtual tour of our rooms and lounge facilities.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {galleryItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden group border border-border">
                    {item.type === 'video' ? (
                      <div className="relative w-full h-full">
                         <img src={item.placeholder} alt={item.alt} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <Video className="h-12 w-12 text-white opacity-80" />
                         </div>
                      </div>
                    ) : (
                      <img src={item.src as string} alt={item.alt} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-bold">{item.alt}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12" />
              <CarouselNext className="-right-12" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container max-w-screen-xl px-4">
          <div className="space-y-24">
            {rooms.map((room, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={index % 2 !== 0 ? 'lg:order-2' : ''}
                >
                  <div className="relative">
                    <img src={room.image} alt={room.title} className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover" />
                    <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                      <div className="text-xs font-bold uppercase tracking-wider opacity-80">Starting from</div>
                      <div className="text-2xl font-bold">{room.price}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">{room.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {room.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3 text-muted-foreground">
                        <Star className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="font-bold px-8 rounded-full" asChild>
                    <Link href="/contact">Book This Room</Link>
                  </Button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 bg-background">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Guest Amenities</h2>
            <p className="text-muted-foreground">Everything you need for a comfortable stay.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Bed className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">Comfortable Beds</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Wind className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">Air Conditioning</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Wifi className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">Free High-Speed Wifi</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Tv className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">Cable TV</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Bath className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">En-suite Bathrooms</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Coffee className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">Room Service</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">Prime Location</h4>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary transition-colors group">
              <Camera className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-bold">24/7 Security</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container max-w-screen-xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">Ready to Book Your Stay?</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Contact us today for reservations, special rates, or to ask about our short-rest room availability.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" variant="secondary" className="font-bold px-10 py-8 text-lg rounded-full" asChild>
              <Link href="/contact">Contact Reservations</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold px-10 py-8 text-lg rounded-full" asChild>
              <a href="tel:09064648510">Call +234 906 464 8510</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
