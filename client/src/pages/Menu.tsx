import { Layout } from "@/components/layout";
import { FoodCard } from "@/components/ui-custom";
import { useEffect, useRef, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { fetchMenuProducts, fetchProductCategories, type MenuProduct, type PriceType, type ProductCategory } from "@/lib/products-api";

export default function Menu() {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [curCategory, setCurCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceType, setPriceType] = useState<PriceType>("normal");
  const [products, setProducts] = useState<MenuProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [hasExplicitPriceType, setHasExplicitPriceType] = useState<boolean>(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "price-asc" | "price-desc">("name-asc");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const menuTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const initialCategoryCode = searchParams.get("category");
    const initialCategory = initialCategoryCode || "all";
    const rawPriceType = searchParams.get("priceType");
    const urlPriceType: PriceType = rawPriceType === "vip" ? "vip" : rawPriceType === "normal" ? "normal" : "normal";

    const hasPriceTypeParam = rawPriceType === "vip" || rawPriceType === "normal";
    setActiveCategory(initialCategory);
    setPriceType(urlPriceType);
    setHasExplicitPriceType(hasPriceTypeParam);

    (async () => {
      const [menuProducts, fetchedCategories] = await Promise.all([
        fetchMenuProducts(urlPriceType),
        fetchProductCategories(),
      ]);
      setProducts(menuProducts);
      setIsLoadingProducts(false);

      setCategories(fetchedCategories);
      setIsLoadingCategories(false);

      // If we came from Home with a category code, align selection/highlight
      if (initialCategoryCode) {
        const match = fetchedCategories.find(cat => cat.code === initialCategoryCode);
        if (match) {
          setCurCategory(match);
          setActiveCategory(match.name);
        }
      }

      // Scroll menu into view on open (after data is ready)
      if (menuTopRef.current) {
        menuTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Initialize price range based on loaded products
      if (menuProducts.length) {
        const prices = menuProducts.map(p => Number(p.price || 0));
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);
      }
    })();
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory =
        activeCategory === "all" || product.category === curCategory?.code;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const price = Number(product.price || 0);
      const withinMin = minPrice === null || price >= minPrice;
      const withinMax = maxPrice === null || price <= maxPrice;
      return matchesCategory && matchesSearch && withinMin && withinMax;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return Number(a.price || 0) - Number(b.price || 0);
        case "price-desc":
          return Number(b.price || 0) - Number(a.price || 0);
        default:
          return 0;
      }
    });

  const CategoryList = ({ mobile = false }) => (
    <div className={cn("space-y-1", mobile ? "mt-4" : "")}>
      {!mobile && <h3 className="font-heading font-bold text-lg mb-3 px-2">Categories</h3>}
      {isLoadingCategories && (
        <div className="space-y-2 px-2">
          <div className="h-9 rounded-md bg-muted animate-pulse" />
          <div className="h-9 rounded-md bg-muted animate-pulse" />
          <div className="h-9 rounded-md bg-muted animate-pulse" />
        </div>
      )}
      <Button
        variant={activeCategory === "all" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveCategory("all");
          setCurCategory(null);
          if(mobile) setIsFilterOpen(false);
        }}
      >
        All Items
      </Button>
      {categories.filter((ct)=>{
        return ['goods', 'services'].includes(ct.type)
      }).map(cat => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.name ? "default" : "ghost"}
          className={cn(
            "w-full justify-start",
            activeCategory === cat.name && "bg-primary text-primary-foreground"
          )}
          onClick={() => {
            setActiveCategory(cat.name);
            setCurCategory(cat);
            if(mobile) setIsFilterOpen(false);
          }}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );

  return (
    <Layout>
      <div ref={menuTopRef} className="bg-muted/30 py-12 border-b border-border">
        <div className="container max-w-screen-xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">The Plantain Planet Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the current accommodation, food and drinks menu across our restaurant, VIP lounge, and open bar.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8">
            <div className="sticky top-24 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search food..." 
                  className="pl-9 bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <CategoryList />
            </div>
          </aside>

          {/* Mobile Controls */}
          <div className="md:hidden flex gap-4 sticky top-20 z-30 bg-background/95 backdrop-blur p-2 -mx-2 rounded-lg border-b border-border mb-6">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 bg-card h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading">Menu Categories</SheetTitle>
                  </SheetHeader>
                  <CategoryList mobile />
                </SheetContent>
              </Sheet>
          </div>

          {/* Filters + Product Grid */}
          <div className="flex-1 space-y-4">
            {/* Sort & Price Filters */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full h-10 rounded-md border border-border bg-card px-3 text-sm"
                >
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
              <div className="flex-1 flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Min price (₦)</label>
                  <Input
                    type="number"
                    value={minPrice ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setMinPrice(val === "" ? null : Number(val));
                    }}
                    className="h-10 bg-card"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Max price (₦)</label>
                  <Input
                    type="number"
                    value={maxPrice ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setMaxPrice(val === "" ? null : Number(val));
                    }}
                    className="h-10 bg-card"
                  />
                </div>
              </div>
            </div>

            {isLoadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                  >
                    <div className="aspect-[4/3] bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="flex items-center justify-between pt-2">
                        <div className="h-5 bg-muted rounded w-16" />
                        <div className="h-8 bg-muted rounded-full w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <FoodCard
                    key={product.id}
                    product={product}
                    showBothPrices={!hasExplicitPriceType}
                    priceType={priceType}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">No food items found matching your criteria.</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-primary"
                  onClick={() => {setActiveCategory("all"); setSearchQuery("");}}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
