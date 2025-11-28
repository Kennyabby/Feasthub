import { Layout } from "@/components/layout";
import { FoodCard } from "@/components/ui-custom";
import { categories, products } from "@/lib/data";
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export default function Menu() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const CategoryList = ({ mobile = false }) => (
    <div className={cn("space-y-1", mobile ? "mt-4" : "")}>
      {!mobile && <h3 className="font-heading font-bold text-lg mb-3 px-2">Categories</h3>}
      <Button
        variant={activeCategory === "all" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveCategory("all");
          if(mobile) setIsFilterOpen(false);
        }}
      >
        All Items
      </Button>
      {categories.map(cat => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.id ? "default" : "ghost"}
          className={cn(
            "w-full justify-start",
            activeCategory === cat.id && "bg-primary text-primary-foreground"
          )}
          onClick={() => {
            setActiveCategory(cat.id);
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
      <div className="bg-muted/30 py-12 border-b border-border">
        <div className="container max-w-screen-xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of delicious meals, from spicy shawarmas to gourmet burgers.
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

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <FoodCard key={product.id} product={product} />
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
