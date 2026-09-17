import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { supabase, isSupabaseEnabled } from '../lib/supabaseClient';

/* ─── Seed Data ──────────────────────────────────────────────────── */
const seedProducts = [
  { id: 1, name: 'Mountain Explorer Pro', category: 'Mountain Bike', price: 24999, stock: 12, status: 'Active', sku: 'MNR-MOU-001', hsnCode: '8712', unit: 'Nos', image: '🚲' },
  { id: 2, name: 'City Rider 21 Speed',   category: 'Road Bike',     price: 18499, stock: 8,  status: 'Active', sku: 'MNR-ROA-002', hsnCode: '8712', unit: 'Nos', image: '🚲' },
  { id: 3, name: 'Kids Fun Cycle',         category: 'Kids Bike',     price: 6999,  stock: 25, status: 'Active', sku: 'MNR-KID-003', hsnCode: '8712', unit: 'Nos', image: '🚲' },
  { id: 4, name: 'Electric EcoRide',       category: 'E-Bike',        price: 45999, stock: 5,  status: 'Low Stock', sku: 'MNR-EBI-004', hsnCode: '8714', unit: 'Nos', image: '🔋' },
  { id: 5, name: 'Hybrid Comfort Plus',    category: 'Hybrid',        price: 15999, stock: 0,  status: 'Out of Stock', sku: 'MNR-HYB-005', hsnCode: '8712', unit: 'Nos', image: '🚲' },
  { id: 6, name: 'Safety Helmet Pro',      category: 'Accessories',   price: 1299,  stock: 45, status: 'Active', sku: 'MNR-ACC-006', hsnCode: '6506', unit: 'Nos', image: '⛑️' },
  { id: 7, name: 'Cycle Bell Deluxe',      category: 'Accessories',   price: 299,   stock: 80, status: 'Active', sku: 'MNR-ACC-007', hsnCode: '8714', unit: 'Nos', image: '🔔' },
  { id: 8, name: 'Water Bottle Cage',      category: 'Accessories',   price: 499,   stock: 60, status: 'Active', sku: 'MNR-ACC-008', hsnCode: '8714', unit: 'Nos', image: '🧴' },
];

const seedCustomers = [
  { id: 1, name: 'Ravi Kumar',   email: 'ravi@email.com',    phone: '9876543210', orders: 5, totalSpent: 45999, joinDate: 'Jan 2025', address: 'Hyderabad, Telangana' },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com',   phone: '8765432109', orders: 3, totalSpent: 37497, joinDate: 'Mar 2025', address: 'Bangalore, Karnataka' },
  { id: 3, name: 'Karthik S',    email: 'karthik@email.com', phone: '7654321098', orders: 8, totalSpent: 89992, joinDate: 'Feb 2025', address: 'Chennai, Tamil Nadu' },
  { id: 4, name: 'Anjali Reddy', email: 'anjali@email.com',  phone: '6543210987', orders: 2, totalSpent: 31998, joinDate: 'Jun 2025', address: 'Pune, Maharashtra' },
  { id: 5, name: 'Suresh Babu',  email: 'suresh@email.com',  phone: '5432109876', orders: 6, totalSpent: 56994, joinDate: 'Apr 2025', address: 'Mumbai, Maharashtra' },
];

const seedOrders = [
  { id: '#ORD1284', customer: 'Ravi Kumar',   email: 'ravi@email.com',    phone: '+91 98765 43210', items: 2, amount: 8999,  status: 'Delivered', date: 'Sep 15, 2025', address: '123 Main St, Hyderabad' },
  { id: '#ORD1283', customer: 'Priya Sharma', email: 'priya@email.com',   phone: '+91 87654 32109', items: 1, amount: 12499, status: 'Shipped',   date: 'Sep 14, 2025', address: '456 Park Ave, Bangalore' },
  { id: '#ORD1282', customer: 'Karthik S',    email: 'karthik@email.com', phone: '+91 76543 21098', items: 3, amount: 6799,  status: 'Processing',date: 'Sep 14, 2025', address: '789 Lake Rd, Chennai' },
  { id: '#ORD1281', customer: 'Anjali Reddy', email: 'anjali@email.com',  phone: '+91 65432 10987', items: 1, amount: 15999, status: 'Delivered', date: 'Sep 13, 2025', address: '321 Hill St, Pune' },
  { id: '#ORD1280', customer: 'Suresh Babu',  email: 'suresh@email.com',  phone: '+91 54321 09876', items: 2, amount: 9499,  status: 'Shipped',   date: 'Sep 13, 2025', address: '654 Valley Rd, Mumbai' },
  { id: '#ORD1279', customer: 'Meena Devi',   email: 'meena@email.com',   phone: '+91 43210 98765', items: 1, amount: 24999, status: 'Cancelled', date: 'Sep 12, 2025', address: '987 Garden St, Delhi' },
];

