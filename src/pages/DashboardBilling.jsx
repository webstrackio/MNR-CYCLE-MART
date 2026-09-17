import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt, Plus, Trash2, Search, User, Package,
  Printer, Download, Save, Eye, X, ChevronDown, Check,
  CreditCard, Smartphone, Banknote, Clock, FileText,
  CheckCircle, XCircle, Edit2, History, Tag, Hash,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AdminLayout from '../components/AdminLayout';

/* ─── Constants ────────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  { id: 'Cash',    label: 'Cash',    icon: Banknote },
  { id: 'UPI',     label: 'UPI',     icon: Smartphone },
  { id: 'Card',    label: 'Card',    icon: CreditCard },
  { id: 'Pending', label: 'Pending', icon: Clock },
];

const IGST_RATES = [0, 5, 12, 18, 28];

/* ─── Number formatter ─────────────────────────────────────────── */
const fmt = (n) => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (n) => Number(n || 0).toLocaleString('en-IN');

/* ─── MNR Invoice Template (print + preview) ───────────────────── */
function MNRInvoice({ bill, forPrint = false }) {
  const subtotal   = bill.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const igstAmt    = bill.items.reduce((s, i) => s + (i.qty * i.unitPrice * (i.igstRate / 100)), 0);
  const discountAmt = bill.discountType === '%'
    ? subtotal * (bill.discount / 100)
    : Number(bill.discount || 0);
  const grandTotal = subtotal + igstAmt - discountAmt;

  return (
    <div
      id={forPrint ? 'mnr-print-invoice' : undefined}
      className={`bg-white text-black font-sans ${forPrint ? 'p-0' : ''}`}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#000' }}
    >
      {/* ── Header ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000' }}>
        <tbody>
          <tr>
            {/* Logo cell */}
            <td style={{ width: '120px', padding: '12px 16px', borderRight: '2px solid #000', verticalAlign: 'middle' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* MNR Cycle Mart Logo SVG */}
                <svg viewBox="0 0 90 80" style={{ width: '80px', height: '70px' }} xmlns="http://www.w3.org/2000/svg">
                  {/* Bike wheels */}
                  <circle cx="22" cy="54" r="16" fill="none" stroke="#000" strokeWidth="3"/>
                  <circle cx="68" cy="54" r="16" fill="none" stroke="#000" strokeWidth="3"/>
                  <circle cx="22" cy="54" r="3" fill="#000"/>
                  <circle cx="68" cy="54" r="3" fill="#000"/>
                  {/* Spokes left */}
                  <line x1="22" y1="38" x2="22" y2="70" stroke="#000" strokeWidth="1.5"/>
                  <line x1="6" y1="54" x2="38" y2="54" stroke="#000" strokeWidth="1.5"/>
                  <line x1="10" y1="43" x2="34" y2="65" stroke="#000" strokeWidth="1.5"/>
                  <line x1="10" y1="65" x2="34" y2="43" stroke="#000" strokeWidth="1.5"/>
                  {/* Spokes right */}
                  <line x1="68" y1="38" x2="68" y2="70" stroke="#000" strokeWidth="1.5"/>
                  <line x1="52" y1="54" x2="84" y2="54" stroke="#000" strokeWidth="1.5"/>
                  <line x1="56" y1="43" x2="80" y2="65" stroke="#000" strokeWidth="1.5"/>
                  <line x1="56" y1="65" x2="80" y2="43" stroke="#000" strokeWidth="1.5"/>
                  {/* Frame */}
                  <line x1="22" y1="54" x2="45" y2="30" stroke="#000" strokeWidth="3"/>
                  <line x1="45" y1="30" x2="68" y2="54" stroke="#000" strokeWidth="3"/>
                  <line x1="45" y1="30" x2="55" y2="54" stroke="#000" strokeWidth="2.5"/>
                  <line x1="22" y1="54" x2="55" y2="54" stroke="#000" strokeWidth="2.5"/>
                  {/* Seat */}
                  <line x1="45" y1="30" x2="42" y2="20" stroke="#000" strokeWidth="2.5"/>
                  <line x1="36" y1="19" x2="48" y2="19" stroke="#000" strokeWidth="3"/>
                  {/* Handlebar */}
                  <line x1="68" y1="54" x2="72" y2="38" stroke="#000" strokeWidth="2.5"/>
                  <line x1="68" y1="38" x2="76" y2="38" stroke="#000" strokeWidth="3"/>
                  {/* Pedal crank */}
                  <circle cx="55" cy="54" r="4" fill="none" stroke="#000" strokeWidth="2"/>
                  <line x1="51" y1="54" x2="48" y2="59" stroke="#000" strokeWidth="2"/>
                  <line x1="59" y1="54" x2="62" y2="59" stroke="#000" strokeWidth="2"/>
                  {/* Chain ring */}
                  <ellipse cx="55" cy="54" rx="8" ry="6" fill="none" stroke="#000" strokeWidth="1.2"/>
                </svg>
                <div style={{ fontSize: '9px', fontWeight: 'bold', marginTop: '2px', letterSpacing: '1px', textAlign: 'center' }}>
                  MNR<br/>CYCLE MART
                </div>
              </div>
            </td>
            {/* Title cell */}
            <td style={{ padding: '12px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
              <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px' }}>MNR CYCLE MART</div>
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>17-328, T V NAIDU STREET, CHITTOOR, AP-517001.</div>
              <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '2px' }}>Ph: 9703275716, 8919267847</div>
              <div style={{ fontSize: '12px', fontWeight: '700' }}>GSTIN: 37ACCPN9285E1ZA</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── Customer + Invoice Info ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', borderTop: 'none' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px 16px', verticalAlign: 'top', borderRight: '1px solid #000', width: '50%' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Customer Name :</strong> {bill.customerName || '_____________________'}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Phone :</strong> {bill.customerPhone || '___________________________'}
              </div>
              <div>
                <strong>Address :</strong> {bill.customerAddress || '__________________________'}
              </div>
            </td>
            <td style={{ padding: '10px 16px', verticalAlign: 'top' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Invoice No :</strong> {bill.invoiceNo || '________________'}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Date :</strong> {bill.date ? new Date(bill.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '________________'}
              </div>
              <div>
                <strong>Payment :</strong> {bill.paymentMethod || '_______________'} &nbsp;
                <span style={{
                  padding: '1px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  backgroundColor: bill.paymentStatus === 'Paid' ? '#d4edda' : '#fff3cd',
                  color: bill.paymentStatus === 'Paid' ? '#155724' : '#856404',
                  border: `1px solid ${bill.paymentStatus === 'Paid' ? '#c3e6cb' : '#ffc107'}`,
                }}>
                  {bill.paymentStatus || 'Pending'}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── Product Table ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', borderTop: 'none' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #000' }}>
            {['S.No', 'Description of Goods', 'HSN/SAC Code', 'Qty.', 'Unit', 'Price', 'IGST Rate', 'Amount'].map((h, i) => (
              <th key={h} style={{
                padding: '8px 6px',
                textAlign: i === 1 ? 'left' : 'center',
                fontSize: '12px',
                fontWeight: '700',
                borderRight: i < 7 ? '1px solid #000' : 'none',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(bill.items || []).map((item, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #000', fontSize: '12px' }}>{idx + 1}</td>
              <td style={{ padding: '8px 8px', textAlign: 'left', borderRight: '1px solid #000', fontSize: '12px' }}>{item.productName}</td>
              <td style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #000', fontSize: '12px' }}>{item.hsnCode || '8712'}</td>
              <td style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #000', fontSize: '12px' }}>{item.qty}</td>
              <td style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #000', fontSize: '12px' }}>{item.unit || 'Nos'}</td>
              <td style={{ padding: '8px 6px', textAlign: 'right', borderRight: '1px solid #000', fontSize: '12px' }}>₹{fmtInt(item.unitPrice)}</td>
              <td style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #000', fontSize: '12px' }}>{item.igstRate || 0}%</td>
              <td style={{ padding: '8px 8px', textAlign: 'right', fontSize: '12px' }}>₹{fmt(item.qty * item.unitPrice)}</td>
            </tr>
          ))}
          {/* Empty rows to fill space */}
          {Array.from({ length: Math.max(0, 8 - (bill.items || []).length) }).map((_, i) => (
            <tr key={`empty-${i}`} style={{ height: '32px', borderBottom: '1px solid #eee' }}>
              {[...Array(8)].map((__, j) => (
                <td key={j} style={{ borderRight: j < 7 ? '1px solid #000' : 'none' }}>&nbsp;</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Totals ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', borderTop: 'none' }}>
        <tbody>
          {bill.discount > 0 && (
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '6px 16px' }}>&nbsp;</td>
              <td style={{ padding: '6px 16px', textAlign: 'right', fontSize: '12px' }}>
                Subtotal: ₹{fmt(subtotal)} &nbsp;|&nbsp; Discount ({bill.discount}{bill.discountType}): -₹{fmt(discountAmt)} &nbsp;|&nbsp; IGST: ₹{fmt(igstAmt)}
              </td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '10px 16px', fontSize: '12px' }}>&nbsp;</td>
            <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: '900', fontSize: '15px' }}>
              Total Rs. &nbsp; ₹{fmt(grandTotal)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── Footer: Terms + Signature ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', borderTop: 'none' }}>
        <tbody>
          <tr>
            <td style={{ padding: '12px 16px', verticalAlign: 'top', borderRight: '2px solid #000', width: '55%' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '12px' }}>Terms &amp; Conditions</div>
              <div style={{ fontSize: '11px', lineHeight: '1.6' }}>
                1. Use only a Hand or Foot pump to inflate the tires. Do NOT E.&amp;O.E. use a compressor machine.<br/>
                2. Goods once sold cannot be taken back (or) exchanged.
              </div>
            </td>
            <td style={{ padding: '12px 16px', textAlign: 'right', verticalAlign: 'top' }}>
              <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '40px' }}>For MNR CYCLE MART</div>
              {/* Signature area */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <svg viewBox="0 0 80 40" style={{ width: '70px', height: '35px' }} xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 30 Q20 10 30 25 Q40 5 50 22 Q60 8 70 20" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontWeight: '700', fontSize: '12px', marginTop: '4px' }}>Authorised Signature</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ─── Print handler ────────────────────────────────────────────── */
function printInvoice(bill) {
  const win = window.open('', '_blank');
  if (!win) { alert('Please allow popups to print.'); return; }

  const subtotal   = bill.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const igstAmt    = bill.items.reduce((s, i) => s + (i.qty * i.unitPrice * (i.igstRate / 100)), 0);
  const discountAmt = bill.discountType === '%'
    ? subtotal * (bill.discount / 100)
    : Number(bill.discount || 0);
  const grandTotal = subtotal + igstAmt - discountAmt;

  const rows = bill.items.map((item, idx) => `
    <tr>
      <td style="padding:8px 6px;text-align:center;border-right:1px solid #000;">${idx + 1}</td>
      <td style="padding:8px 8px;text-align:left;border-right:1px solid #000;">${item.productName}</td>
      <td style="padding:8px 6px;text-align:center;border-right:1px solid #000;">${item.hsnCode || '8712'}</td>
      <td style="padding:8px 6px;text-align:center;border-right:1px solid #000;">${item.qty}</td>
      <td style="padding:8px 6px;text-align:center;border-right:1px solid #000;">${item.unit || 'Nos'}</td>
      <td style="padding:8px 6px;text-align:right;border-right:1px solid #000;">&#8377;${Number(item.unitPrice).toLocaleString('en-IN')}</td>
      <td style="padding:8px 6px;text-align:center;border-right:1px solid #000;">${item.igstRate || 0}%</td>
      <td style="padding:8px 8px;text-align:right;">&#8377;${(item.qty * item.unitPrice).toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
    </tr>
  `).join('');

  const emptyRows = Array.from({ length: Math.max(0, 8 - bill.items.length) })
    .map(() => `<tr style="height:32px"><td style="border-right:1px solid #000;"></td><td style="border-right:1px solid #000;"></td><td style="border-right:1px solid #000;"></td><td style="border-right:1px solid #000;"></td><td style="border-right:1px solid #000;"></td><td style="border-right:1px solid #000;"></td><td style="border-right:1px solid #000;"></td><td></td></tr>`).join('');

  const discountRow = bill.discount > 0
    ? `<tr style="border-bottom:1px solid #ccc"><td style="padding:6px 16px;">&nbsp;</td><td style="padding:6px 16px;text-align:right;font-size:12px;">Subtotal: &#8377;${grandTotal.toLocaleString('en-IN',{minimumFractionDigits:2})} &nbsp;|&nbsp; Discount: -&#8377;${discountAmt.toLocaleString('en-IN',{minimumFractionDigits:2})} &nbsp;|&nbsp; IGST: &#8377;${igstAmt.toLocaleString('en-IN',{minimumFractionDigits:2})}</td></tr>`
    : '';

  win.document.write(`<!DOCTYPE html><html><head>
    <meta charset="UTF-8"/>
    <title>MNR Invoice ${bill.invoiceNo}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box;}
      body{font-family:Arial,sans-serif;font-size:13px;color:#000;background:#fff;padding:12px;}
      table{border-collapse:collapse;}
      @media print{
        @page{margin:10mm;}
        body{padding:0;}
      }
    </style>
  </head><body>
    <!-- Header -->
    <table style="width:100%;border:2px solid #000;">
      <tr>
        <td style="width:120px;padding:12px 16px;border-right:2px solid #000;text-align:center;vertical-align:middle;">
          <svg viewBox="0 0 90 80" style="width:80px;height:70px;" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="54" r="16" fill="none" stroke="#000" stroke-width="3"/>
            <circle cx="68" cy="54" r="16" fill="none" stroke="#000" stroke-width="3"/>
            <circle cx="22" cy="54" r="3" fill="#000"/>
            <circle cx="68" cy="54" r="3" fill="#000"/>
            <line x1="22" y1="38" x2="22" y2="70" stroke="#000" stroke-width="1.5"/>
            <line x1="6" y1="54" x2="38" y2="54" stroke="#000" stroke-width="1.5"/>
            <line x1="10" y1="43" x2="34" y2="65" stroke="#000" stroke-width="1.5"/>
            <line x1="10" y1="65" x2="34" y2="43" stroke="#000" stroke-width="1.5"/>
            <line x1="68" y1="38" x2="68" y2="70" stroke="#000" stroke-width="1.5"/>
            <line x1="52" y1="54" x2="84" y2="54" stroke="#000" stroke-width="1.5"/>
            <line x1="56" y1="43" x2="80" y2="65" stroke="#000" stroke-width="1.5"/>
            <line x1="56" y1="65" x2="80" y2="43" stroke="#000" stroke-width="1.5"/>
            <line x1="22" y1="54" x2="45" y2="30" stroke="#000" stroke-width="3"/>
            <line x1="45" y1="30" x2="68" y2="54" stroke="#000" stroke-width="3"/>
            <line x1="45" y1="30" x2="55" y2="54" stroke="#000" stroke-width="2.5"/>
            <line x1="22" y1="54" x2="55" y2="54" stroke="#000" stroke-width="2.5"/>
            <line x1="45" y1="30" x2="42" y2="20" stroke="#000" stroke-width="2.5"/>
            <line x1="36" y1="19" x2="48" y2="19" stroke="#000" stroke-width="3"/>
            <line x1="68" y1="54" x2="72" y2="38" stroke="#000" stroke-width="2.5"/>
            <line x1="68" y1="38" x2="76" y2="38" stroke="#000" stroke-width="3"/>
            <circle cx="55" cy="54" r="4" fill="none" stroke="#000" stroke-width="2"/>
            <ellipse cx="55" cy="54" rx="8" ry="6" fill="none" stroke="#000" stroke-width="1.2"/>
          </svg>
          <div style="font-size:9px;font-weight:bold;margin-top:2px;letter-spacing:1px;">MNR CYCLE MART</div>
        </td>
        <td style="padding:12px 16px;text-align:center;vertical-align:middle;">
          <div style="font-size:28px;font-weight:900;letter-spacing:2px;margin-bottom:4px;">MNR CYCLE MART</div>
          <div style="font-size:12px;font-weight:600;margin-bottom:2px;">17-328, T V NAIDU STREET, CHITTOOR, AP-517001.</div>
          <div style="font-size:12px;font-weight:700;margin-bottom:2px;">Ph: 9703275716, 8919267847</div>
          <div style="font-size:12px;font-weight:700;">GSTIN: 37ACCPN9285E1ZA</div>
        </td>
      </tr>
    </table>
    <!-- Customer -->
    <table style="width:100%;border:2px solid #000;border-top:none;">
      <tr>
        <td style="padding:10px 16px;vertical-align:top;border-right:1px solid #000;width:50%;">
          <div style="margin-bottom:8px;"><strong>Customer Name :</strong> ${bill.customerName || ''}</div>
          <div style="margin-bottom:8px;"><strong>Phone :</strong> ${bill.customerPhone || ''}</div>
          <div><strong>Address :</strong> ${bill.customerAddress || ''}</div>
        </td>
        <td style="padding:10px 16px;vertical-align:top;">
          <div style="margin-bottom:8px;"><strong>Invoice No :</strong> ${bill.invoiceNo}</div>
          <div style="margin-bottom:8px;"><strong>Date :</strong> ${new Date(bill.date).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'})}</div>
          <div><strong>Payment :</strong> ${bill.paymentMethod} &nbsp; <span style="padding:1px 8px;border-radius:4px;font-size:11px;font-weight:bold;background:${bill.paymentStatus==='Paid'?'#d4edda':'#fff3cd'};color:${bill.paymentStatus==='Paid'?'#155724':'#856404'};border:1px solid ${bill.paymentStatus==='Paid'?'#c3e6cb':'#ffc107'};">${bill.paymentStatus}</span></div>
        </td>
      </tr>
    </table>
    <!-- Products -->
    <table style="width:100%;border:2px solid #000;border-top:none;">
      <thead>
        <tr style="border-bottom:2px solid #000;">
          <th style="padding:8px 6px;text-align:center;font-size:12px;border-right:1px solid #000;">S.No</th>
          <th style="padding:8px 8px;text-align:left;font-size:12px;border-right:1px solid #000;">Description of Goods</th>
          <th style="padding:8px 6px;text-align:center;font-size:12px;border-right:1px solid #000;">HSN/SAC Code</th>
          <th style="padding:8px 6px;text-align:center;font-size:12px;border-right:1px solid #000;">Qty.</th>
          <th style="padding:8px 6px;text-align:center;font-size:12px;border-right:1px solid #000;">Unit</th>
          <th style="padding:8px 6px;text-align:center;font-size:12px;border-right:1px solid #000;">Price</th>
          <th style="padding:8px 6px;text-align:center;font-size:12px;border-right:1px solid #000;">IGST Rate</th>
          <th style="padding:8px 8px;text-align:center;font-size:12px;">Amount</th>
        </tr>
      </thead>
      <tbody>${rows}${emptyRows}</tbody>
    </table>
    <!-- Totals -->
    <table style="width:100%;border:2px solid #000;border-top:none;">
      <tbody>
        ${discountRow}
        <tr>
          <td style="padding:10px 16px;">&nbsp;</td>
          <td style="padding:10px 16px;text-align:right;font-weight:900;font-size:15px;">Total Rs. &nbsp; &#8377;${grandTotal.toLocaleString('en-IN',{minimumFractionDigits:2})}</td>
        </tr>
      </tbody>
    </table>
    <!-- Footer -->
    <table style="width:100%;border:2px solid #000;border-top:none;">
      <tr>
        <td style="padding:12px 16px;vertical-align:top;border-right:2px solid #000;width:55%;">
          <div style="font-weight:700;margin-bottom:6px;font-size:12px;">Terms &amp; Conditions</div>
          <div style="font-size:11px;line-height:1.6;">
            1. Use only a Hand or Foot pump to inflate the tires. Do NOT E.&amp;O.E. use a compressor machine.<br/>
            2. Goods once sold cannot be taken back (or) exchanged.
          </div>
        </td>
        <td style="padding:12px 16px;text-align:right;vertical-align:top;">
          <div style="font-weight:700;font-size:13px;margin-bottom:50px;">For MNR CYCLE MART</div>
          <svg viewBox="0 0 80 40" style="width:70px;height:35px;" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 30 Q20 10 30 25 Q40 5 50 22 Q60 8 70 20" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div style="font-weight:700;font-size:12px;margin-top:4px;">Authorised Signature</div>
        </td>
      </tr>
    </table>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 400);
}

/* ─── Status Badge ─────────────────────────────────────────────── */
function PaymentBadge({ status }) {
  const cfg = {
    Paid:     'bg-green-500/20 text-green-400 border-green-500/30',
    Pending:  'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Refunded: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cfg[status] || cfg.Pending}`}>
      {status}
    </span>
  );
}

/* ─── Main Page ────────────────────────────────────────────────── */
export default function DashboardBilling() {
  const { products, customers, bills, saveBill, cancelBill, updateBill, deleteBill, generateInvoiceNumber } = useStore();

  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'history'

  /* ── Bill form state ── */
  const [invoiceNo, setInvoiceNo] = useState(() => generateInvoiceNumber());
  const [billDate, setBillDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [customerSearch, setCustomerSearch]     = useState('');
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [customerMode, setCustomerMode]         = useState('search'); // 'search' | 'manual'
  const [customerName, setCustomerName]         = useState('');
  const [customerPhone, setCustomerPhone]       = useState('');
  const [customerAddress, setCustomerAddress]   = useState('');
  const [customerEmail, setCustomerEmail]       = useState('');

  const [productSearch, setProductSearch]   = useState('');
  const [showProductList, setShowProductList] = useState(false);
  const [billItems, setBillItems]            = useState([]);

  const [discount, setDiscount]         = useState('');
  const [discountType, setDiscountType] = useState('%'); // '%' | '₹'
  const [globalIgst, setGlobalIgst]    = useState('');  // applied to all items if set

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentStatus, setPaymentStatus] = useState('Paid');

  /* ── Preview / save state ── */
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved]             = useState(false);
  const [savedBill, setSavedBill]     = useState(null);

  /* ── History state ── */
  const [histSearch, setHistSearch]           = useState('');
  const [histFilter, setHistFilter]           = useState('All');
  const [viewingBill, setViewingBill]         = useState(null);
  const [editingBillNo, setEditingBillNo]     = useState(null);

  /* ── Filtered products ── */
  const filteredProducts = useMemo(() => {
    const q = productSearch.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      String(p.id).includes(q) ||
      (p.sku || '').toLowerCase().includes(q)
    );
  }, [products, productSearch]);

  /* ── Filtered customers ── */
  const filteredCustomers = useMemo(() => {
    const q = customerSearch.toLowerCase();
    return customers.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  }, [customers, customerSearch]);

  /* ── Calculations ── */
  const subtotal = useMemo(() =>
    billItems.reduce((s, i) => s + i.qty * i.unitPrice, 0), [billItems]);

  const igstTotal = useMemo(() =>
    billItems.reduce((s, i) => s + (i.qty * i.unitPrice * ((i.igstRate || 0) / 100)), 0), [billItems]);

  const discountAmt = useMemo(() => {
    const d = Number(discount || 0);
    return discountType === '%' ? subtotal * (d / 100) : d;
  }, [discount, discountType, subtotal]);

  const grandTotal = useMemo(() => subtotal + igstTotal - discountAmt, [subtotal, igstTotal, discountAmt]);

  /* ── Add product to bill ── */
  const addToBill = useCallback((product) => {
    setBillItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, {
        productId:   product.id,
        productName: product.name,
        hsnCode:     product.hsnCode || '8712',
        unit:        product.unit || 'Nos',
        qty:         1,
        unitPrice:   product.price,
        igstRate:    Number(globalIgst || 0),
        image:       product.image,
      }];
    });
    setProductSearch('');
    setShowProductList(false);
  }, [globalIgst]);

  const updateItem = useCallback((productId, field, value) => {
    setBillItems(prev => prev.map(i =>
      i.productId === productId ? { ...i, [field]: Number(value) || 0 } : i
    ));
  }, []);

  const removeItem = useCallback((productId) => {
    setBillItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  /* ── Select existing customer ── */
  const selectCustomer = (c) => {
    setCustomerName(c.name);
    setCustomerPhone(c.phone);
    setCustomerAddress(c.address);
    setCustomerEmail(c.email || '');
    setCustomerSearch('');
    setShowCustomerList(false);
    setCustomerMode('search');
  };

  /* ── Build bill object ── */
  const buildBill = () => ({
    invoiceNo,
    date: billDate,
    customerName,
    customerPhone,
    customerAddress,
    customerEmail,
    items: billItems,
    subtotal,
    discount: Number(discount || 0),
    discountType,
    discountAmt,
    igstTotal,
    grandTotal,
    paymentMethod,
    paymentStatus,
    status: 'Active',
    createdAt: new Date().toISOString(),
  });

  /* ── Save bill ── */
  const handleSave = () => {
    if (!customerName) { alert('Please enter customer name.'); return; }
    if (billItems.length === 0) { alert('Please add at least one product.'); return; }
    if (editingBillNo) {
      const existingBill = bills.find(b => b.invoiceNo === editingBillNo);
      updateBill(editingBillNo, {
        ...buildBill(),
        status:    existingBill?.status || 'Active',
        createdAt: existingBill?.createdAt || new Date().toISOString(),
      });
    } else {
      saveBill(buildBill());
    }
    setSavedBill(buildBill());
    setSaved(true);
    setShowPreview(false);
  };

  /* ── History filtered ── */
  const filteredBills = useMemo(() => {
    const q = histSearch.toLowerCase();
    return bills.filter(b => {
      const matchSearch = b.invoiceNo.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        (b.customerPhone || '').includes(q);
      const matchFilter = histFilter === 'All' || b.paymentStatus === histFilter;
      return matchSearch && matchFilter;
    });
  }, [bills, histSearch, histFilter]);

  /* ── Reset form ── */
  const resetForm = () => {
    setCustomerName(''); setCustomerPhone(''); setCustomerAddress(''); setCustomerEmail('');
    setCustomerSearch(''); setBillItems([]); setDiscount(''); setGlobalIgst('');
    setPaymentMethod('Cash'); setPaymentStatus('Paid'); setSaved(false);
    setInvoiceNo(generateInvoiceNumber());
    setEditingBillNo(null);
    setSavedBill(null);
  };

  /* ── Load a bill into the form for editing ── */
  const startEdit = (bill) => {
    setInvoiceNo(bill.invoiceNo);
    setBillDate((bill.date || '').split('T')[0] || new Date().toISOString().split('T')[0]);
    setCustomerName(bill.customerName);
    setCustomerPhone(bill.customerPhone || '');
    setCustomerAddress(bill.customerAddress || '');
    setCustomerEmail(bill.customerEmail || '');
    setCustomerMode('manual');
    setBillItems((bill.items || []).map(i => ({ ...i })));
    setDiscount(bill.discount || '');
    setDiscountType(bill.discountType || '%');
    setGlobalIgst('');
    setPaymentMethod(bill.paymentMethod || 'Cash');
    setPaymentStatus(bill.paymentStatus || 'Paid');
    setEditingBillNo(bill.invoiceNo);
    setSaved(false);
    setSavedBill(null);
    setShowPreview(false);
    setActiveTab('create');
  };

  /* ── Delete a cancelled bill permanently ── */
  const handleDelete = (invoiceNo) => {
    if (window.confirm(`Delete bill ${invoiceNo} permanently? This cannot be undone.`)) {
      deleteBill(invoiceNo);
    }
  };

  /* ═══════════════════════════════════════════════════════════════ */
  return (
    <AdminLayout
      title="Billing"
      subtitle="Create bills, generate invoices & manage billing history"
      icon={Receipt}
      headerRight={
        <div className="flex items-center gap-1 bg-card border border-borderc rounded-xl p-1">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'create' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'text-muted hover:text-txt'
            }`}
          >
            <Plus className="w-4 h-4" /> Create Bill
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'history' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'text-muted hover:text-txt'
            }`}
          >
            <History className="w-4 h-4" /> History
            {bills.length > 0 && (
              <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{bills.length}</span>
            )}
          </button>
        </div>
      }
    >
      {/* ── Print-only invoice (hidden on screen) ── */}
      <div style={{ display: 'none' }} id="mnr-print-invoice-wrapper">
        {saved && savedBill && <MNRInvoice bill={savedBill} forPrint />}
      </div>

      {/* ─────────────────── CREATE BILL TAB ──────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'create' && (
          <motion.div
              key="create"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {saved ? (
                /* ── Success state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-txt text-2xl font-bold mb-2">Bill Saved Successfully!</h2>
                    <p className="text-muted">Invoice <span className="text-accent font-bold">{invoiceNo}</span> has been generated and stock updated.</p>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => { setViewingBill(savedBill); setShowPreview(true); }}
                      className="flex items-center gap-2 bg-surface border border-borderc hover:border-accent/40 text-txt font-semibold px-5 py-2.5 rounded-xl transition-all"
                    >
                      <Eye className="w-4 h-4 text-accent" /> View Invoice
                    </button>
                    <button
                      onClick={() => savedBill && printInvoice(savedBill)}
                      className="flex items-center gap-2 bg-accent hover:bg-accenthover text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
                    >
                      <Printer className="w-4 h-4" /> Print Bill
                    </button>
                    <button
                      onClick={() => { resetForm(); }}
                      className="flex items-center gap-2 bg-card border border-borderc hover:border-accent/40 text-muted font-semibold px-5 py-2.5 rounded-xl transition-all"
                    >
                      <Plus className="w-4 h-4" /> New Bill
                    </button>
                    <button
                      onClick={() => setActiveTab('history')}
                      className="flex items-center gap-2 bg-card border border-borderc hover:border-accent/40 text-muted font-semibold px-5 py-2.5 rounded-xl transition-all"
                    >
                      <History className="w-4 h-4" /> View History
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                  {/* ── LEFT / MAIN column ── */}
                  <div className="xl:col-span-2 space-y-5">

                    {/* Invoice Info bar */}
                    <div className="bg-surface border border-borderc rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-accent" />
                        <span className="text-muted text-sm">Invoice No:</span>
                        <span className="text-accent font-bold">{invoiceNo}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-muted text-sm">Date:</span>
                        <input
                          type="date"
                          value={billDate}
                          onChange={e => setBillDate(e.target.value)}
                          className="bg-card border border-borderc rounded-lg px-3 py-1.5 text-sm text-txt focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>

                    {/* ── Customer Section ── */}
                    <div className="bg-surface border border-borderc rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-accent" />
                          <h2 className="text-txt font-semibold">Customer Details</h2>
                        </div>
                        <button
                          onClick={() => setCustomerMode(m => m === 'search' ? 'manual' : 'search')}
                          className="text-xs text-accent hover:underline font-semibold flex items-center gap-1"
                        >
                          {customerMode === 'search' ? <><Plus className="w-3 h-3" /> New Customer</> : <><Search className="w-3 h-3" /> Search Existing</>}
                        </button>
                      </div>

                      {customerMode === 'search' && !customerName ? (
                        <div className="relative">
                          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search customer by name or phone..."
                            value={customerSearch}
                            onChange={e => { setCustomerSearch(e.target.value); setShowCustomerList(true); }}
                            onFocus={() => setShowCustomerList(true)}
                            className="w-full bg-card border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50"
                          />
                          {showCustomerList && customerSearch && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-borderc rounded-xl shadow-2xl z-30 max-h-52 overflow-y-auto">
                              {filteredCustomers.length === 0 ? (
                                <div className="px-4 py-3 text-muted text-sm text-center">No customers found</div>
                              ) : filteredCustomers.map(c => (
                                <button key={c.id} onClick={() => selectCustomer(c)}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition-colors text-left border-b border-borderc last:border-0">
                                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-txt font-bold text-sm flex-shrink-0">
                                    {c.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-txt text-sm font-semibold">{c.name}</p>
                                    <p className="text-muted text-xs">{c.phone} · {c.address}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-muted text-xs font-medium mb-1 block">Customer Name *</label>
                            <input value={customerName} onChange={e => setCustomerName(e.target.value)}
                              placeholder="e.g. Ravi Kumar"
                              className="w-full bg-card border border-borderc rounded-xl px-3 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" />
                          </div>
                          <div>
                            <label className="text-muted text-xs font-medium mb-1 block">Phone Number</label>
                            <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                              placeholder="e.g. 9876543210"
                              className="w-full bg-card border border-borderc rounded-xl px-3 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-muted text-xs font-medium mb-1 block">Address</label>
                            <input value={customerAddress} onChange={e => setCustomerAddress(e.target.value)}
                              placeholder="e.g. 17-328, T V Naidu Street, Chittoor"
                              className="w-full bg-card border border-borderc rounded-xl px-3 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" />
                          </div>
                          {customerName && (
                            <div className="sm:col-span-2">
                              <button onClick={() => { setCustomerName(''); setCustomerSearch(''); }}
                                className="text-xs text-muted hover:text-red-400 flex items-center gap-1 transition-colors">
                                <X className="w-3 h-3" /> Clear customer
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show selected customer chip */}
                      {customerMode === 'search' && customerName && (
                        <div className="mt-3 flex items-center gap-3 bg-card border border-accent/20 rounded-xl px-4 py-3">
                          <div className="w-9 h-9 bg-accent/20 rounded-full flex items-center justify-center text-txt font-bold flex-shrink-0">
                            {customerName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-txt font-semibold">{customerName}</p>
                            <p className="text-muted text-xs">{customerPhone} {customerAddress && `· ${customerAddress}`}</p>
                          </div>
                          <button onClick={() => { setCustomerName(''); setCustomerSearch(''); setCustomerPhone(''); setCustomerAddress(''); }}
                            className="text-muted hover:text-red-400 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ── Products Section ── */}
                    <div className="bg-surface border border-borderc rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-accent" />
                          <h2 className="text-txt font-semibold">Products</h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-muted text-xs">Global IGST %:</label>
                          <input
                            type="number" min="0" max="28" placeholder="0"
                            value={globalIgst}
                            onChange={e => {
                              setGlobalIgst(e.target.value);
                              const r = Number(e.target.value);
                              setBillItems(prev => prev.map(i => ({ ...i, igstRate: r })));
                            }}
                            className="w-16 bg-card border border-borderc rounded-lg px-2 py-1 text-sm text-txt focus:outline-none focus:border-accent/50 text-center"
                          />
                        </div>
                      </div>

                      {/* Product search */}
                      <div className="relative mb-4">
                        <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search product by name, category or ID..."
                          value={productSearch}
                          onChange={e => { setProductSearch(e.target.value); setShowProductList(true); }}
                          onFocus={() => setShowProductList(true)}
                          className="w-full bg-card border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50"
                        />
                        {showProductList && productSearch && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-borderc rounded-xl shadow-2xl z-30 max-h-56 overflow-y-auto">
                            {filteredProducts.length === 0 ? (
                              <div className="px-4 py-3 text-muted text-sm text-center">No products found</div>
                            ) : filteredProducts.map(p => (
                              <button key={p.id} onClick={() => addToBill(p)}
                                disabled={p.stock === 0}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition-colors text-left border-b border-borderc last:border-0 disabled:opacity-40 disabled:cursor-not-allowed">
                                <span className="text-xl">{p.image}</span>
                                <div className="flex-1">
                                  <p className="text-txt text-sm font-semibold">{p.name}</p>
                                  <p className="text-muted text-xs">{p.category} · SKU: {p.sku}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-accent font-bold text-sm">₹{p.price.toLocaleString('en-IN')}</p>
                                  <p className={`text-xs ${p.stock > 5 ? 'text-green-400' : p.stock > 0 ? 'text-orange-400' : 'text-red-400'}`}>
                                    {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bill items table */}
                      {billItems.length === 0 ? (
                        <div className="border-2 border-dashed border-borderc rounded-xl py-10 text-center">
                          <Package className="w-8 h-8 text-muted mx-auto mb-2" />
                          <p className="text-muted text-sm">Search and add products above</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-borderc">
                                {['Product', 'Qty', 'Unit Price', 'IGST%', 'Amount', ''].map((h, i) => (
                                  <th key={i} className={`text-muted text-xs font-semibold uppercase tracking-wide pb-3 ${i > 0 ? 'text-center' : 'text-left'} ${i === 5 ? 'w-8' : ''}`}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {billItems.map((item, idx) => {
                                const lineTotal = item.qty * item.unitPrice;
                                const igstAmt   = lineTotal * (item.igstRate / 100);
                                return (
                                  <tr key={item.productId} className="border-b border-borderc/50 hover:bg-white/2 transition-colors">
                                    <td className="py-3 pr-3">
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{item.image}</span>
                                        <div>
                                          <p className="text-txt text-sm font-medium">{item.productName}</p>
                                          <p className="text-muted text-xs">{item.hsnCode}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-2">
                                      <input
                                        type="number" min="1"
                                        value={item.qty}
                                        onChange={e => updateItem(item.productId, 'qty', e.target.value)}
                                        className="w-16 bg-card border border-borderc rounded-lg px-2 py-1.5 text-sm text-txt text-center focus:outline-none focus:border-accent/50"
                                      />
                                    </td>
                                    <td className="py-3 px-2">
                                      <input
                                        type="number" min="0"
                                        value={item.unitPrice}
                                        onChange={e => updateItem(item.productId, 'unitPrice', e.target.value)}
                                        className="w-24 bg-card border border-borderc rounded-lg px-2 py-1.5 text-sm text-txt text-center focus:outline-none focus:border-accent/50"
                                      />
                                    </td>
                                    <td className="py-3 px-2">
                                      <select
                                        value={item.igstRate}
                                        onChange={e => updateItem(item.productId, 'igstRate', e.target.value)}
                                        className="bg-card border border-borderc rounded-lg px-2 py-1.5 text-sm text-txt focus:outline-none focus:border-accent/50"
                                      >
                                        {IGST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                                      </select>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                      <p className="text-txt text-sm font-bold">₹{fmt(lineTotal)}</p>
                                      {igstAmt > 0 && <p className="text-muted text-xs">+₹{fmt(igstAmt)} IGST</p>}
                                    </td>
                                    <td className="py-3 pl-2">
                                      <button onClick={() => removeItem(item.productId)}
                                        className="text-muted hover:text-red-400 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── RIGHT column — summary + payment ── */}
                  <div className="space-y-5">

                    {/* Bill Summary */}
                    <div className="bg-surface border border-borderc rounded-2xl p-5">
                      <h2 className="text-txt font-semibold mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent" /> Bill Summary
                      </h2>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Subtotal</span>
                          <span className="text-txt font-semibold">₹{fmt(subtotal)}</span>
                        </div>

                        {/* Discount */}
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                          <span className="text-muted text-xs">Discount</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <input
                              type="number" min="0" placeholder="0"
                              value={discount}
                              onChange={e => setDiscount(e.target.value)}
                              className="w-20 bg-card border border-borderc rounded-lg px-2 py-1 text-xs text-txt text-center focus:outline-none focus:border-accent/50"
                            />
                            <button
                              onClick={() => setDiscountType(t => t === '%' ? '₹' : '%')}
                              className="bg-card border border-borderc rounded-lg px-2 py-1 text-xs text-accent font-bold hover:bg-accent/10 transition-colors"
                            >
                              {discountType}
                            </button>
                          </div>
                        </div>
                        {discountAmt > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400 text-xs">Discount applied</span>
                            <span className="text-green-400 text-xs font-semibold">-₹{fmt(discountAmt)}</span>
                          </div>
                        )}

                        {/* IGST total */}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">IGST Total</span>
                          <span className="text-txt font-semibold">₹{fmt(igstTotal)}</span>
                        </div>

                        <div className="border-t border-borderc pt-3 flex justify-between">
                          <span className="text-txt font-bold">Grand Total</span>
                          <span className="text-accent text-xl font-black">₹{fmt(grandTotal)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-surface border border-borderc rounded-2xl p-5">
                      <h2 className="text-txt font-semibold mb-4 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-accent" /> Payment
                      </h2>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            onClick={() => { setPaymentMethod(id); setPaymentStatus(id === 'Pending' ? 'Pending' : 'Paid'); }}
                            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all ${
                              paymentMethod === id
                                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                                : 'bg-card border-borderc text-muted hover:border-accent/40 hover:text-txt'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-semibold">{label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Payment Status toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-muted text-sm">Status:</span>
                        <button
                          onClick={() => setPaymentStatus(s => s === 'Paid' ? 'Pending' : 'Paid')}
                          className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border transition-all ${
                            paymentStatus === 'Paid'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }`}
                        >
                          {paymentStatus === 'Paid' ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {paymentStatus}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowPreview(true)}
                        disabled={billItems.length === 0}
                        className="w-full flex items-center justify-center gap-2 bg-surface border border-accent/40 hover:border-accent text-accent font-semibold py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Eye className="w-4 h-4" /> Preview Invoice
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={billItems.length === 0 || !customerName}
                        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accenthover text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-accent/20 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4" /> Save Bill
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ─────────────────── HISTORY TAB ──────────────────── */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text" placeholder="Search by invoice, customer or phone..."
                    value={histSearch} onChange={e => setHistSearch(e.target.value)}
                    className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div className="relative">
                  <select
                    value={histFilter} onChange={e => setHistFilter(e.target.value)}
                    className="bg-surface border border-borderc rounded-xl px-4 py-2.5 pr-10 text-sm text-txt focus:outline-none focus:border-accent/50 appearance-none cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total Bills', value: bills.length, color: 'text-accent' },
                  { label: 'Paid', value: bills.filter(b => b.paymentStatus === 'Paid').length, color: 'text-green-400' },
                  { label: 'Pending', value: bills.filter(b => b.paymentStatus === 'Pending').length, color: 'text-orange-400' },
                  { label: 'Total Revenue', value: `₹${bills.filter(b => b.paymentStatus === 'Paid').reduce((s, b) => s + b.grandTotal, 0).toLocaleString('en-IN')}`, color: 'text-blue-400' },
                ].map(s => (
                  <div key={s.label} className="bg-surface border border-borderc rounded-2xl p-4">
                    <p className="text-muted text-xs font-medium mb-1">{s.label}</p>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {filteredBills.length === 0 ? (
                <div className="bg-surface border border-borderc rounded-2xl py-16 text-center">
                  <Receipt className="w-10 h-10 text-muted mx-auto mb-3" />
                  <p className="text-txt font-semibold mb-1">No bills found</p>
                  <p className="text-muted text-sm">Create your first bill using the Create Bill tab</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface border border-borderc rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-borderc">
                          {['Invoice No', 'Customer', 'Products', 'Total', 'Method', 'Status', 'Date', 'Actions'].map(h => (
                            <th key={h} className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-4 py-4 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBills.map((bill) => (
                          <tr key={bill.invoiceNo} className="border-b border-borderc hover:bg-white/5 transition-colors">
                            <td className="px-4 py-4 text-accent text-sm font-bold whitespace-nowrap">{bill.invoiceNo}</td>
                            <td className="px-4 py-4">
                              <p className="text-txt text-sm font-semibold">{bill.customerName}</p>
                              <p className="text-muted text-xs">{bill.customerPhone}</p>
                            </td>
                            <td className="px-4 py-4 text-muted text-sm">{bill.items.length} item{bill.items.length !== 1 ? 's' : ''}</td>
                            <td className="px-4 py-4 text-txt text-sm font-bold whitespace-nowrap">₹{fmt(bill.grandTotal)}</td>
                            <td className="px-4 py-4 text-muted text-sm">{bill.paymentMethod}</td>
                            <td className="px-4 py-4"><PaymentBadge status={bill.paymentStatus} /></td>
                            <td className="px-4 py-4 text-muted text-xs whitespace-nowrap">
                              {new Date(bill.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1">
                                <button onClick={() => { setViewingBill(bill); }}
                                  title="View"
                                  className="p-1.5 text-muted hover:text-accent transition-colors" ><Eye className="w-4 h-4" /></button>
                                <button onClick={() => startEdit(bill)}
                                  title="Edit"
                                  className="p-1.5 text-muted hover:text-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => printInvoice(bill)}
                                  title="Print"
                                  className="p-1.5 text-muted hover:text-accent transition-colors"><Printer className="w-4 h-4" /></button>
                                <button onClick={() => printInvoice(bill)}
                                  title="Download PDF (use Save as PDF in print dialog)"
                                  className="p-1.5 text-muted hover:text-blue-400 transition-colors"><Download className="w-4 h-4" /></button>
                                {bill.paymentStatus !== 'Refunded' && bill.status !== 'Cancelled' && (
                                  <button onClick={() => { if (window.confirm('Cancel/refund this bill?')) cancelBill(bill.invoiceNo); }}
                                    title="Cancel/Refund"
                                    className="p-1.5 text-muted hover:text-red-400 transition-colors"><XCircle className="w-4 h-4" /></button>
                                )}
                                {bill.status === 'Cancelled' && (
                                  <button onClick={() => handleDelete(bill.invoiceNo)}
                                    title="Delete permanently"
                                    className="p-1.5 text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      {/* ═══════════════ INVOICE PREVIEW MODAL ═══════════════ */}
      <AnimatePresence>
        {(showPreview || viewingBill) && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-3xl my-4 overflow-hidden shadow-2xl"
            >
              {/* Modal header (dark) */}
              <div className="bg-gray-900 flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-bold">
                    Invoice Preview — {viewingBill ? viewingBill.invoiceNo : invoiceNo}
                  </span>
                </div>
                <button
                  onClick={() => { setShowPreview(false); setViewingBill(null); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Invoice content */}
              <div className="p-4 sm:p-6">
                <MNRInvoice bill={viewingBill || buildBill()} />
              </div>

              {/* Action buttons */}
              <div className="bg-gray-50 border-t border-gray-200 px-5 py-4 flex flex-wrap gap-3 justify-end">
                {showPreview && !saved && (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all"
                  >
                    <Save className="w-4 h-4" /> Save Bill
                  </button>
                )}
                <button
                  onClick={() => printInvoice(viewingBill || buildBill())}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  <Printer className="w-4 h-4" /> Print Bill
                </button>
                <button
                  onClick={() => printInvoice(viewingBill || buildBill())}
                  title="In the print dialog, choose 'Save as PDF'"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button
                  onClick={() => { setShowPreview(false); setViewingBill(null); }}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
