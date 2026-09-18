import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { supabase, isSupabaseEnabled } from '../lib/supabaseClient';

const NotificationContext = createContext(null);

const LIMITSET = 20;
const STORAGE_KEY = 'mnr_notifications';
const STORAGE_CACHE_KEY = 'mnr_notifications_cache';
const SEED_MARKER = 'mnr_notifications_seed_marker';
const LIMIT = LIMITSET;

function notificationFromRow(r) {
  return {
    id: r.id,
    title: r.title,
    message: r.message,
    isRead: Boolean(r.is_read),
    createdAt: r.created_at,
  };
}
function notificationToRow(n) {
  return {
    id: n.id,
    title: n.title,
    message: n.message,
    is_read: n.isRead,
    created_at: n.createdAt,
  };
}
function rowIdOf(n) {
  return String(n.id);
}

function cachedLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function cachedSave(items) {
  try {
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(items));
  } catch {
    /* quota exceeded */
  }
}

const welcome = {
  id: 0,
  title: 'Welcome to M N R Cycle Mart',
  message:
    'New orders, billing updates and announcements will appear here in real time.',
  isRead: false,
  createdAt: new Date().toISOString(),
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(cachedLoad);
  const [loading, setLoading] = useState(true);
  const seeded = useRef(false);

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    if (isSupabaseEnabled) return;
    if (localStorage.getItem(SEED_MARKER)) return;
    if (notifications.length === 0) {
      const row = { ...welcome, id: 'welcome-' + Date.now() };
      setNotifications([row]);
      cachedSave([row]);
    }
    localStorage.setItem(SEED_MARKER, '1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      if (!isSupabaseEnabled || !supabase) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(LIMIT);
        if (error) throw error;
        if (cancelled) return;
        const rows = (data || []).map(notificationFromRow);
        setNotifications(rows);
        cachedSave(rows);
      } catch (e) {
        console.error('[MNR Cycle Mart] hydration failed', e);
        if (!cancelled) setNotifications(cachedLoad());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseEnabled || !supabase) return undefined;
    const channel = supabase
      .channel('mnr-notifications-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const n = notificationFromRow(payload.new);
          setNotifications((prev) => [n, ...prev].slice(0, LIMIT));
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications' },
        (payload) => {
          const updated = notificationFromRow(payload.new);
          setNotifications((prev) =>
            prev.map((x) => (rowIdOf(x) === rowIdOf(updated) ? updated : x))
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notifications' },
        (payload) => {
          const removed = rowIdOf(payload.old);
          setNotifications((prev) => prev.filter((n) => rowIdOf(n) !== removed));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = useCallback(async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (rowIdOf(n) === String(id) ? { ...n, isRead: true } : n))
    );
    if (!isSupabaseEnabled || !supabase) return;
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    if (error) console.error('[MNR Cycle Mart] markAsRead failed', error);
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    if (!isSupabaseEnabled || !supabase) return;
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('is_read', false);
    if (error) console.error('[MNR Cycle Mart] markAllAsRead failed', error);
  }, []);

  const value = {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