/* ─── Storage helpers (offline/local fallback) ───────────────────── */
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
}

/* ─── Supabase <-> app shape mappers ─────────────────────────────── */
function productFromRow(r) {
  return {
    id: r.id, name: r.name, category: r.category,
    price: Number(r.price), stock: Number(r.stock),
    status: r.status, sku: r.sku, hsnCode: r.hsn_code,
    unit: r.unit, image: r.image,
  };
}
function productToRow(p) {
  return {
    id: p.id, name: p.name, category: p.category,
    price: Number(p.price), stock: Number(p.stock),
    status: p.status, sku: p.sku, hsn_code: p.hsnCode,
    unit: p.unit, image: p.image,
  };
}

function customerFromRow(r) {
  return {
    id: r.id, name: r.name, email: r.email, phone: r.phone,
    orders: Number(r.orders), totalSpent: Number(r.total_spent),
    joinDate: r.join_date, address: r.address,
  };
}
function customerToRow(c) {
  return {
    id: c.id, name: c.name, email: c.email, phone: c.phone,
    orders: Number(c.orders), total_spent: Number(c.totalSpent),
    join_date: c.joinDate, address: c.address,
  };
}

function orderFromRow(r) {
  return {
    id: r.id, customer: r.customer, email: r.email, phone: r.phone,
    items: Number(r.items), amount: Number(r.amount),
    status: r.status, date: r.date, address: r.address, invoiceNo: r.invoice_no,
  };
}
function orderToRow(o) {
  return {
    id: o.id, customer: o.customer, email: o.email, phone: o.phone,
    items: Number(o.items), amount: Number(o.amount),
    status: o.status, date: o.date, address: o.address, invoice_no: o.invoiceNo,
  };
}

