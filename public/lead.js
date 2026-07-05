// lead.js — single lead-capture pipe for Sam's Menswear.
// Every booking / callback / design-look submission flows through here so there
// is ONE place to point at the CRM. Loaded before booking.js.
//
// ─────────────────────────────────────────────────────────────────────────────
//  ▶ TO GO LIVE: paste your GoHighLevel *Inbound Webhook* URL below.
//    (GHL → Automation → Workflows → add "Inbound Webhook" trigger → copy URL.)
//    Until it's set, submissions still reach Sam via the built-in
//    email + tap-to-call fallback — no lead is ever lost.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const LEAD_WEBHOOK = ''; // e.g. 'https://services.leadconnectorhq.com/hooks/XXXX/webhook-trigger/YYYY'

  const PHONE      = '+16474580711';
  const PHONE_DISP = '647 · 458 · 0711';
  const EMAIL      = 'samskosher@gmail.com';

  // POST the lead to the CRM. Returns { ok, reason }.
  async function send(kind, data) {
    const payload = Object.assign(
      { form: kind, source: 'customsuitandshirt.com', submittedAt: new Date().toISOString() },
      data
    );
    if (!LEAD_WEBHOOK) return { ok: false, reason: 'unconfigured', payload };
    try {
      const res = await fetch(LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return { ok: res.ok, reason: res.ok ? 'sent' : 'http-' + res.status, payload };
    } catch (e) {
      return { ok: false, reason: 'network', payload };
    }
  }

  // Build a pre-filled mailto: so a lead can reach Sam even with no backend.
  function mailto(subject, data) {
    const body = Object.entries(data)
      .filter(([, v]) => v != null && String(v).trim() !== '')
      .map(([k, v]) => k + ': ' + v)
      .join('\n');
    return 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body + '\n\n— Sent from customsuitandshirt.com');
  }

  window.SamsLead = { send, mailto, PHONE, PHONE_DISP, EMAIL, configured: !!LEAD_WEBHOOK };
})();
