import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const token = req.headers.authorization;

  // Protect the backend endpoint from hackers
  if (token !== "secure-admin-session-token") {
    return res.status(401).json({ error: "Access Denied" });
  }

  const { welcomeMessage, items } = req.body;

  // This writes the data permanently to Vercel's cloud data layer
  await kv.set('websiteData', { welcomeMessage, items });

  return res.status(200).json({ success: true });
}
