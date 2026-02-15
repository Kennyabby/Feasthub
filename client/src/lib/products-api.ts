import { fetchServer } from "./fetchServer";
import { PLANTAIN_PLANET_DB, WAGESERVER_BASE_URL } from "./server-config";

export type PriceType = "normal" | "vip";

export interface RawProduct {
  _id?: string;
  i_d: string;
  name: string;
  salesPrice?: number | string;
  vipPrice?: number | string;
  costPrice?: number | string;
  category?: string;
  type?: string;
  imgId?: string;
  viewLink?: string;
  downloadLink?: string;
}

export interface ProductWithStock extends RawProduct {
  locationStock?: Record<string, { quantity: number; cost: number; sales: number }>;
  totalStock?: number;
  totalCost?: number;
  totalSales?: number;
}

export interface MenuProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  salesPrice: number;
  vipPrice?: number;
  totalStock: number;
  image?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  code: string;
  type: string;
}

// Public products helper using the unauthenticated wageserver route
async function getPublicProductsWithStock(company: string): Promise<ProductWithStock[]> {
  const url = `${WAGESERVER_BASE_URL}/public/products-with-stock?database=${encodeURIComponent(
    company
  )}`;

  try {
    const resp = await fetch(url, {
      method: "GET",
    });

    if (!resp.ok) {
      console.error("Failed to fetch public products", resp.status, resp.statusText);
      return [];
    }

    const data = await resp.json();
    return (data.record || []) as ProductWithStock[];
  } catch (err) {
    console.error("Error fetching public products", err);
    return [];
  }
}

// Public products helper using the unauthenticated wageserver route
async function getPublicServices(company: string): Promise<ProductWithStock[]> {
  const url = `${WAGESERVER_BASE_URL}/public/services?database=${encodeURIComponent(
    company
  )}`;

  try {
    const resp = await fetch(url, {
      method: "GET",
    });

    if (!resp.ok) {
      console.error("Failed to fetch public services", resp.status, resp.statusText);
      return [];
    }

    const data = await resp.json();
    return (data.record || []) as ProductWithStock[];
  } catch (err) {
    console.error("Error fetching public services", err);
    return [];
  }
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  const company = PLANTAIN_PLANET_DB;
  const url = `${WAGESERVER_BASE_URL}/public/product-categories?database=${encodeURIComponent(
    company
  )}`;

  try {
    const resp = await fetch(url, { method: "GET" });
    if (!resp.ok) {
      console.error("Failed to fetch product categories", resp.status, resp.statusText);
      return [];
    }

    const data = await resp.json();
    const rawCategories: any[] = data.categories || [];

    return rawCategories.filter((c, index) => {
      if (c?.code !=='ingredients' && ['goods','services'].includes(c?.type)){
          const rawName = typeof c === 'string' ? c : c?.name ?? c?.id ?? `Category ${index + 1}`;
          const name = String(rawName);
          const id = name.toLowerCase().replace(/\s+/g, '-') || `cat-${index}`;
          const code = c?.code || '';
          const type = c?.type || '';
          return { id, name, code, type } as ProductCategory;
      }
    });
  } catch (err) {
    console.error("Error fetching product categories", err);
    return [];
  }
}

export async function fetchMenuProducts(
  priceType: PriceType
): Promise<MenuProduct[]> {
  const company = PLANTAIN_PLANET_DB;
  const productsWithStock = await getPublicProductsWithStock(company);
  const services = await getPublicServices(company);

  const inStock = productsWithStock.filter((p) => (p.totalStock || 0) > 0);

  return [...inStock, ...services].map((p) => {
    const salesPriceNum = Number(p.salesPrice || 0) || 0;
    const vipPriceNum = p.vipPrice !== undefined ? Number(p.vipPrice || 0) : undefined;

    const displayPrice =
      priceType === "vip" ? vipPriceNum || salesPriceNum : salesPriceNum;
    // Image wiring to match Accommodation/Products: prefer Google Drive thumbnail from imgId
    let image: string | undefined;
    if (p.imgId) {
      image = `https://drive.google.com/thumbnail?id=${p.imgId}&sz=w1000`;
      // console.log("Image URL:",p.name, image);
    } else if (p.downloadLink || p.viewLink) {
      image = (p.downloadLink || p.viewLink) as string;
    }    

    return {
      id: p.i_d,
      name: p.name,
      category: p.category || "uncategorized",
      price: displayPrice,
      salesPrice: salesPriceNum,
      vipPrice: vipPriceNum,
      type: p.type,
      totalStock: Number(p.totalStock || 0),
      image,
    };
  });
}
