import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mod = await import("../apps/backend/src/app.js");
  const app = mod.default;
  return app(req, res);
}