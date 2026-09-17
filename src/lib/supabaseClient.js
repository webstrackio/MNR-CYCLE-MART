import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  console.warn('MNR Cycle Mart: VITE_SUPABASE_URL is not set. Supabase features will be disabled.');
}
if (!supabaseKey) {
  console.warn('MNR Cycle Mart: VITE_SUPABASE_PUBLISHABLE_KEY is not set. Supabase features will be disabled.');
}

/**
 * Shared Supabase client for browser-side (client) usage.
 *
 * Only the publishable key is used here. Secret / service-role keys must stay
 * on a backend and must never be placed in frontend code.
 */
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/** True when the Supabase client was initialized from env vars. */
export const isSupabaseEnabled = supabase !== null;