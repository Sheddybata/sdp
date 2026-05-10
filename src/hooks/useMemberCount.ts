import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useMemberCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count: supabaseCount, error } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        
        // Base count + real registrations
        const BASE_MEMBERS = 247893;
        setCount(BASE_MEMBERS + (supabaseCount || 0));
      } catch (err) {
        console.error('Error fetching member count:', err);
        setCount(247893); // Fallback
      } finally {
        setLoading(false);
      }
    }

    fetchCount();

    // Refresh periodically (avoids Supabase Realtime WebSocket — often blocked by firewalls/ad blockers).
    const intervalId = window.setInterval(fetchCount, 120_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return { count, loading };
}


