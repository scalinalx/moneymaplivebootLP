/*
 * track.js — first-party behavioral analytics client for monetisesubstack.com
 *
 * Vanilla, dependency-free, loaded afterInteractive so it never blocks render.
 * Every subsystem is wrapped so a failure here can never break the host page.
 * Posts batched events to /api/collect (same origin).
 *
 * Privacy: anonymous visitor_id (localStorage) + per-visit session_id
 * (sessionStorage). Captures UTMs / referrer / sh_kit on landing. NEVER reads
 * the value of any form input — form fields are identified by name/id/label only
 * (form instrumentation lands in a later step; the scaffolding here is value-free).
 *
 * Consent: per project decision this runs by default (matching the existing
 * Meta Pixel + GA on this site). It honors a persisted opt-out and exposes
 * window.__track.optOut()/optIn() (+ revokeConsent/grantConsent aliases) so a
 * banner can gate it later with one wiring change. Flip RESPECT_GPC_DNT to also
 * honor Global Privacy Control / Do Not Track.
 */
(function () {
  'use strict';
  try {
    // ----------------------------------------------------------------- config
    var ENDPOINT = '/api/collect';
    var FLUSH_INTERVAL_MS = 5000;       // periodic batch flush
    var HEARTBEAT_ACTIVE_MS = 10000;    // emit engagement every ~10s of ACTIVE time
    var SESSION_IDLE_MS = 30 * 60 * 1000; // 30 min idle -> new session
    var MAX_QUEUE = 40;                 // flush early if the queue fills
    var RESPECT_GPC_DNT = false;        // Ana's call: match existing site (no gating)

    var OPTOUT_KEY = '__track_optout';
    var VISITOR_KEY = '__track_vid';
    var SESSION_KEY = '__track_sid';
    var SESSION_TS_KEY = '__track_sid_ts';
    var ATTR_KEY = '__track_attr';

    var nav = window.navigator;
    var loc = window.location;

    // ------------------------------------------------------------- opt-out API
    // Exposed before any early-return so callers can always opt back in.
    window.__track = window.__track || {};
    window.__track.optOut = function () {
      try { localStorage.setItem(OPTOUT_KEY, '1'); } catch (e) {}
      queue.length = 0;
    };
    window.__track.optIn = function () {
      try { localStorage.removeItem(OPTOUT_KEY); } catch (e) {}
    };
    // Brief-named aliases.
    window.__track.revokeConsent = window.__track.optOut;
    window.__track.grantConsent = window.__track.optIn;

    function isOptedOut() {
      try { if (localStorage.getItem(OPTOUT_KEY) === '1') return true; } catch (e) {}
      if (RESPECT_GPC_DNT) {
        if (nav && nav.globalPrivacyControl === true) return true;
        var dnt = (nav && (nav.doNotTrack || nav.msDoNotTrack)) || window.doNotTrack;
        if (dnt === '1' || dnt === 'yes') return true;
      }
      return false;
    }

    var queue = [];
    if (isOptedOut()) return;

    // Don't track the admin area (the dashboard lives under /admidash and would
    // otherwise pollute the analytics with the operator's own visits).
    var IGNORE_PREFIXES = ['/admidash'];
    for (var ip = 0; ip < IGNORE_PREFIXES.length; ip++) {
      if (loc.pathname.indexOf(IGNORE_PREFIXES[ip]) === 0) return;
    }

    // ------------------------------------------------------------------- ids
    function uuid() {
      try {
        if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
      } catch (e) {}
      return 'id-' + Math.random().toString(36).slice(2) + '-' + Date.now().toString(36);
    }

    function getVisitorId() {
      try {
        var v = localStorage.getItem(VISITOR_KEY);
        if (v) return v;
        v = uuid();
        localStorage.setItem(VISITOR_KEY, v);
        return v;
      } catch (e) {
        return 'novid-' + uuid(); // storage blocked -> ephemeral id
      }
    }

    // Per-visit session id with 30-min idle rollover. sessionStorage survives
    // full reloads in the same tab (so internal navigation stitches), and a new
    // tab is a new session.
    function getSessionId() {
      var now = Date.now();
      var sid = null, ts = 0;
      try {
        sid = sessionStorage.getItem(SESSION_KEY);
        ts = parseInt(sessionStorage.getItem(SESSION_TS_KEY) || '0', 10);
      } catch (e) {}
      if (!sid || !ts || now - ts > SESSION_IDLE_MS) {
        sid = uuid();
        try {
          sessionStorage.setItem(SESSION_KEY, sid);
          sessionStorage.removeItem(ATTR_KEY); // re-capture attribution for the new session
        } catch (e) {}
        attribution = null;
      }
      try { sessionStorage.setItem(SESSION_TS_KEY, String(now)); } catch (e) {}
      return sid;
    }

    var visitorId = getVisitorId();

    // ----------------------------------------------------------- attribution
    // Captured once per session (on landing) and attached to every event.
    var attribution = null;
    function getAttribution() {
      if (attribution) return attribution;
      try {
        var stored = sessionStorage.getItem(ATTR_KEY);
        if (stored) { attribution = JSON.parse(stored); return attribution; }
      } catch (e) {}
      var p;
      try { p = new URLSearchParams(loc.search); } catch (e) { p = null; }
      var get = function (k) { try { return p ? p.get(k) : null; } catch (e) { return null; } };
      attribution = {
        utm_source: get('utm_source'),
        utm_medium: get('utm_medium'),
        utm_campaign: get('utm_campaign'),
        utm_content: get('utm_content'),
        utm_term: get('utm_term'),
        referrer: document.referrer || null,
        sh_kit: get('sh_kit'),
        ck_subscriber_id: get('ck_subscriber_id'),
      };
      try { sessionStorage.setItem(ATTR_KEY, JSON.stringify(attribution)); } catch (e) {}
      return attribution;
    }

    // -------------------------------------------------------- queue / transport
    function track(type, fields) {
      try {
        if (isOptedOut()) return;
        var attr = getAttribution();
        var ev = {
          type: type,
          vid: visitorId,
          sid: getSessionId(),
          path: loc.pathname,
          ts: Date.now(),
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          utm_content: attr.utm_content,
          utm_term: attr.utm_term,
          referrer: attr.referrer,
          sh_kit: attr.sh_kit,
          ck_subscriber_id: attr.ck_subscriber_id,
        };
        if (fields) for (var k in fields) if (fields.hasOwnProperty(k)) ev[k] = fields[k];
        queue.push(ev);
        if (queue.length >= MAX_QUEUE) flush(false);
      } catch (e) {}
    }

    function flush(useBeacon) {
      try {
        if (queue.length === 0) return;
        var batch = queue.splice(0, queue.length);
        var body = JSON.stringify({ events: batch });
        if (useBeacon && nav && nav.sendBeacon) {
          var blob = new Blob([body], { type: 'application/json' });
          if (nav.sendBeacon(ENDPOINT, blob)) return;
          // sendBeacon refused (e.g. too big) -> fall through to fetch
        }
        if (window.fetch) {
          fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            keepalive: true,
          }).catch(function () {});
        }
      } catch (e) { /* drop the batch silently */ }
    }

    try { setInterval(function () { flush(false); }, FLUSH_INTERVAL_MS); } catch (e) {}

    // ----------------------------------------------------- per-page state reset
    var maxScroll = 0;
    var milestones = { 25: false, 50: false, 75: false, 100: false };
    var seenSections = {};
    var pageActiveMs = 0;   // active time accumulated on the current page
    var pendingMs = 0;      // active time not yet flushed as a heartbeat

    function resetPageState() {
      maxScroll = 0;
      milestones = { 25: false, 50: false, 75: false, 100: false };
      seenSections = {};
      pageActiveMs = 0;
      pendingMs = 0;
      observeSections();
    }

    // -------------------------------------------------------------- page_view
    function pageView() {
      track('page_view', {
        meta: { title: document.title, vw: window.innerWidth, vh: window.innerHeight },
      });
    }

    // SPA soft-navigation detection: Next App Router calls history.pushState.
    var currentPath = loc.pathname;
    function onRouteMaybeChanged() {
      try {
        if (loc.pathname === currentPath) return;
        flushEngagement();   // close out engagement for the page we're leaving
        currentPath = loc.pathname;
        resetPageState();
        pageView();
      } catch (e) {}
    }
    try {
      ['pushState', 'replaceState'].forEach(function (m) {
        var orig = history[m];
        if (typeof orig === 'function') {
          history[m] = function () {
            var r = orig.apply(this, arguments);
            try { setTimeout(onRouteMaybeChanged, 0); } catch (e) {}
            return r;
          };
        }
      });
      window.addEventListener('popstate', function () { setTimeout(onRouteMaybeChanged, 0); });
    } catch (e) {}

    // ------------------------------------------------- engagement (active time)
    // Counts only ACTIVE time: tab visible AND window focused. Paused otherwise,
    // so a backgrounded tab doesn't look like a long read.
    function isActive() {
      try {
        if (document.visibilityState && document.visibilityState !== 'visible') return false;
        if (typeof document.hasFocus === 'function' && !document.hasFocus()) return false;
        return true;
      } catch (e) { return true; }
    }
    function flushEngagement() {
      if (pendingMs > 0) {
        var delta = pendingMs;
        pendingMs = 0;
        track('engagement_heartbeat', { engaged_ms: delta });
      }
    }
    try {
      setInterval(function () {
        try {
          if (!isActive()) return;
          pageActiveMs += 1000;
          pendingMs += 1000;
          if (pendingMs >= HEARTBEAT_ACTIVE_MS) flushEngagement();
        } catch (e) {}
      }, 1000);
    } catch (e) {}

    // ------------------------------------------------------------------ scroll
    function scrollPct() {
      try {
        var doc = document.documentElement;
        var scrollable = (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        if (scrollable <= 0) return 100; // short page: fully visible
        var pct = Math.round(((window.scrollY || doc.scrollTop || 0) / scrollable) * 100);
        return pct < 0 ? 0 : pct > 100 ? 100 : pct;
      } catch (e) { return 0; }
    }
    var scrollScheduled = false;
    function onScroll() {
      if (scrollScheduled) return;
      scrollScheduled = true;
      try {
        window.requestAnimationFrame(function () {
          scrollScheduled = false;
          var pct = scrollPct();
          if (pct > maxScroll) maxScroll = pct;
          [25, 50, 75, 100].forEach(function (m) {
            if (!milestones[m] && pct >= m) {
              milestones[m] = true;
              track('scroll_milestone', { scroll_pct: m });
            }
          });
        });
      } catch (e) { scrollScheduled = false; }
    }
    try { window.addEventListener('scroll', onScroll, { passive: true }); } catch (e) {}

    // ------------------------------------------------------------ section_view
    // Fires once per [data-track-section] per page when it enters the viewport.
    var io = null;
    function observeSections() {
      try {
        if (!('IntersectionObserver' in window)) return;
        if (io) io.disconnect();
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.getAttribute('data-track-section');
            if (!id || seenSections[id]) return;
            seenSections[id] = true;
            track('section_view', { section_id: id });
          });
        }, { threshold: 0 }); // fire as soon as any part enters the viewport (works for tall sections)
        var els = document.querySelectorAll('[data-track-section]');
        for (var i = 0; i < els.length; i++) io.observe(els[i]);
      } catch (e) {}
    }

    // ----------------------------------------------- cta_click / outbound_click
    function closest(el, selector) {
      try {
        while (el && el.nodeType === 1) {
          if (el.matches && el.matches(selector)) return el;
          el = el.parentElement;
        }
      } catch (e) {}
      return null;
    }
    document.addEventListener('click', function (e) {
      try {
        var target = e.target;

        var cta = closest(target, '[data-track="cta"]');
        if (cta) {
          track('cta_click', { cta_id: cta.getAttribute('data-track-id') || null });
        }

        var a = closest(target, 'a[href]');
        if (a) {
          var href = a.getAttribute('href') || '';
          if (/^https?:/i.test(href) || href.indexOf('//') === 0) {
            var u;
            try { u = new URL(a.href, loc.href); } catch (err) { u = null; }
            if (u && u.host && u.host !== loc.host) {
              track('outbound_click', { outbound_domain: u.host });
            }
          }
        }
      } catch (err) {}
    }, true);

    // ------------------------------------------------------------------- forms
    // Generic instrumentation for fields inside [data-track-form="<name>"].
    // Fields are identified by name/id/label/aria-label/type — the VALUE of an
    // input is NEVER read, transmitted, or logged. For the parts a generic
    // script can't see (Stripe's cross-origin card iframe, SPA submit-success),
    // the app calls window.__track.form* / checkoutStep() to report progress.
    var forms = {}; // name -> { started, succeeded, lastField, focusAt:{field:ts} }
    function formState(name) {
      if (!forms[name]) forms[name] = { started: false, succeeded: false, lastField: null, focusAt: {} };
      return forms[name];
    }
    function formNameOf(el) {
      var f = closest(el, '[data-track-form]');
      return f ? (f.getAttribute('data-track-form') || 'form') : null;
    }
    function isField(el) {
      if (!el || el.nodeType !== 1) return false;
      var tag = el.tagName;
      if (tag === 'SELECT' || tag === 'TEXTAREA') return true;
      if (tag === 'INPUT') {
        var type = (el.getAttribute('type') || 'text').toLowerCase();
        return type !== 'hidden' && type !== 'submit' && type !== 'button' && type !== 'reset';
      }
      return !!el.isContentEditable;
    }
    function fieldId(el) {
      try {
        var n = el.getAttribute('name'); if (n) return n.slice(0, 128);
        var id = el.getAttribute('id'); if (id) return id.slice(0, 128);
        if (el.labels && el.labels[0] && el.labels[0].textContent) return el.labels[0].textContent.trim().slice(0, 128);
        var lbl = closest(el, 'label'); if (lbl && lbl.textContent) return lbl.textContent.trim().slice(0, 128);
        var al = el.getAttribute('aria-label'); if (al) return al.slice(0, 128);
        var ph = el.getAttribute('placeholder'); if (ph) return ph.slice(0, 128);
        return (el.getAttribute('type') || el.tagName).toLowerCase();
      } catch (e) { return 'field'; }
    }
    function markStart(name, field) {
      var st = formState(name);
      if (!st.started) { st.started = true; track('form_start', { form_id: name, field_name: field }); }
    }

    document.addEventListener('focus', function (e) {
      try {
        var el = e.target;
        if (!isField(el)) return;
        var name = formNameOf(el); if (!name) return;
        var field = fieldId(el);
        var st = formState(name);
        markStart(name, field);
        st.lastField = field;
        st.focusAt[field] = Date.now();
        track('form_field_focus', { form_id: name, field_name: field });
      } catch (err) {}
    }, true);

    document.addEventListener('blur', function (e) {
      try {
        var el = e.target;
        if (!isField(el)) return;
        var name = formNameOf(el); if (!name) return;
        var field = fieldId(el);
        var st = formState(name);
        st.lastField = field;
        var ms = st.focusAt[field] ? Date.now() - st.focusAt[field] : null;
        track('form_field_blur', { form_id: name, field_name: field, meta: ms != null ? { ms: ms } : null });
        // Coarse validity (identity only — never the value or the message text).
        try {
          var invalid = (el.validity && el.validity.valid === false) || el.getAttribute('aria-invalid') === 'true';
          if (invalid) {
            var reason = null;
            if (el.validity) {
              ['valueMissing', 'typeMismatch', 'patternMismatch', 'tooShort', 'tooLong',
               'rangeUnderflow', 'rangeOverflow', 'stepMismatch', 'badInput'].forEach(function (k) {
                if (!reason && el.validity[k]) reason = k;
              });
            }
            track('form_field_error', { form_id: name, field_name: field, meta: { reason: reason } });
          }
        } catch (e2) {}
      } catch (err) {}
    }, true);

    document.addEventListener('submit', function (e) {
      try {
        var name = formNameOf(e.target); if (!name) return;
        track('form_submit_attempt', { form_id: name });
      } catch (err) {}
    }, true);

    // App-driven reporting for what a generic listener can't observe.
    window.__track.formStart = function (name) { try { markStart(name, null); } catch (e) {} };
    window.__track.formField = function (name, field, action) {
      try {
        formState(name).lastField = field;
        var type = action === 'blur' ? 'form_field_blur' : action === 'error' ? 'form_field_error' : 'form_field_focus';
        if (type === 'form_field_focus') markStart(name, field);
        track(type, { form_id: name, field_name: field });
      } catch (e) {}
    };
    window.__track.formSubmit = function (name) { try { track('form_submit_attempt', { form_id: name }); } catch (e) {} };
    window.__track.formSuccess = function (name) {
      try { formState(name).succeeded = true; track('form_submit_success', { form_id: name }); } catch (e) {}
    };
    window.__track.checkoutStep = function (step, name) {
      try { track('checkout_step', { form_id: name || null, event_name: String(step), meta: { step: String(step) } }); } catch (e) {}
    };
    // Generic custom event (used by the Ana AI Coach). The event type must be on
    // the server-side allowlist or it is dropped at ingest.
    window.__track.event = function (type, fields) {
      try { track(String(type), fields || {}); } catch (e) {}
    };

    // --------------------------------------------------------------- exit flush
    // visibilitychange->hidden: flush so we don't lose queued events (could just
    // be a tab switch, so no page_exit here). pagehide: the real teardown ->
    // emit page_exit with final engaged_ms + max scroll, then beacon-flush.
    document.addEventListener('visibilitychange', function () {
      try {
        if (document.visibilityState === 'hidden') { flushEngagement(); flush(true); }
      } catch (e) {}
    });
    window.addEventListener('pagehide', function () {
      try {
        flushEngagement();
        // Abandoned forms: started but never reported success.
        for (var fn in forms) {
          if (forms.hasOwnProperty(fn) && forms[fn].started && !forms[fn].succeeded) {
            track('form_abandon', { form_id: fn, field_name: forms[fn].lastField, meta: { last_field: forms[fn].lastField } });
          }
        }
        track('page_exit', { engaged_ms: pageActiveMs, scroll_pct: maxScroll });
        flush(true);
      } catch (e) {}
    });

    // ------------------------------------------------------------------- start
    resetPageState();
    pageView();
  } catch (e) {
    /* analytics must never break the page */
  }
})();
