import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Camera, MapPin, Video, Star, Bed, Bath, Wifi, Tv, Wind, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useMemo, useState } from "react";
import { fetchMenuProducts, type MenuProduct } from "@/lib/products-api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type GalleryItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; placeholder?: string };

function buildSequentialUrls(opts: { basePath: string; prefix: string; ext: string; max: number }): string[] {
  const out: string[] = [];
  for (let i = 1; i <= opts.max; i++) {
    out.push(`${opts.basePath}/${opts.prefix}${i}${opts.ext}`);
  }
  return out;
}

const rooms = [
  {
    title: "Regular Standard Room",
    description: "Our cozy standard rooms are designed for maximum comfort. Each room features a plush queen-sized bed, individual climate control, and a private en-suite bathroom.",
    price: "",
    features: ["Queen Bed", "AC", "Private Bathroom", "Flat Screen TV", "Free Wifi"],
    roomName: "Room 1",
    image: ""
  },
  {
    title: "Short-Rest Room",
    description: "Perfect for a quick refresh or a few hours of privacy. Our short-rest rooms offer all the amenities of our standard rooms at a flexible rate.",
    price: "",
    features: ["Flexible Hours", "AC", "Privacy", "Room Service"],
    roomName: "Room 2",
    image: ""
  }
];

type RoomCard = {
  name: string;
  title: string;
  description: string;
  features: string[];
  normalPrice?: number;
  vipPrice?: number;
  shortRestRate?: { amount: number; durationLabel: string };
  imageSrc?: string;
  videoSrc?: string;
};