function billFromRow(r) {
  return {
    invoiceNo: r.invoice_no, date: r.date,
    customerName: r.customer_name, customerPhone: r.customer_phone,
    customerAddress: r.customer_address, customerEmail: r.customer_email,
    items: Array.isArray(r.items) ? r.items : (r.items || []),
    subtotal: Number(r.subtotal), discount: Number(r.discount),
    discountType: r.discount_type, discountAmt: Number(r.discount_amt),
    igstTotal: Number(r.igst_total), grandTotal: Number(r.grand_total),
    paymentMethod: r.payment_method, paymentStatus: r.payment_status,
    status: r.status, createdAt: r.created_at,
  };
}
function billToRow(b) {
  return {
    invoice_no: b.invoiceNo, date: b.date,
    customer_name: b.customerName, customer_phone: b.customerPhone,
    customer_address: b.customerAddress, customer_email: b.customerEmail,
    items: b.items || [],
    subtotal: Number(b.subtotal), discount: Number(b.discount),
    discount_type: b.discountType, discount_amt: Number(b.discountAmt),
    igst_total: Number(b.igstTotal), grand_total: Number(b.grandTotal),
    payment_method: b.paymentMethod, payment_status: b.paymentStatus,
    status: b.status, created_at: b.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/* ─── Upsert helpers (fire-and-forget with error capture) ────────── */
async function upsertRows(table, rows, conflictColumn) {
  if (!isSupabaseEnabled || !supabase || !rows || rows.length === 0) return { data: rows };
  const { error } = await supabase
    .from(table)
    .upsert(rows, conflictColumn ? { onConflict: conflictColumn } : undefined);
  return { rows, error };
}

/* ─── Invoice number generator ───────────────────────────────────── */
export function generateInvoiceNumber(existingBills = []) {
  const today = new Date();
  const ymd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const prefix = `MNR-INV-${ymd}-`;
  let maxSeq = 0;
  for (const b of existingBills) {
    const m = String(b.invoiceNo || '').match(/^MNR-INV-\d{8}-(\d{4})$/);
    if (m) maxSeq = Math.max(maxSeq, parseInt(m[1], 10));
  }
  const seq = String(maxSeq + 1).padStart(4, '0');
  return `${prefix}${seq}`;
}

/* ─── Context ────────────────────────────────────────────────────── */
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products,  setProductsState]  = useState(() => load('mnr_products',  seedProducts));
  const [customers, setCustomersState] = useState(() => load('mnr_customers', seedCustomers));
  const [orders,    setOrdersState]    = useState(() => load('mnr_orders',    seedOrders));
  const [bills,     setBillsState]     = useState(() => load('mnr_bills',     []));

  /* DB sync status: 'loading' | 'ready' | 'fallback' (local only) */
  const [dbStatus, setDbStatus] = useState(isSupabaseEnabled ? 'loading' : 'fallback');
  const [dbError,  setDbError]  = useState(null);

  /* Live mirrored refs so functional updates always see the latest value */
  const productsRef  = useRef(products);
  const customersRef = useRef(customers);
  const ordersRef    = useRef(orders);
  const billsRef     = useRef(bills);

  /* ── Hydrate from Supabase on mount ── */
  useEffect(() => {
    if (!isSupabaseEnabled || !supabase) { setDbStatus('fallback'); return; }

    let cancelled = false;
    (async () => {
      try {
        const [{ data: p }, { data: c }, { data: o }, { data: b }] = await Promise.all([
          supabase.from('products').select('*').order('id'),
          supabase.from('customers').select('*').order('id'),
          supabase.from('orders').select('*').order('id'),
          supabase.from('bills').select('*').order('invoice_no'),
        ]);

        if (cancelled) return;

        const nextProducts  = (p && p.length)  ? p.map(productFromRow)  : load('mnr_products',  seedProducts);
        const nextCustomers = (c && c.length)  ? c.map(customerFromRow) : load('mnr_customers', seedCustomers);
        const nextOrders    = (o && o.length)  ? o.map(orderFromRow)    : load('mnr_orders',    seedOrders);
        const nextBills     = (b && b.length)  ? b.map(billFromRow)     : load('mnr_bills',     []);

        productsRef.current  = nextProducts;  setProductsState(nextProducts);  save('mnr_products',  nextProducts);
        customersRef.current = nextCustomers; setCustomersState(nextCustomers); save('mnr_customers', nextCustomers);
        ordersRef.current    = nextOrders;    setOrdersState(nextOrders);    save('mnr_orders',    nextOrders);
        billsRef.current     = nextBills;     setBillsState(nextBills);     save('mnr_bills',     nextBills);

        setDbError(null);
        setDbStatus('ready');
      } catch (e) {
        if (cancelled) return;
        console.error('MNR Store: Supabase hydration failed — using local fallback.', e);
        setDbError(e?.message || 'Supabase hydration failed');
        setDbStatus('fallback');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  /* Public setters — identical signatures to the old context value */
  const setProducts = useCallback((updater) => {
    setProductsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      productsRef.current = next;
      save('mnr_products', next);
      if (isSupabaseEnabled) {
        upsertRows('products', next.map(productToRow), 'id')
          .then(({ error }) => error && console.error('[products] upsert', error));
      }
      return next;
    });
  }, []);

  const setCustomers = useCallback((updater) => {
    setCustomersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      customersRef.current = next;
      save('mnr_customers', next);
      if (isSupabaseEnabled) {
        upsertRows('customers', next.map(customerToRow), 'id')
          .then(({ error }) => error && console.error('[customers] upsert', error));
      }
      return next;
    });
  }, []);

  const setOrders = useCallback((updater) => {
    setOrdersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      ordersRef.current = next;
      save('mnr_orders', next);
      if (isSupabaseEnabled) {
        upsertRows('orders', next.map(orderToRow), 'id')
          .then(({ error }) => error && console.error('[orders] upsert', error));
      }
      return next;
    });
  }, []);

  const setBills = useCallback((updater) => {
    setBillsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      billsRef.current = next;
      save('mnr_bills', next);
      if (isSupabaseEnabled) {
        upsertRows('bills', next.map(billToRow), 'invoice_no')
          .then(({ error }) => error && console.error('[bills] upsert', error));
      }
      return next;
    });
  }, []);

  /* ── Reduce stock for a list of items { productId, qty } ── */
  const reduceStock = useCallback((items) => {
    setProductsState((prev) => {
      const updated = prev.map(p => {
        const item = items.find(i => i.productId === p.id);
        if (!item) return p;
        const newStock = Math.max(0, p.stock - item.qty);
        return {
          ...p,
          stock: newStock,
          status: newStock === 0 ? 'Out of Stock' : newStock <= 5 ? 'Low Stock' : 'Active',
        };
      });
      productsRef.current = updated;
      save('mnr_products', updated);
      if (isSupabaseEnabled) {
        upsertRows('products', updated.map(productToRow), 'id')
          .then(({ error }) => error && console.error('[products] reduceStock upsert', error));
      }
      return updated;
    });
  }, []);

  /* ── Save a completed bill (atomic in intent) ── */
  const saveBill = useCallback((bill) => {
    // 1. Save the bill
    const newBills = [bill, ...billsRef.current];
    billsRef.current = newBills;
    setBillsState(newBills);
    save('mnr_bills', newBills);
    if (isSupabaseEnabled) {
      upsertRows('bills', newBills.map(billToRow), 'invoice_no')
        .then(({ error }) => error && console.error('[bills] saveBill upsert', error));
    }

    // 2. Reduce stock
    reduceStock(bill.items.map(i => ({ productId: i.productId, qty: i.qty })));

    // 3. Create an order record
    const orderId = `#ORD${1285 + ordersRef.current.length}`;
    const newOrder = {
      id: orderId,
      customer: bill.customerName,
      email: bill.customerEmail || '',
      phone: bill.customerPhone || '',
      items: bill.items.length,
      amount: bill.grandTotal,
      status: bill.paymentStatus === 'Paid' ? 'Processing' : 'Pending',
      date: new Date(bill.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      address: bill.customerAddress || '',
      invoiceNo: bill.invoiceNo,
    };
    const newOrders = [newOrder, ...ordersRef.current];
    ordersRef.current = newOrders;
    setOrdersState(newOrders);
    save('mnr_orders', newOrders);
    if (isSupabaseEnabled) {
      upsertRows('orders', newOrders.map(orderToRow), 'id')
        .then(({ error }) => error && console.error('[orders] saveBill upsert', error));
    }

    // 4. Update or create customer totalSpent
    setCustomersState((prev) => {
      const idx = prev.findIndex(c =>
        c.phone === bill.customerPhone || c.name === bill.customerName
      );
      let updated;
      if (idx >= 0) {
        updated = prev.map((c, i) =>
          i === idx
            ? { ...c, orders: c.orders + 1, totalSpent: c.totalSpent + bill.grandTotal }
            : c
        );
      } else {
        const newCustomer = {
          id: prev.length + 1,
          name: bill.customerName,
          email: bill.customerEmail || '',
          phone: bill.customerPhone || '',
          orders: 1,
          totalSpent: bill.grandTotal,
          joinDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
          address: bill.customerAddress || '',
        };
        updated = [newCustomer, ...prev];
      }
      customersRef.current = updated;
      save('mnr_customers', updated);
      if (isSupabaseEnabled) {
        upsertRows('customers', updated.map(customerToRow), 'id')
          .then(({ error }) => error && console.error('[customers] saveBill upsert', error));
      }
      return updated;
    });
  }, [reduceStock]);

  /* ── Cancel/refund a bill ── */
  const cancelBill = useCallback((invoiceNo) => {
    setBillsState((prev) => {
      const updated = prev.map(b =>
        b.invoiceNo === invoiceNo ? { ...b, status: 'Cancelled', paymentStatus: 'Refunded' } : b
      );
      billsRef.current = updated;
      save('mnr_bills', updated);
      if (isSupabaseEnabled) {
        upsertRows('bills', updated.map(billToRow), 'invoice_no')
          .then(({ error }) => error && console.error('[bills] cancelBill upsert', error));
      }
      return updated;
    });
  }, []);

  /* ── Update a bill (e.g. payment status) ── */
  const updateBill = useCallback((invoiceNo, changes) => {
    setBillsState((prev) => {
      const updated = prev.map(b =>
        b.invoiceNo === invoiceNo ? { ...b, ...changes } : b
      );
      billsRef.current = updated;
      save('mnr_bills', updated);
      if (isSupabaseEnabled) {
        upsertRows('bills', updated.map(billToRow), 'invoice_no')
          .then(({ error }) => error && console.error('[bills] updateBill upsert', error));
      }
      return updated;
    });
  }, []);

  /* ── Delete a bill permanently ── */
  const deleteBill = useCallback((invoiceNo) => {
    setBillsState((prev) => {
      const updated = prev.filter(b => b.invoiceNo !== invoiceNo);
      billsRef.current = updated;
      save('mnr_bills', updated);
      if (isSupabaseEnabled) {
        upsertRows('bills', updated.map(billToRow), 'invoice_no')
          .then(({ error }) => error && console.error('[bills] deleteBill upsert', error));
      }
      return updated;
    });
  }, []);

  /* ── Add product ── */
  const addProduct = useCallback((product) => {
    setProductsState((prev) => {
      const updated = [product, ...prev];
      productsRef.current = updated;
      save('mnr_products', updated);
      if (isSupabaseEnabled) {
        upsertRows('products', updated.map(productToRow), 'id')
          .then(({ error }) => error && console.error('[products] addProduct upsert', error));
      }
      return updated;
    });
  }, []);

  const value = {
    products, setProducts,
    customers, setCustomers,
    orders, setOrders,
    bills, setBills,
    saveBill,
    cancelBill,
    updateBill,
    deleteBill,
    addProduct,
    generateInvoiceNumber: () => generateInvoiceNumber(billsRef.current),
    /* DB sync metadata (new, additive — existing consumers unaffected) */
    dbStatus,
    dbError,
    isSupabaseEnabled,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}