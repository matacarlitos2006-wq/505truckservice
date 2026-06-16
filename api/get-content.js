import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    // Attempt to grab data from Vercel storage
    let data = await kv.get('websiteData');
    
    // Default fallback layout if storage is totally empty/new
    if (!data) {
      data = {
        welcomeMessage: "Welcome to 505 Truck Service",
        items: [
          { id: 1, name: "Oil Change & Filter Service" },
          { id: 2, name: "Brake Inspection & Repair" }
        ]
      };
    }
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to read data" });
  }
}