export default function Accommodation() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [roomImages, setRoomImages] = useState<Record<string, string>>({});
  const [roomVideos, setRoomVideos] = useState<Record<string, string>>({});
  const [roomProducts, setRoomProducts] = useState<MenuProduct[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [roomImageOk, setRoomImageOk] = useState<Record<string, boolean>>({});
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaViewerItem, setMediaViewerItem] = useState<
    | { type: "image"; src: string; label?: string }
    | { type: "video"; src: string; label?: string }
    | null
  >(null);

  const premisesFallback = useMemo(() => "/premises/images/photo1.jpeg", []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingPrices(true);
        const products = await fetchMenuProducts("normal");
        const roomsOnly = products.filter((p) => String(p.category || "").toLowerCase() === "room");
        setRoomProducts(roomsOnly);
      } finally {
        setIsLoadingPrices(false);
      }

      // Premises assets are known and local (client/public/premises).
      // Avoid fetch-based existence checks (can be unreliable depending on host/config).
      const premisesImages = buildSequentialUrls({
        basePath: "/premises/images",
        prefix: "photo",
        ext: ".jpeg",
        max: 11,
      });
      const premisesVideos = ["/premises/media/media1.mp4"];

      try {
        setIsLoadingMedia(true);

        // Option 1: deterministic room media paths (no probing). Only photo1 + media1 per room.
        const roomNames = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];
        const roomImageMap: Record<string, string> = {};
        const roomVideoMap: Record<string, string> = {};
        const roomGalleryItems: GalleryItem[] = [];

        roomNames.forEach((name) => {
          const folder = name.toLowerCase(); // "room 1"
          const img = `/rooms/${folder}/images/photo1.jpeg`;
          const vid = `/rooms/${folder}/media/media1.mp4`;
          roomImageMap[name] = img;
          roomVideoMap[name] = vid;
          roomGalleryItems.push({ type: "video", src: vid, alt: `${name} video` });
          roomGalleryItems.push({ type: "image", src: img, alt: `${name} photo` });
        });

      const premisesGalleryItems: GalleryItem[] = [
        ...premisesVideos.map((src, idx) => ({ type: "video" as const, src, alt: `Premises video ${idx + 1}` })),
        ...premisesImages.map((src, idx) => ({ type: "image" as const, src, alt: `Premises photo ${idx + 1}` })),
      ];

      setRoomImages(roomImageMap);
      setRoomVideos(roomVideoMap);
      setRoomImageOk((prev) => {
        const next: Record<string, boolean> = { ...prev };
        Object.keys(roomImageMap).forEach((k) => {
          if (next[k] === undefined) next[k] = true;
        });
        return next;
      });
      setGalleryItems([
        ...premisesGalleryItems,
        ...roomGalleryItems,
      ]);
      } finally {
        setIsLoadingMedia(false);
      }
    })();
  }, [premisesFallback]);

  const roomsToRender: RoomCard[] = useMemo(() => {
    const desiredOrder = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];
    const baseMeta: Record<string, { title: string; description: string; features: string[] }> = {
      "Room 1": {
        title: "Room 1",
        description: rooms[0]?.description || "",
        features: rooms[0]?.features || [],
      },
      "Room 2": {
        title: "Room 2",
        description: rooms[0]?.description || "",
        features: rooms[0]?.features || [],
      },
      "Room 3": {
        title: "Room 3",
        description: rooms[0]?.description || "",
        features: rooms[0]?.features || [],
      },
      "Room 4": {
        title: "Room 4",
        description: rooms[0]?.description || "",
        features: rooms[0]?.features || [],
      },
      "Room 5": {
        title: "Room 5",
        description: rooms[0]?.description || "",
        features: rooms[0]?.features || [],
      },
    };

    const productByName = new Map(roomProducts.map((p) => [String(p.name || "").trim().toLowerCase(), p]));

    return desiredOrder.map((name) => {
      const p = productByName.get(name.toLowerCase());
      const vipPrice = p && p.vipPrice !== undefined ? Number(p.vipPrice || 0) || undefined : undefined;
      const normalPrice = p ? Number(p.salesPrice || p.price || 0) || undefined : undefined;

      return {
        name,
        title: baseMeta[name]?.title || name,
        description: baseMeta[name]?.description || "",
        features: baseMeta[name]?.features || [],
        normalPrice,
        vipPrice,
        shortRestRate: name === "Room 2" ? { amount: 5000, durationLabel: "2 hours" } : undefined,
        imageSrc: roomImages[name],
        videoSrc: roomVideos[name],
      };
    });
  }, [roomImages, roomProducts, roomVideos]);

  const openMediaViewer = (item: { type: "image" | "video"; src: string; label?: string }) => {
    setMediaViewerItem(item as any);
    setMediaViewerOpen(true);
  };

  return (
    <Layout>
      <Dialog
        open={mediaViewerOpen}
        onOpenChange={(open) => {
          setMediaViewerOpen(open);
          if (!open) setMediaViewerItem(null);
        }}
      >
        <DialogContent className="w-[calc(100vw-1rem)] max-w-6xl max-h-[92vh] overflow-hidden p-3 sm:p-4">
          <DialogHeader className="pr-8">
            <DialogTitle>{mediaViewerItem?.label || "Media"}</DialogTitle>
          </DialogHeader>

          <div className="w-full max-h-[calc(92vh-5rem)] overflow-auto flex items-center justify-center">
            {mediaViewerItem?.type === "image" ? (
              <img
                src={mediaViewerItem.src}
                alt={mediaViewerItem.label || "Image"}
                className="rounded-lg max-w-full max-h-[calc(92vh-6rem)] object-contain"
              />
            ) : mediaViewerItem?.type === "video" ? (
              <video
                src={mediaViewerItem.src}
                controls
                autoPlay
                className="rounded-lg max-w-full max-h-[calc(92vh-6rem)] object-contain"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(/premises/images/photo2.jpeg)` }}
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
              {isLoadingMedia && galleryItems.length === 0
                ? Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-muted animate-pulse" />
                    </CarouselItem>
                  ))
                : galleryItems.map((item: GalleryItem, index: number) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                      <div className="relative aspect-video rounded-2xl overflow-hidden group border border-border">
                        {item.type === 'video' ? (
                          <div className="relative w-full h-full">
                            <video
                              src={item.src}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute right-3 top-3 z-10">
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() => openMediaViewer({ type: "video", src: item.src, label: item.alt })}
                              >
                                View larger
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="w-full h-full"
                            onClick={() => openMediaViewer({ type: "image", src: item.src as string, label: item.alt })}
                          >
                            <img src={item.src as string} alt={item.alt} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          </button>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
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
            {roomsToRender.map((room, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={index % 2 !== 0 ? 'lg:order-2' : ''}
                >
                  <div className="relative">
                    {isLoadingMedia ? (
                      <div className="rounded-3xl shadow-2xl w-full aspect-[4/3] bg-muted animate-pulse" />
                    ) : (room.imageSrc && roomImageOk[room.name] !== false) ? (
                      <button
                        type="button"
                        className="block w-full"
                        onClick={() => openMediaViewer({ type: "image", src: room.imageSrc as string, label: room.title })}
                      >
                        <img
                          src={room.imageSrc}
                          alt={room.title}
                          className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
                          onError={() => {
                            setRoomImageOk((prev) => ({ ...prev, [room.name]: false }));
                          }}
                        />
                      </button>
                    ) : room.videoSrc ? (
                      <div className="relative rounded-3xl shadow-2xl overflow-hidden border border-border">
                        <video src={room.videoSrc} controls playsInline preload="metadata" className="w-full aspect-[4/3] object-cover" />
                        <div className="absolute right-4 top-4">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => openMediaViewer({ type: "video", src: room.videoSrc as string, label: room.title })}
                          >
                            View larger
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img src={premisesFallback} alt={room.title} className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover" />
                    )}
                    <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                      <div className="text-xs font-bold uppercase tracking-wider opacity-80">Starting from</div>
                      <div className="text-2xl font-bold">
                        {isLoadingPrices ? (
                          <div className="h-7 w-28 bg-white/20 rounded animate-pulse" />
                        ) : room.vipPrice !== undefined ? (
                          `₦${room.vipPrice.toLocaleString()}`
                        ) : room.normalPrice !== undefined ? (
                          `₦${room.normalPrice.toLocaleString()}`
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="text-xs font-semibold opacity-90">VIP</div>
                      {room.normalPrice !== undefined && (
                        <div className="mt-2">
                          <div className="text-lg font-bold">₦{room.normalPrice.toLocaleString()}</div>
                          <div className="text-xs font-semibold opacity-90">Normal</div>
                        </div>
                      )}
                      {room.shortRestRate && (
                        <div className="mt-3 border-t border-white/30 pt-3">
                          <div className="text-sm font-bold">Short Rest</div>
                          <div className="text-lg font-bold">₦{room.shortRestRate.amount.toLocaleString()}</div>
                          <div className="text-xs font-semibold opacity-90">{room.shortRestRate.durationLabel}</div>
                        </div>
                      )}
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

                  {room.shortRestRate && (
                    <div className="mb-8 rounded-xl border border-border bg-background/60 p-4 text-sm">
                      <div className="font-semibold">Short Rest available</div>
                      <div className="text-muted-foreground">₦{room.shortRestRate.amount.toLocaleString()} for {room.shortRestRate.durationLabel}</div>
                    </div>
                  )}
                  
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
