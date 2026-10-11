// JIREH Cleaning — Vercel server function: POST /api/estimate
// Location in repo: /api/estimate.ts  (project root, NOT src/)
// Requires Vercel env vars: SUPABASE_URL, SUPABASE_SECRET_KEY (server-only, no VITE_ prefix)
// Install: npm i @supabase/supabase-js
//
// NOTE for vercel.json: the current rewrite "/(.*)" -> "/index.html" will swallow /api/*.
// Update vercel.json to exclude /api, e.g.:
// {
//   "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
// }

import { createClient } from '@supabase/supabase-js';

type VercelReq = {
  method?: string;
  body?: any;
  headers: Record<string, string | string[] | undefined>;
};

type VercelRes = {
  status: (code: number) => VercelRes;
  json: (obj: any) => void;
  setHeader: (k: string, v: string) => void;
};

const ALLOWED_SERVICES = new Set([
  'regular',
  'deep',
  'move-in-out',
  'car-detailing',
  'commercial',
]);

const ALLOWED_ADDONS = new Set(['oven', 'fridge', 'behind-appliances']);

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return res.status(500).json({ ok: false, error: 'Server not configured' });
  }

  const b = req.body ?? {};

  // --- Spam protection: honeypot must be empty ---
  if (typeof b.website === 'string' && b.website.trim() !== '') {
    // Pretend success so bots learn nothing
    return res.status(200).json({ ok: true });
  }

  // --- Validation ---
  const name = String(b.name ?? '').trim();
  const email = String(b.email ?? '').trim().toLowerCase();
  const phone = String(b.phone ?? '').trim();
  const address = String(b.address ?? '').trim();
  const service_type = String(b.service_type ?? '').trim();
  const notes = String(b.notes ?? '').trim();
  const preferred_date = String(b.preferred_date ?? '').trim();

  const bedrooms = b.bedrooms === '' || b.bedrooms == null ? null : Number(b.bedrooms);
  const bathrooms = b.bathrooms === '' || b.bathrooms == null ? null : Number(b.bathrooms);

  const addons: string[] = Array.isArray(b.addons)
    ? b.addons.map((a: any) => String(a).trim()).filter((a: string) => ALLOWED_ADDONS.has(a))
    : [];

  if (name.length < 2) return res.status(400).json({ ok: false, error: 'Please enter your name.' });
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email.' });
  if (!ALLOWED_SERVICES.has(service_type))
    return res.status(400).json({ ok: false, error: 'Please choose a service type.' });
  if (bedrooms != null && (!Number.isInteger(bedrooms) || bedrooms < 0 || bedrooms > 20))
    return res.status(400).json({ ok: false, error: 'Bedrooms looks invalid.' });
  if (bathrooms != null && (isNaN(bathrooms) || bathrooms < 0 || bathrooms > 20))
    return res.status(400).json({ ok: false, error: 'Bathrooms looks invalid.' });
  if (notes.length > 2000) return res.status(400).json({ ok: false, error: 'Notes are too long.' });

  // Basic rate-limit hint: require a plausible user-agent
  const ua = req.headers['user-agent'];
  if (!ua) return res.status(400).json({ ok: false, error: 'Bad request.' });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from('estimate_requests').insert({
    name,
    email,
    phone: phone || null,
    address: address || null,
    service_type,
    bedrooms,
    bathrooms,
    addons,
    preferred_date: preferred_date || null,
    notes: notes || null,
    website: null,
    status: 'new',
    source: 'website',
  });

  if (error) {
    console.error('estimate insert failed', error);
    return res.status(500).json({ ok: false, error: 'Could not save your request. Please try again.' });
  }

  // Only now should the frontend show "Request received" + next steps.
  return res.status(200).json({ ok: true });
}
