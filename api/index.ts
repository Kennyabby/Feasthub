import "dotenv/config";
import { createApp } from "../server/index.js";

let cachedApp: any = null;

async function getApp() {
  if (!cachedApp) {
    const result = await createApp();
    cachedApp = result.app;
  }
  return cachedApp;
}

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  // Reconstruct the original request URL from the captured path
  const path = Array.isArray(req.query.path) 
    ? req.query.path.join("/") 
    : req.query.path ?? "";
  
  // Restore original URL for Express routing
  const queryString = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
  req.url = `/api/${path}${queryString}`;
  
  const app = await getApp();
  return app(req, res);
}
