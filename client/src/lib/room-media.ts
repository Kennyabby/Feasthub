export type RoomMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; title?: string };

export type RoomMediaBundle = {
  images: { src: string; alt?: string }[];
  videos: { src: string; title?: string }[];
};

export type RoomDescriptor = {
  id: string;
  name: string;
  category?: string;
};

export function getRoomNumberFromProductId(productId: string | null | undefined): number | null {
  if (!productId) return null;
  const m = String(productId).match(/(\d+)/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function getRoomFolderFromRoomName(roomName: string | null | undefined): string | null {
  if (!roomName) return null;
  const name = String(roomName).trim().toLowerCase();
  if (name.includes("short") && name.includes("rest")) return "short rest";
  const m = name.match(/room\s*(\d+)/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return null;
  if (n < 1 || n > 5) return null;
  return `room ${n}`;
}

async function urlExists(url: string): Promise<boolean> {
  try {
    // Some static hosts do not support HEAD reliably; fall back to GET.
    // Also, ensure we don't treat a generic HTML 404 page as a "valid" asset.
    const head = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (head.ok) {
      const ct = head.headers.get("content-type") || "";
      if (ct && !ct.toLowerCase().includes("text/html")) return true;
    }

    const get = await fetch(url, { method: "GET", cache: "no-store" });
    if (!get.ok) return false;
    const ct = get.headers.get("content-type") || "";
    if (ct && ct.toLowerCase().includes("text/html")) return false;
    return true;
  } catch {
    return false;
  }
}

async function mediaUrlExists(url: string, expected: "image" | "video"): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return false;
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (expected === "image") return ct.startsWith("image/");
    if (expected === "video") return ct.startsWith("video/");
    return false;
  } catch {
    return false;
  }
}

async function discoverNumberedFiles(opts: {
  basePath: string;
  prefix: string;
  exts: string[];
  altPrefix?: string;
  max?: number;
}): Promise<string[]> {
  const max = typeof opts.max === "number" ? opts.max : 30;
  const out: string[] = [];
  const expectedType: "image" | "video" = opts.prefix.toLowerCase().includes("photo") ? "image" : "video";

  for (let i = 1; i <= max; i++) {
    let found = false;

    for (const ext of opts.exts) {
      const url = `${opts.basePath}/${opts.prefix}${i}${ext}`;
      if ((await urlExists(url)) && (await mediaUrlExists(url, expectedType))) {
        out.push(url);
        found = true;
        break;
      }
    }

    if (!found && opts.altPrefix) {
      for (const ext of opts.exts) {
        const url = `${opts.basePath}/${opts.altPrefix}${i}${ext}`;
        if ((await urlExists(url)) && (await mediaUrlExists(url, expectedType))) {
          out.push(url);
          found = true;
          break;
        }
      }
    }

    // Stop at first missing index to keep naming sequential (photo1..photoN)
    if (!found) break;
  }

  return out;
}

export async function getRoomMediaByProduct(product: RoomDescriptor): Promise<RoomMediaBundle> {
  if (!product) return { images: [], videos: [] };
  if (product.category && String(product.category).toLowerCase() !== "room") {
    return { images: [], videos: [] };
  }

  const folder = getRoomFolderFromRoomName(product.name);
  if (!folder) return { images: [], videos: [] };

  const base = `/rooms/${encodeURIComponent(folder)}`.replace(/%20/g, " ");

  const imageUrls = await discoverNumberedFiles({
    basePath: `${base}/images`,
    prefix: "photo",
    exts: [".jpg", ".jpeg", ".png", ".webp"],
    max: 30,
  });

  const videoUrls = await discoverNumberedFiles({
    basePath: `${base}/media`,
    prefix: "media",
    exts: [".mp4", ".webm", ".mov"],
    max: 10,
  });

  return {
    images: imageUrls.map((src, idx) => ({ src, alt: `${product.name} photo ${idx + 1}` })),
    videos: videoUrls.map((src, idx) => ({ src, title: `${product.name} video ${idx + 1}` })),
  };
}

export function getRoomMediaByRoomNumber(roomNumber: number): RoomMediaBundle {
  // Placeholder wiring: you will replace these imports with real files you paste.
  // Vite requires static imports for asset bundling.

  void roomNumber;
  return { images: [], videos: [] };
}
