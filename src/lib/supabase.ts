import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Database features will be disabled.');
}

// Create a proxy or a dummy client if keys are missing to prevent crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get: () => {
        return () => ({
          from: () => ({
            select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }), count: () => Promise.resolve({ count: 0, error: null }) }),
            insert: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
            upsert: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
          }),
          channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
          removeChannel: () => {},
        });
      }
    });
