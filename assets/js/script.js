/* =====================================================================
   CEIAS — Scripts principais
   ---------------------------------------------------------------------
   Controla: cabeçalho, menu, slider, animações, contadores, gráficos,
   filtros, galeria/lightbox, modais de vídeo, notícias, eventos,
   calendário, projetos, equipe, documentos, formulário e utilitários.
   Depende de config.js e data.js (carregados antes deste arquivo).
   ===================================================================== */
(function () {
  "use strict";

  const CONFIG = window.CEIAS_CONFIG || {};
  const DATA = window.CEIAS_DATA || {};
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ------------------------------------------------------------------
     Ícones SVG (inline)
     ------------------------------------------------------------------ */
  const ICONS = {
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2.1Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="5"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    graduation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/></svg>',
    school: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="M18 10V6l-6-4-6 4v4"/><path d="M2 22h20"/><path d="M4 22V10h16v12"/><path d="M12 8h.01"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 1 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/></svg>',
    starHalf: '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="halfStar"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="rgba(0,0,0,0.15)"/></linearGradient></defs><path fill="url(#halfStar)" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/></svg>',
    starEmpty: '<svg viewBox="0 0 24 24" fill="rgba(0,0,0,0.15)" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/></svg>',
    laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
    tablet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4a2 2 0 0 1-2-2V5h4M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 3h12v6a6 6 0 0 1-12 0V3Z"/><path d="M12 15v4M8 22h8M9 19h6"/></svg>',
    utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6h5v9"/></svg>',
    accessibility: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="2"/><path d="M5 9.5h14M12 9.5v6M12 15.5l-3.5 6M12 15.5l3.5 6"/></svg>',
    droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.7 6.3 8.4a8 8 0 1 0 11.4 0L12 2.7Z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.5 5-6.5"/></svg>',
    sprout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 7Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a5 5 0 0 0-7.1 0L8 10"/><path d="m21 3 1 11h-2M3 3 2 14h2"/><path d="m7 18-4-3M5 9l4-3"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5M16 13H8M16 17H8M10 9H8"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a2 2 0 0 0 3.4 0"/></svg>',
    bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>',
    shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.4 6.7 16 4a4 4 0 0 1-8 0L3.6 6.7a1 1 0 0 0-.4 1.3l1.4 2.8c.2.5.8.7 1.3.5L8 10.5V20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-9.5l2.1.8c.5.2 1.1 0 1.3-.5l1.4-2.8a1 1 0 0 0-.4-1.3Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.7c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 5 5.8V9.2a7.4 7.4 0 0 0 4.3 1.4V7.5a4.3 4.3 0 0 1-3.4-1.7Z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.6 2.6 21.4 11.4a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0L2.6 12.6A2 2 0 0 1 2 11.2V4a2 2 0 0 1 2-2h7.2c.5 0 1 .2 1.4.6Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  };
  window.CEIAS_ICONS = ICONS;

  /* ------------------------------------------------------------------
     Utilitários
     ------------------------------------------------------------------ */
  const MONTHS = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  const MONTHS_SHORT = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  const WEEKDAYS = ["D","S","T","Q","Q","S","S"];

  function parseDate(str) {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function formatDate(str, opts) {
    const d = parseDate(str);
    if (!d) return "";
    if (opts === "short") return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function todayMidnight() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function sortByDateDesc(a, b) { return b.date.localeCompare(a.date); }
  function sortByDateAsc(a, b) { return a.date.localeCompare(b.date); }
  function labelize(key, map) { return map[key] || key.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }

  const NEWS_CATS = { escola: "Escola", educacao: "Educação", projetos: "Projetos", cultura: "Cultura", esportes: "Esportes", eventos: "Eventos" };
  const PROJECT_CATS = { cultura: "Cultura", tecnologia: "Tecnologia", esportes: "Esportes", ciencia: "Ciência", "meio-ambiente": "Meio Ambiente", arte: "Arte", comunidade: "Comunidade", educacao: "Educação" };
  const GALLERY_CATS = { colegio: "Colégio", alunos: "Alunos", professores: "Professores", eventos: "Eventos", esportes: "Esportes", projetos: "Projetos", cultura: "Cultura" };
  const TEAM_AREAS = { linguagens: "Linguagens", matematica: "Matemática", natureza: "Ciências da Natureza", humanas: "Ciências Humanas", "educacao-fisica": "Educação Física", outros: "Outros" };
  const DOC_CATS = { calendario: "Calendário escolar", regimento: "Regimento", comunicados: "Comunicados", documentos: "Documentos", formularios: "Formulários", academico: "Informações acadêmicas", materiais: "Materiais importantes" };

  /* ------------------------------------------------------------------
     Cabeçalho, menu e navegação
     ------------------------------------------------------------------ */
  function initHeader() {
    const header = $("#header");
    if (!header) return;
    const toggle = $("#navToggle");
    const nav = $("#nav");
    const backdrop = $("#navBackdrop");

    const onScroll = () => header.classList.toggle("header--scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      backdrop && backdrop.classList.remove("is-visible");
      document.body.classList.remove("nav-open");
    };
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        backdrop && backdrop.classList.toggle("is-visible", open);
        document.body.classList.toggle("nav-open", open);
      });
      backdrop && backdrop.addEventListener("click", closeNav);
      document.addEventListener("keydown", e => { if (e.key === "Escape") { closeNav(); $$(".nav__item.is-open").forEach(i => i.classList.remove("is-open")); } });
    }

    // Dropdowns (mobile: toggle por clique; desktop: hover + teclado)
    $$(".nav__item--has-dropdown").forEach(item => {
      const btn = $(".nav__link", item);
      btn.addEventListener("click", e => {
        if (window.innerWidth <= 1200 || e.detail === 0) {
          e.preventDefault();
          const open = item.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", String(open));
          $$(".nav__item--has-dropdown").forEach(o => { if (o !== item) { o.classList.remove("is-open"); $(".nav__link", o).setAttribute("aria-expanded", "false"); } });
        }
      });
    });

    // Marca o item ativo com base na página atual
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav__item").forEach(item => {
      const links = $$("a", item).map(a => (a.getAttribute("href") || "").split("#")[0].toLowerCase());
      if (links.includes(page)) item.classList.add("is-active");
    });
  }

  /* ------------------------------------------------------------------
     Slider do hero
     ------------------------------------------------------------------ */
  function initHeroSlider() {
    const hero = $("#hero");
    if (!hero) return;
    const slides = $$(".hero__slide", hero);
    if (slides.length < 2) return;
    const dotsWrap = $(".hero__dots", hero);
    let index = 0, timer;
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "hero__dot" + (i === 0 ? " is-active" : "");
      b.type = "button";
      b.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
      b.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    const dots = $$(".hero__dot", hero);
    function go(i) {
      slides[index].classList.remove("is-active");
      dots[index].classList.remove("is-active");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index].classList.add("is-active");
    }
    function restart() { clearInterval(timer); timer = setInterval(() => go(index + 1), 7000); }
    $(".hero__arrow--prev", hero)?.addEventListener("click", () => { go(index - 1); restart(); });
    $(".hero__arrow--next", hero)?.addEventListener("click", () => { go(index + 1); restart(); });
    hero.addEventListener("keydown", e => { if (e.key === "ArrowRight") { go(index + 1); restart(); } if (e.key === "ArrowLeft") { go(index - 1); restart(); } });
    // Swipe em telas de toque
    let startX = null;
    hero.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { go(dx < 0 ? index + 1 : index - 1); restart(); }
      startX = null;
    });
    hero.addEventListener("mouseenter", () => clearInterval(timer));
    hero.addEventListener("mouseleave", restart);
    restart();
  }

  /* ------------------------------------------------------------------
     Animações de scroll (reveal), parallax e contadores
     ------------------------------------------------------------------ */
  function initReveal() {
    const items = $$(".reveal, .reveal-stagger");
    if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("is-visible")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(i => io.observe(i));
  }

  function initParallax() {
    const els = $$("[data-parallax]");
    if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      els.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  function animateNumber(el, target, opts = {}) {
    const duration = opts.duration || 1800;
    const decimals = opts.decimals || 0;
    const start = performance.now();
    const format = v => decimals ? v.toFixed(decimals).replace(".", ",") : Math.round(v).toLocaleString("pt-BR");
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased) + (opts.suffix || "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;
    const run = el => animateNumber(el, parseFloat(el.dataset.count), { decimals: parseInt(el.dataset.decimals || "0", 10), suffix: el.dataset.suffix || "" });
    if (!("IntersectionObserver" in window)) { counters.forEach(run); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  /* ------------------------------------------------------------------
     Gráficos (donut, barras, avaliação)
     ------------------------------------------------------------------ */
  function initCharts() {
    const wrap = $("#distributionChart");
    if (!wrap) return;
    const dist = (CONFIG.stats && CONFIG.stats.distribution) || [];
    const total = dist.reduce((s, d) => s + d.value, 0);
    const r = 70, c = 2 * Math.PI * r;
    let offset = 0;
    const segs = dist.map(d => {
      const len = (d.value / total) * c;
      const s = `<circle class="donut__seg" cx="100" cy="100" r="${r}" stroke="${d.color}" stroke-dasharray="0 ${c}" stroke-dashoffset="${-offset}" data-len="${len.toFixed(2)}" data-total="${c.toFixed(2)}" transform="rotate(-90 100 100)"><title>${escapeHtml(d.label)}: ${d.value}</title></circle>`;
      offset += len;
      return s;
    }).join("");
    wrap.innerHTML = `
      <div class="donut-wrap">
        <svg class="donut" viewBox="0 0 200 200" role="img" aria-label="Distribuição de ${total} estudantes por etapa de ensino">
          <circle cx="100" cy="100" r="${r}" fill="none" stroke="#e3edf9" stroke-width="26"/>
          ${segs}
          <text x="100" y="96" text-anchor="middle" class="donut__center" data-count="${total}">0</text>
          <text x="100" y="118" text-anchor="middle" class="donut__center-label">estudantes</text>
        </svg>
        <ul class="legend">
          ${dist.map(d => `<li><span class="legend__dot" style="background:${d.color}"></span>${escapeHtml(d.label)}<strong>${d.value}</strong></li>`).join("")}
        </ul>
      </div>`;
    const bars = $("#distributionBars");
    if (bars) {
      const classes = ["", "bar__fill--gold", "bar__fill--blue"];
      bars.innerHTML = dist.map((d, i) => `
        <div class="bar">
          <div class="bar__head"><span>${escapeHtml(d.label)}</span><span>${d.value} · ${(d.value / total * 100).toFixed(1).replace(".", ",")}%</span></div>
          <div class="bar__track"><div class="bar__fill ${classes[i] || ""}" data-width="${(d.value / total * 100).toFixed(1)}"></div></div>
        </div>`).join("");
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$(".donut__seg", en.target).forEach(s => { s.setAttribute("stroke-dasharray", `${s.dataset.len} ${s.dataset.total}`); });
        $$(".bar__fill", en.target).forEach(b => { b.style.width = b.dataset.width + "%"; });
        io.unobserve(en.target);
      });
    }, { threshold: 0.3 });
    io.observe(wrap);
    if (bars) io.observe(bars);
  }

  function starsHtml(value, cls) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      if (value >= i) html += ICONS.star;
      else if (value >= i - 0.5) html += ICONS.starHalf;
      else html += ICONS.starEmpty;
    }
    return `<span class="stars ${cls || ""}" aria-label="${value} de 5 estrelas">${html}</span>`;
  }

  function initRating() {
    const box = $("#ratingScore");
    if (!box || !CONFIG.rating) return;
    const r = CONFIG.rating;
    box.innerHTML = `
      <strong><span data-count="${r.score}" data-decimals="1">0</span><small>/5</small></strong>
      ${starsHtml(r.score)}
      <p>Avaliação da comunidade no portal <b>${escapeHtml(r.source)}</b></p>`;
    const crit = $("#ratingCriteria");
    if (crit) {
      crit.innerHTML = r.criteria.map(c => `
        <div class="criterion">
          <span class="criterion__label">${escapeHtml(c.label)}</span>
          <span class="criterion__value">${c.value.toFixed(1).replace(".", ",")} ${starsHtml(c.value, "stars--sm")}</span>
          <div class="bar__track"><div class="bar__fill bar__fill--gold" data-width="${c.value / 5 * 100}"></div></div>
        </div>`).join("");
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { $$(".bar__fill", en.target).forEach(b => b.style.width = b.dataset.width + "%"); io.unobserve(en.target); } });
      }, { threshold: 0.3 });
      io.observe(crit);
    }
    const t = $("#testimonials");
    if (t && DATA.testimonials) {
      t.innerHTML = DATA.testimonials.map(x => `
        <blockquote class="testimonial"><p>${escapeHtml(x.text)}</p><footer>${escapeHtml(x.author)}<span>${escapeHtml(x.role)}</span></footer></blockquote>`).join("");
    }
  }

  /* ------------------------------------------------------------------
     Filtros genéricos
     ------------------------------------------------------------------ */
  function buildFilters(container, categories, onChange, allLabel) {
    if (!container) return;
    const cats = [["all", allLabel || "Todos"], ...Object.entries(categories)];
    container.innerHTML = cats.map(([k, v], i) => `<button type="button" class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${k}" aria-pressed="${i === 0}">${escapeHtml(v)}</button>`).join("");
    container.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", container).forEach(b => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
      onChange(btn.dataset.filter);
    });
    const initial = getParam("categoria");
    if (initial && categories[initial]) {
      const btn = $(`[data-filter="${initial}"]`, container);
      btn && btn.click();
    }
  }

  function applyFilter(grid, filter, search) {
    let visible = 0;
    $$(".filter-item", grid).forEach(item => {
      const okCat = filter === "all" || item.dataset.category === filter;
      const okSearch = !search || (item.dataset.search || "").includes(search);
      const show = okCat && okSearch;
      item.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });
    let empty = $(".empty-state", grid);
    if (!visible) {
      if (!empty) { empty = document.createElement("div"); empty.className = "empty-state"; empty.textContent = "Nenhum item encontrado para este filtro."; grid.appendChild(empty); }
    } else if (empty) empty.remove();
  }

  /* ------------------------------------------------------------------
     NOTÍCIAS
     ------------------------------------------------------------------ */
  function newsCard(n) {
    return `
      <article class="card filter-item" data-category="${n.category}" data-search="${escapeHtml((n.title + " " + n.summary).toLowerCase())}">
        <a class="card__media" href="noticia.html?id=${n.id}" aria-label="${escapeHtml(n.title)}">
          <img src="${n.image}" alt="${escapeHtml(n.title)}" loading="lazy">
          <span class="tag tag--on-image">${labelize(n.category, NEWS_CATS)}</span>
        </a>
        <div class="card__body">
          <div class="card__meta"><span>${ICONS.calendar}${formatDate(n.date, "short")}</span></div>
          <h3 class="card__title"><a href="noticia.html?id=${n.id}">${escapeHtml(n.title)}</a></h3>
          <p class="card__text">${escapeHtml(n.summary)}</p>
          <div class="card__foot"><a class="link-arrow" href="noticia.html?id=${n.id}">Ler mais ${ICONS.arrowRight}</a></div>
        </div>
      </article>`;
  }

  function initNewsHome() {
    const wrap = $("#newsHome");
    if (!wrap || !DATA.news) return;
    const list = [...DATA.news].sort(sortByDateDesc);
    const featured = list.find(n => n.featured) || list[0];
    const rest = list.filter(n => n !== featured).slice(0, 3);
    wrap.innerHTML = `
      <div class="news-featured">
        <a class="news-hero" href="noticia.html?id=${featured.id}">
          <img src="${featured.image}" alt="${escapeHtml(featured.title)}" loading="lazy">
          <div class="news-hero__body">
            <span class="tag tag--gold" style="justify-self:start">Destaque</span>
            <div class="card__meta"><span>${ICONS.calendar}${formatDate(featured.date)}</span><span>${labelize(featured.category, NEWS_CATS)}</span></div>
            <h3>${escapeHtml(featured.title)}</h3>
            <p>${escapeHtml(featured.summary)}</p>
          </div>
        </a>
        <div class="news-side">
          ${rest.map(n => `
            <article class="news-mini">
              <a href="noticia.html?id=${n.id}"><img src="${n.image}" alt="" loading="lazy"></a>
              <div class="news-mini__body">
                <div class="card__meta"><span>${formatDate(n.date, "short")}</span><span>${labelize(n.category, NEWS_CATS)}</span></div>
                <h4><a href="noticia.html?id=${n.id}">${escapeHtml(n.title)}</a></h4>
              </div>
            </article>`).join("")}
        </div>
      </div>`;
  }

  function initNewsPage() {
    const grid = $("#newsGrid");
    if (!grid || !DATA.news) return;
    const list = [...DATA.news].sort(sortByDateDesc);
    const featured = list.find(n => n.featured) || list[0];
    const featWrap = $("#newsFeatured");
    if (featWrap) {
      featWrap.innerHTML = `
        <a class="news-hero" href="noticia.html?id=${featured.id}">
          <img src="${featured.image}" alt="${escapeHtml(featured.title)}">
          <div class="news-hero__body">
            <span class="tag tag--gold" style="justify-self:start">Destaque</span>
            <div class="card__meta"><span>${ICONS.calendar}${formatDate(featured.date)}</span><span>${labelize(featured.category, NEWS_CATS)}</span></div>
            <h3>${escapeHtml(featured.title)}</h3>
            <p>${escapeHtml(featured.summary)}</p>
          </div>
        </a>`;
    }
    const PAGE = 6; let shown = PAGE;
    const more = $("#newsMore");
    const paint = () => { grid.innerHTML = list.slice(0, shown).map(newsCard).join(""); applyFilter(grid, filter, search); if (more) more.hidden = shown >= list.length; };
    let filter = "all", search = "";
    paint();
    more && more.addEventListener("click", () => { shown += PAGE; paint(); });
    buildFilters($("#newsFilters"), NEWS_CATS, f => { filter = f; shown = list.length; paint(); }, "Todas");
    const input = $("#newsSearch");
    input && input.addEventListener("input", () => { search = input.value.trim().toLowerCase(); applyFilter(grid, filter, search); });
  }

  function initNewsDetail() {
    const wrap = $("#articleContent");
    if (!wrap || !DATA.news) return;
    const id = getParam("id");
    const list = [...DATA.news].sort(sortByDateDesc);
    const n = list.find(x => x.id === id) || list[0];
    document.title = `${n.title} | CEIAS`;
    $("#articleTitle") && ($("#articleTitle").textContent = n.title);
    $("#articleCategory") && ($("#articleCategory").textContent = labelize(n.category, NEWS_CATS));
    wrap.innerHTML = `
      <img class="article__cover" src="${n.image}" alt="${escapeHtml(n.title)}">
      <div class="article__meta"><span>${ICONS.calendar} ${formatDate(n.date)}</span><span>${ICONS.tag} ${labelize(n.category, NEWS_CATS)}</span></div>
      ${(n.content || [n.summary]).map(p => `<p>${escapeHtml(p)}</p>`).join("")}
      <div class="article__share">
        <span>${ICONS.share} Compartilhar:</span>
        <a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(n.title + " — " + location.href)}">WhatsApp</a>
        <a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}">Facebook</a>
        <button type="button" class="btn btn--outline btn--sm" id="copyLink">Copiar link</button>
      </div>`;
    $("#copyLink")?.addEventListener("click", e => {
      navigator.clipboard?.writeText(location.href).then(() => toast("Link copiado!"));
    });
    const side = $("#articleSidebar");
    if (side) {
      side.innerHTML = `
        <div class="sidebar__box"><h3>Últimas notícias</h3><ul class="sidebar__list">
          ${list.filter(x => x !== n).slice(0, 5).map(x => `<li><a href="noticia.html?id=${x.id}">${escapeHtml(x.title)}</a><small>${formatDate(x.date, "short")}</small></li>`).join("")}
        </ul></div>
        <div class="sidebar__box"><h3>Categorias</h3><ul class="sidebar__list">
          ${Object.entries(NEWS_CATS).map(([k, v]) => `<li><a href="noticias.html?categoria=${k}">${v}</a></li>`).join("")}
        </ul></div>`;
    }
  }

  /* ------------------------------------------------------------------
     EVENTOS + CALENDÁRIO
     ------------------------------------------------------------------ */
  function eventCard(ev, past) {
    const d = parseDate(ev.date);
    return `
      <article class="event-card${past ? " event-card--past" : ""} filter-item" data-category="${past ? "past" : "future"}">
        <div class="event-card__date"><strong>${d.getDate()}</strong><span>${MONTHS_SHORT[d.getMonth()]}/${String(d.getFullYear()).slice(2)}</span></div>
        <div class="event-card__body">
          <span class="tag ${past ? "" : "tag--gold"}">${escapeHtml(ev.category || "Evento")}</span>
          <h3><button type="button" class="event-open" data-id="${ev.id}" style="all:unset;cursor:pointer">${escapeHtml(ev.title)}</button></h3>
          <p>${escapeHtml(ev.description)}</p>
          <div class="card__meta"><span>${ICONS.clock}${escapeHtml(ev.time || "")}</span><span>${ICONS.pin}${escapeHtml(ev.location || "")}</span></div>
        </div>
      </article>`;
  }

  function openEventModal(ev) {
    openModal(`
      <img src="${ev.image}" alt="">
      <span class="tag tag--gold">${escapeHtml(ev.category || "Evento")}</span>
      <h3 class="mt-1">${escapeHtml(ev.title)}</h3>
      <div class="event-next__details">
        <span>${ICONS.calendar} ${formatDate(ev.date)}</span>
        <span>${ICONS.clock} ${escapeHtml(ev.time || "")}</span>
        <span>${ICONS.pin} ${escapeHtml(ev.location || "")}</span>
      </div>
      <p class="mt-1">${escapeHtml(ev.description)}</p>${eventActions(ev)}`);
  }

  function initEvents() {
    const events = DATA.events ? [...DATA.events] : [];
    if (!events.length) return;
    const today = todayMidnight();
    const future = events.filter(e => parseDate(e.date) >= today).sort(sortByDateAsc);
    const past = events.filter(e => parseDate(e.date) < today).sort(sortByDateDesc);
    const next = future[0];

    // Próximo evento (home e página de eventos)
    const nextWrap = $("#nextEvent");
    if (nextWrap && next) {
      nextWrap.innerHTML = `
        <div class="event-next reveal">
          <div class="event-next__media"><img src="${next.image}" alt="${escapeHtml(next.title)}" loading="lazy"></div>
          <div class="event-next__body">
            <span class="eyebrow">Próximo evento</span>
            <h3>${escapeHtml(next.title)}</h3>
            <div class="countdown" id="countdown" aria-live="polite"></div>
            <div class="event-next__details">
              <span>${ICONS.calendar} ${formatDate(next.date)}</span>
              <span>${ICONS.clock} ${escapeHtml(next.time || "")}</span>
              <span>${ICONS.pin} ${escapeHtml(next.location || "")}</span>
            </div>
            <p>${escapeHtml(next.description)}</p>
            <div class="btn-group"><button type="button" class="btn btn--primary event-open" data-id="${next.id}">Ver detalhes</button><a class="btn btn--outline" href="eventos.html">Todos os eventos</a></div>
          </div>
        </div>`;
      const cd = $("#countdown");
      const tick = () => {
        const diff = parseDate(next.date) - new Date();
        if (diff <= 0) { cd.innerHTML = `<div><strong>Hoje</strong><span>é o dia</span></div>`; return; }
        const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4);
        cd.innerHTML = `<div><strong>${d}</strong><span>dias</span></div><div><strong>${h}</strong><span>horas</span></div><div><strong>${m}</strong><span>min</span></div>`;
      };
      tick(); setInterval(tick, 30000);
    }

    // Lista na home (3 próximos)
    const home = $("#eventsHome");
    if (home) home.innerHTML = future.slice(0, 4).map(e => eventCard(e, false)).join("") || `<p class="muted">Nenhum evento futuro cadastrado.</p>`;

    // Lista completa
    const list = $("#eventsList");
    if (list) {
      list.innerHTML = future.map(e => eventCard(e, false)).join("") + past.map(e => eventCard(e, true)).join("");
      buildFilters($("#eventsFilters"), { future: "Próximos", past: "Realizados" }, f => applyFilter(list, f), "Todos");
    }

    const wanted = getParam("evento");
    if (wanted) { const ev = events.find(x => x.id === wanted); ev && setTimeout(() => openEventModal(ev), 400); }
    document.addEventListener("click", e => {
      const b = e.target.closest(".event-open");
      if (!b) return;
      const ev = events.find(x => x.id === b.dataset.id);
      ev && openEventModal(ev);
    });

    // Calendário mensal
    const cal = $("#calendar");
    if (cal) {
      let cur = new Date(today.getFullYear(), today.getMonth(), 1);
      const render = () => {
        const y = cur.getFullYear(), m = cur.getMonth();
        const first = new Date(y, m, 1).getDay();
        const days = new Date(y, m + 1, 0).getDate();
        const byDay = {};
        events.forEach(ev => { const d = parseDate(ev.date); if (d.getFullYear() === y && d.getMonth() === m) (byDay[d.getDate()] = byDay[d.getDate()] || []).push(ev); });
        let cells = WEEKDAYS.map(w => `<div class="calendar__wd" aria-hidden="true">${w}</div>`).join("");
        for (let i = 0; i < first; i++) cells += `<div class="calendar__day calendar__day--empty"></div>`;
        for (let d = 1; d <= days; d++) {
          const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
          const evs = byDay[d];
          if (evs) cells += `<button type="button" class="calendar__day calendar__day--event${isToday ? " calendar__day--today" : ""}" data-id="${evs[0].id}" title="${escapeHtml(evs.map(e => e.title).join(" · "))}" aria-label="${d} de ${MONTHS[m]}: ${escapeHtml(evs.map(e => e.title).join(", "))}">${d}</button>`;
          else cells += `<div class="calendar__day${isToday ? " calendar__day--today" : ""}">${d}</div>`;
        }
        cal.innerHTML = `
          <div class="calendar__head">
            <button type="button" class="calendar__nav" id="calPrev" aria-label="Mês anterior">${ICONS.arrowLeft}</button>
            <h3>${MONTHS[m]} de ${y}</h3>
            <button type="button" class="calendar__nav" id="calNext" aria-label="Próximo mês">${ICONS.arrowRight}</button>
          </div>
          <div class="calendar__grid">${cells}</div>
          <div class="calendar__legend"><span>Evento</span><span>Hoje</span></div>`;
        $("#calPrev").addEventListener("click", () => { cur = new Date(y, m - 1, 1); render(); });
        $("#calNext").addEventListener("click", () => { cur = new Date(y, m + 1, 1); render(); });
        $$(".calendar__day--event", cal).forEach(b => b.addEventListener("click", () => { const ev = events.find(x => x.id === b.dataset.id); ev && openEventModal(ev); }));
      };
      render();
    }
  }

  /* ------------------------------------------------------------------
     PROJETOS
     ------------------------------------------------------------------ */
  function projectCard(p) {
    return `
      <article class="card filter-item" data-category="${p.category}" data-search="${escapeHtml((p.title + " " + p.summary).toLowerCase())}">
        <a class="card__media" href="projeto.html?id=${p.id}" aria-label="${escapeHtml(p.title)}">
          <img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy">
          <span class="tag tag--on-image">${labelize(p.category, PROJECT_CATS)}</span>
        </a>
        <div class="card__body">
          <div class="card__meta"><span>${ICONS.calendar}${formatDate(p.date, "short")}</span></div>
          <h3 class="card__title"><a href="projeto.html?id=${p.id}">${escapeHtml(p.title)}</a></h3>
          <p class="card__text">${escapeHtml(p.summary)}</p>
          <p class="card__text"><strong>Participantes:</strong> ${escapeHtml(p.participants)}</p>
          <div class="card__foot"><a class="btn btn--outline btn--sm" href="projeto.html?id=${p.id}">Ver projeto</a></div>
        </div>
      </article>`;
  }

  function initProjects() {
    const list = DATA.projects ? [...DATA.projects].sort(sortByDateDesc) : [];
    const home = $("#projectsHome");
    if (home) home.innerHTML = list.slice(0, 3).map(projectCard).join("");
    const grid = $("#projectsGrid");
    if (grid) {
      grid.innerHTML = list.map(projectCard).join("");
      buildFilters($("#projectsFilters"), PROJECT_CATS, f => applyFilter(grid, f));
    }
    const detail = $("#projectContent");
    if (detail) {
      const p = list.find(x => x.id === getParam("id")) || list[0];
      document.title = `${p.title} | Projetos CEIAS`;
      $("#articleTitle") && ($("#articleTitle").textContent = p.title);
      $("#articleCategory") && ($("#articleCategory").textContent = labelize(p.category, PROJECT_CATS));
      detail.innerHTML = `
        <img class="article__cover" src="${p.image}" alt="${escapeHtml(p.title)}">
        <div class="article__meta"><span>${ICONS.calendar} ${formatDate(p.date)}</span><span>${ICONS.tag} ${labelize(p.category, PROJECT_CATS)}</span><span>${ICONS.users} ${escapeHtml(p.participants)}</span></div>
        <p class="lead">${escapeHtml(p.summary)}</p>
        ${(p.content || []).map(x => `<p>${escapeHtml(x)}</p>`).join("")}`;
      const side = $("#articleSidebar");
      if (side) side.innerHTML = `
        <div class="sidebar__box"><h3>Outros projetos</h3><ul class="sidebar__list">
          ${list.filter(x => x !== p).slice(0, 6).map(x => `<li><a href="projeto.html?id=${x.id}">${escapeHtml(x.title)}</a><small>${labelize(x.category, PROJECT_CATS)}</small></li>`).join("")}
        </ul></div>
        <div class="sidebar__box"><h3>Categorias</h3><ul class="sidebar__list">
          ${Object.entries(PROJECT_CATS).map(([k, v]) => `<li><a href="projetos.html?categoria=${k}">${v}</a></li>`).join("")}
        </ul></div>`;
    }
  }

  /* ------------------------------------------------------------------
     EQUIPE
     ------------------------------------------------------------------ */
  function initTeam() {
    const grid = $("#teamGrid");
    if (!grid || !DATA.teachers) return;
    const limit = parseInt(grid.dataset.limit || "0", 10);
    const list = limit ? DATA.teachers.slice(0, limit) : DATA.teachers;
    grid.innerHTML = list.map(t => `
      <article class="team-card filter-item" data-category="${t.area}" data-search="${escapeHtml((t.name + " " + t.subject).toLowerCase())}">
        <div class="team-card__photo"><img src="${t.photo}" alt="${escapeHtml(t.name)}" loading="lazy"></div>
        <h3>${escapeHtml(t.name)}</h3>
        <span class="team-card__role">${escapeHtml(t.subject)}</span>
        <p class="team-card__info">${escapeHtml(t.role)}<br>${escapeHtml(t.education)}</p>
        <span class="tag">${labelize(t.area, TEAM_AREAS)}</span>
      </article>`).join("");
    let filter = "all", search = "";
    buildFilters($("#teamFilters"), TEAM_AREAS, f => { filter = f; applyFilter(grid, filter, search); });
    const input = $("#teamSearch");
    input && input.addEventListener("input", () => { search = input.value.trim().toLowerCase(); applyFilter(grid, filter, search); });
  }

  /* ------------------------------------------------------------------
     INFRAESTRUTURA
     ------------------------------------------------------------------ */
  function initInfra() {
    const grid = $("#infraGrid");
    if (!grid || !DATA.infrastructure) return;
    grid.innerHTML = DATA.infrastructure.map((i, idx) => `
      <button type="button" class="infra-card" data-lightbox="infra" data-index="${idx}" aria-label="Ampliar imagem: ${escapeHtml(i.title)}">
        <div class="infra-card__media"><img src="${i.image}" alt="${escapeHtml(i.title)}" loading="lazy"><span class="infra-card__zoom">${ICONS.zoom}</span></div>
        <div class="infra-card__body"><h3>${ICONS[i.icon] || ""}${escapeHtml(i.title)}</h3><p>${escapeHtml(i.description)}</p></div>
      </button>`).join("");
    registerLightboxGroup("infra", DATA.infrastructure.map(i => ({ src: i.image, caption: `${i.title} — ${i.description}` })));
  }

  /* ------------------------------------------------------------------
     GALERIA + LIGHTBOX
     ------------------------------------------------------------------ */
  const lightboxGroups = {};
  function registerLightboxGroup(name, items) { lightboxGroups[name] = items; }

  function initLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.id = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Visualização de imagem");
    lb.innerHTML = `
      <button type="button" class="lightbox__btn lightbox__close" aria-label="Fechar">${ICONS.close}</button>
      <button type="button" class="lightbox__btn lightbox__prev" aria-label="Imagem anterior">${ICONS.arrowLeft}</button>
      <figure class="lightbox__figure">
        <div class="lightbox__media"></div>
        <figcaption><div class="lightbox__caption"></div><div class="lightbox__counter"></div></figcaption>
      </figure>
      <button type="button" class="lightbox__btn lightbox__next" aria-label="Próxima imagem">${ICONS.arrowRight}</button>`;
    document.body.appendChild(lb);
    const media = $(".lightbox__media", lb), cap = $(".lightbox__caption", lb), counter = $(".lightbox__counter", lb);
    let group = [], idx = 0, lastFocus = null;

    function show(i) {
      idx = (i + group.length) % group.length;
      const it = group[idx];
      if (it.youtubeId) {
        media.innerHTML = `<div class="modal__video" style="width:min(960px,90vw);aspect-ratio:16/9;margin:auto;border-radius:16px;overflow:hidden"><iframe src="https://www.youtube-nocookie.com/embed/${it.youtubeId}?autoplay=1&rel=0" title="${escapeHtml(it.caption || "Vídeo")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
      } else {
        media.innerHTML = `<img class="lightbox__img" src="${it.src}" alt="${escapeHtml(it.caption || "")}">`;
      }
      cap.textContent = it.caption || "";
      counter.textContent = group.length > 1 ? `${idx + 1} / ${group.length}` : "";
      $(".lightbox__prev", lb).style.display = $(".lightbox__next", lb).style.display = group.length > 1 ? "" : "none";
    }
    function open(name, i) {
      group = lightboxGroups[name] || [];
      if (!group.length) return;
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add("is-open");
      document.body.classList.add("modal-open");
      $(".lightbox__close", lb).focus();
    }
    function close() {
      lb.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      media.innerHTML = "";
      lastFocus && lastFocus.focus();
    }
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-lightbox]");
      if (t) { e.preventDefault(); open(t.dataset.lightbox, parseInt(t.dataset.index || "0", 10)); }
    });
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__prev", lb).addEventListener("click", () => show(idx - 1));
    $(".lightbox__next", lb).addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    let sx = null;
    lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1); sx = null; });
  }

  function galleryItem(g, idx, groupName) {
    const isVideo = g.type === "video";
    return `
      <button type="button" class="gallery-item filter-item${isVideo ? " gallery-item--video" : ""}" data-category="${g.category}" data-lightbox="${groupName}" data-index="${idx}" aria-label="${escapeHtml(g.caption)}">
        <img src="${g.src}" alt="${escapeHtml(g.caption)}" loading="lazy">
        ${isVideo ? `<span class="gallery-item__play">${ICONS.play}</span>` : ""}
        <span class="gallery-item__caption">${escapeHtml(g.caption)}</span>
      </button>`;
  }

  function initGallery() {
    const all = DATA.gallery || [];
    const home = $("#galleryHome");
    if (home) {
      const items = all.filter(g => g.type === "image").slice(0, 9);
      home.innerHTML = items.map((g, i) => galleryItem(g, i, "galleryHome")).join("");
      registerLightboxGroup("galleryHome", items);
    }
    const grid = $("#galleryGrid");
    if (grid) {
      grid.innerHTML = all.map((g, i) => galleryItem(g, i, "gallery")).join("");
      registerLightboxGroup("gallery", all);
      buildFilters($("#galleryFilters"), GALLERY_CATS, f => {
        applyFilter(grid, f);
        // Reindexa o grupo do lightbox para navegar apenas entre os itens visíveis
        const visible = all.map((g, i) => ({ g, i })).filter(x => f === "all" || x.g.category === f);
        registerLightboxGroup("gallery", visible.map(x => x.g));
        visible.forEach((x, n) => { const btn = $(`.gallery-item[data-index="${x.i}"]`, grid); if (btn) btn.dataset.visibleIndex = n; });
        $$(".gallery-item", grid).forEach(b => { if (b.dataset.visibleIndex !== undefined && !b.classList.contains("is-hidden")) b.dataset.index = b.dataset.visibleIndex; });
        // Restaura índices originais ao voltar para "todos"
        if (f === "all") $$(".gallery-item", grid).forEach((b, i) => { b.dataset.index = i; });
      }, "Todas");
    }
  }

  /* ------------------------------------------------------------------
     VÍDEOS + MODAL genérico
     ------------------------------------------------------------------ */
  let modalEl;
  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement("div");
    modalEl.className = "modal";
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.innerHTML = `<div class="modal__dialog"><div class="modal__content"></div></div><button type="button" class="modal__close" aria-label="Fechar">${ICONS.close}</button>`;
    document.body.appendChild(modalEl);
    const close = () => { modalEl.classList.remove("is-open"); modalEl.classList.remove("modal--video"); document.body.classList.remove("modal-open"); $(".modal__content", modalEl).innerHTML = ""; };
    $(".modal__close", modalEl).addEventListener("click", close);
    modalEl.addEventListener("click", e => { if (e.target === modalEl) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && modalEl.classList.contains("is-open")) close(); });
    return modalEl;
  }
  function openModal(html, isVideo) {
    const m = ensureModal();
    $(".modal__content", m).innerHTML = isVideo ? html : `<div class="modal__body">${html}</div>`;
    m.classList.toggle("modal--video", !!isVideo);
    m.classList.add("is-open");
    document.body.classList.add("modal-open");
    $(".modal__close", m).focus();
  }

  function initVideos() {
    const grid = $("#videosGrid");
    if (!grid || !DATA.videos) return;
    const list = [...DATA.videos].sort(sortByDateDesc);
    grid.innerHTML = list.map(v => `
      <button type="button" class="video-card" data-video="${v.id}" aria-label="Assistir: ${escapeHtml(v.title)}">
        <div class="video-card__thumb"><img src="${v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : v.thumb}" alt="" loading="lazy"><span class="gallery-item__play">${ICONS.play}</span></div>
        <div class="video-card__body"><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.description)}</p><div class="card__meta"><span>${ICONS.calendar}${formatDate(v.date, "short")}</span></div></div>
      </button>`).join("");
    grid.addEventListener("click", e => {
      const b = e.target.closest("[data-video]");
      if (!b) return;
      const v = list.find(x => x.id === b.dataset.video);
      if (!v) return;
      if (v.youtubeId) {
        openModal(`<div class="modal__video"><iframe src="https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0" title="${escapeHtml(v.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><div class="modal__body"><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.description)}</p></div>`, true);
      } else {
        openModal(`<img src="${v.thumb}" alt=""><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.description)}</p><div class="info-box info-box--gold"><strong>Vídeo ainda não publicado.</strong> Cadastre o ID do vídeo do YouTube em <code>assets/js/data.js</code> (lista <code>videos</code>) para exibi-lo aqui.</div>`);
      }
    });
  }

  /* ------------------------------------------------------------------
     DOCUMENTOS, AVISOS, LINKS, ABAS
     ------------------------------------------------------------------ */
  function docItem(d) {
    const pending = !d.file;
    return `
      <div class="doc filter-item${pending ? " doc--pending" : ""}" data-category="${d.category}">
        <div class="doc__icon">${ICONS.file}</div>
        <div><h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.description)} · ${labelize(d.category, DOC_CATS)} · ${formatDate(d.date, "short")}${pending ? " · <em>em breve</em>" : " · " + escapeHtml(d.size)}</p></div>
        <div class="doc__actions">
          <a class="btn btn--outline btn--sm" href="${d.file || "#"}" target="_blank" rel="noopener" ${pending ? 'aria-disabled="true" tabindex="-1"' : ""}>${ICONS.eye} Visualizar</a>
          <a class="btn btn--primary btn--sm" href="${d.file || "#"}" download ${pending ? 'aria-disabled="true" tabindex="-1"' : ""}>${ICONS.download} Baixar</a>
        </div>
      </div>`;
  }
  function initDocuments() {
    const list = $("#docsList");
    if (!list || !DATA.documents) return;
    const limit = parseInt(list.dataset.limit || "0", 10);
    const docs = [...DATA.documents].sort(sortByDateDesc);
    list.innerHTML = (limit ? docs.slice(0, limit) : docs).map(docItem).join("");
    let df = "all", ds = "";
    $$(".doc", list).forEach(d => d.dataset.search = norm(d.textContent));
    buildFilters($("#docsFilters"), DOC_CATS, f => { df = f; applyFilter(list, df, ds); });
    const di = $("#docsSearch");
    di && di.addEventListener("input", () => { ds = norm(di.value.trim()); applyFilter(list, df, ds); });
  }
  function initNotices() {
    const wrap = $("#noticesList");
    if (!wrap || !DATA.notices) return;
    const limit = parseInt(wrap.dataset.limit || "0", 10);
    const list = [...DATA.notices].sort(sortByDateDesc);
    wrap.innerHTML = (limit ? list.slice(0, limit) : list).map(n => `
      <article class="notice notice--${n.type || "default"}">
        <span class="notice__date">${formatDate(n.date, "short")}</span>
        <div><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.text)}</p></div>
      </article>`).join("");
  }
  function initStudentLinks() {
    const wrap = $("#studentLinks");
    if (!wrap || !CONFIG.studentLinks) return;
    wrap.innerHTML = CONFIG.studentLinks.map(l => `
      <a class="link-card" href="${l.url}" ${/^https?:/.test(l.url) ? 'target="_blank" rel="noopener"' : ""}>${ICONS[l.icon] || ICONS.file}<div><strong>${escapeHtml(l.title)}</strong><span>${escapeHtml(l.desc)}</span></div></a>`).join("");
  }
  function initTabs() {
    $$("[data-tabs]").forEach(tabs => {
      const btns = $$(".tab", tabs);
      const panels = $$(".tab-panel", tabs.parentElement);
      btns.forEach(b => b.addEventListener("click", () => {
        btns.forEach(x => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-selected", String(x === b)); });
        panels.forEach(p => p.classList.toggle("is-active", p.id === b.getAttribute("aria-controls")));
      }));
    });
  }

  /* ------------------------------------------------------------------
     CONTATO, MAPA, REDES SOCIAIS, WHATSAPP
     ------------------------------------------------------------------ */
  function initContactInfo() {
    const c = CONFIG.contact || {}, a = CONFIG.address || {};
    $$("[data-contact]").forEach(el => {
      const key = el.dataset.contact;
      if (key === "address") el.innerHTML = `${escapeHtml(a.street)}<br>${escapeHtml(a.district)}<br>${escapeHtml(a.city)} — ${escapeHtml(a.state)}<br>${escapeHtml(a.zip)}`;
      else if (key === "phone") el.innerHTML = c.phone ? `<a href="tel:${c.phone.replace(/\D/g, "")}">${escapeHtml(c.phone)}</a>` : "<em>Telefone em atualização</em>";
      else if (key === "email") el.innerHTML = c.email ? `<a href="mailto:${c.email}">${escapeHtml(c.email)}</a>` : "<em>E-mail em atualização</em>";
      else if (key === "hours") el.textContent = c.hours || "";
      else if (key === "inep") el.textContent = CONFIG.school.inep;
    });
    $$("[data-maps-link]").forEach(el => { el.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a.mapsQuery || "")}`; });
    const map = $("#mapFrame");
    if (map) map.src = `https://www.google.com/maps?q=${encodeURIComponent(a.mapsQuery || "")}&z=15&output=embed`;

    const tb = $("#topbarInfo");
    if (tb) tb.innerHTML = `<span>${ICONS.pin}${escapeHtml(a.district)} · ${escapeHtml(a.city)} – ${escapeHtml(a.state)}</span>${c.phone ? `<span>${ICONS.phone}${escapeHtml(c.phone)}</span>` : ""}${c.email ? `<span>${ICONS.mail}${escapeHtml(c.email)}</span>` : ""}<span>${ICONS.clock}${escapeHtml(c.hours || "")}</span>`;
    // Redes sociais
    const s = CONFIG.social || {};
    const nets = [["instagram", "Instagram"], ["facebook", "Facebook"], ["youtube", "YouTube"], ["tiktok", "TikTok"]];
    $$("[data-social-links]").forEach(el => {
      el.innerHTML = nets.map(([k, label]) => `<a href="${s[k] || "#"}" ${s[k] ? 'target="_blank" rel="noopener"' : 'title="Link em breve"'} aria-label="${label}">${ICONS[k]}</a>`).join("");
    });
    $$("[data-social-cards]").forEach(el => {
      el.innerHTML = nets.map(([k, label]) => `<a class="social-card social-card--${k}" href="${s[k] || "#"}" ${s[k] ? 'target="_blank" rel="noopener"' : ""}>${ICONS[k]}<div><strong>${label}</strong><span>${s[k] ? "@ceias" : "Perfil em breve"}</span></div></a>`).join("");
    });

    // WhatsApp flutuante
    if (c.whatsapp) {
      const w = document.createElement("a");
      w.className = "whatsapp-float is-visible";
      w.href = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMessage || "")}`;
      w.target = "_blank"; w.rel = "noopener";
      w.setAttribute("aria-label", "Fale conosco pelo WhatsApp");
      w.innerHTML = ICONS.whatsapp;
      document.body.appendChild(w);
    }
  }

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    const validators = {
      nome: v => v.trim().length >= 3 || "Informe seu nome completo.",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Informe um e-mail válido.",
      telefone: v => !v || v.replace(/\D/g, "").length >= 10 || "Informe um telefone válido com DDD.",
      assunto: v => !!v || "Selecione um assunto.",
      mensagem: v => v.trim().length >= 10 || "Escreva uma mensagem com pelo menos 10 caracteres.",
    };
    const phone = $("#telefone", form);
    phone && phone.addEventListener("input", () => {
      let v = phone.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length > 10 ? 7 : 6)}-${v.slice(v.length > 10 ? 7 : 6)}`;
      else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      phone.value = v;
    });
    form.addEventListener("submit", async e => {
      e.preventDefault();
      let ok = true;
      Object.entries(validators).forEach(([name, fn]) => {
        const field = form.elements[name];
        const wrap = field.closest(".form-field");
        const res = fn(field.value);
        wrap.classList.toggle("is-invalid", res !== true);
        $(".error", wrap).textContent = res === true ? "" : res;
        if (res !== true) ok = false;
      });
      if (!ok) { status.className = "form-status is-error"; status.textContent = "Verifique os campos destacados."; return; }
      const data = Object.fromEntries(new FormData(form).entries());
      if (CONFIG.formEndpoint) {
        try {
          const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error();
          status.className = "form-status is-success"; status.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
          form.reset();
        } catch { status.className = "form-status is-error"; status.textContent = "Não foi possível enviar agora. Tente novamente ou utilize o e-mail/telefone do colégio."; }
      } else {
        const to = (CONFIG.contact && CONFIG.contact.email) || "";
        const body = `Nome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone}\n\n${data.mensagem}`;
        window.location.href = `mailto:${to}?subject=${encodeURIComponent("[Site CEIAS] " + data.assunto)}&body=${encodeURIComponent(body)}`;
        status.className = "form-status is-success"; status.textContent = "Seu aplicativo de e-mail será aberto com a mensagem preenchida. Se isso não acontecer, utilize os contatos ao lado.";
      }
    });
  }

  /* ------------------------------------------------------------------
     Utilidades gerais: voltar ao topo, transição de página, ano
     ------------------------------------------------------------------ */
  function initMisc() {
    $$(".page-hero, .ambrosia, .stats, .campo").forEach(sec => { if (!$(".watermark", sec)) { const w = document.createElement("div"); w.className = "watermark"; w.setAttribute("aria-hidden", "true"); w.innerHTML = '<img src="assets/images/logo-white.svg" alt="">'; sec.appendChild(w); } });
    const bt = $("#backTop");
    if (bt) {
      bt.innerHTML = ICONS.arrowUp;
      window.addEventListener("scroll", () => bt.classList.toggle("is-visible", window.scrollY > 600), { passive: true });
      bt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
    $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
    $$("[data-icon]").forEach(el => { const svg = ICONS[el.dataset.icon]; if (svg) el.innerHTML = svg; });

    // Transição suave entre páginas internas
    const pt = document.createElement("div"); pt.className = "page-transition"; document.body.appendChild(pt);
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || a.target === "_blank" || e.metaKey || e.ctrlKey || e.button !== 0) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href) || a.hasAttribute("download")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(() => { window.location.href = href; }, 300);
    });
    window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));

    // Deslocamento de âncoras por causa do cabeçalho fixo
    if (location.hash) setTimeout(() => { const t = $(location.hash); t && window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 90 }); }, 50);
  }


  /* ------------------------------------------------------------------
     Loader, barra de progresso e toast
     ------------------------------------------------------------------ */
  function initLoader() {
    const l = $("#loader");
    if (!l) return;
    const done = () => { l.classList.add("is-done"); document.body.classList.add("is-loaded"); setTimeout(() => l.remove(), 600); };
    if (document.readyState === "complete") done();
    else { window.addEventListener("load", done); setTimeout(done, 1800); }
  }
  function initProgress() {
    const bar = document.createElement("div"); bar.className = "progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
    const upd = () => { const h = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + "%"; };
    window.addEventListener("scroll", upd, { passive: true }); upd();
  }
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = ICONS.check + escapeHtml(msg);
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }
  window.CEIAS_toast = toast;

  /* ------------------------------------------------------------------
     Acessibilidade: tamanho da fonte, alto contraste e Libras
     ------------------------------------------------------------------ */
  function initAccessibility() {
    const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
    const read = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const sizes = ["", "font-lg", "font-xl"];
    let idx = sizes.indexOf(read("ceias-font") || "");
    if (idx < 0) idx = 0;
    const applyFont = () => { document.documentElement.classList.remove("font-lg", "font-xl"); if (sizes[idx]) document.documentElement.classList.add(sizes[idx]); store("ceias-font", sizes[idx]); };
    const contrastBtns = $$('[data-a11y="contrast"]');
    const applyContrast = on => { document.body.classList.toggle("contrast", on); contrastBtns.forEach(b => b.setAttribute("aria-pressed", String(on))); store("ceias-contrast", on ? "1" : "0"); };
    applyFont(); applyContrast(read("ceias-contrast") === "1");
    $$("[data-a11y]").forEach(btn => btn.addEventListener("click", () => {
      const a = btn.dataset.a11y;
      if (a === "font-up") { idx = Math.min(2, idx + 1); applyFont(); toast(idx ? "Fonte aumentada" : "Fonte padrão"); }
      if (a === "font-down") { idx = Math.max(0, idx - 1); applyFont(); toast(idx ? "Fonte reduzida" : "Fonte padrão"); }
      if (a === "contrast") { applyContrast(!document.body.classList.contains("contrast")); }
      if (a === "libras") { const b = $("[vw-access-button]"); if (b) b.click(); else toast("O plugin VLibras ainda está carregando. Tente novamente em instantes."); }
    }));
  }

  /* ------------------------------------------------------------------
     Busca global (Ctrl+K)
     ------------------------------------------------------------------ */
  const STATIC_PAGES = [
    ["Início", "index.html", "Página inicial"], ["Sobre o colégio", "o-colegio.html", "Missão, valores e identidade"],
    ["Irmã Ambrósia — Nossa história", "historia.html", "Biografia e linha do tempo da patrona"], ["Educação do Campo", "educacao-do-campo.html", "Identidade pedagógica"],
    ["Infraestrutura", "infraestrutura.html", "Biblioteca, laboratórios, quadra, refeitório"], ["Nossa equipe", "equipe.html", "Professores e profissionais"],
    ["Nossa cultura", "cultura.html", "Colônia Marcelino e herança ucraniana"], ["Ensino", "ensino.html", "Etapas e modalidades"],
    ["Anos Finais", "ensino-anos-finais.html", "6º ao 9º ano"], ["Ensino Médio", "ensino-medio.html", "1º ao 3º ano"], ["EJA / Classe Especial", "ensino-eja.html", "Modalidades"],
    ["Vida escolar", "vida-escolar.html", "Horários, transporte, alimentação, uniforme"], ["Documentos", "documentos.html", "Calendário, regimento, formulários"],
    ["Área do aluno", "area-do-aluno.html", "Avisos, links e materiais"], ["Projetos", "projetos.html", "Projetos que transformam"], ["Notícias", "noticias.html", "Portal de notícias"],
    ["Eventos e calendário", "eventos.html", "Programação do colégio"], ["Galeria", "galeria.html", "Fotos e vídeos"], ["Contato", "contato.html", "Fale conosco, mapa e redes"],
  ];
  function buildSearchIndex() {
    const idx = STATIC_PAGES.map(([t, u, d]) => ({ type: "Página", icon: "school", title: t, url: u, desc: d }));
    (DATA.news || []).forEach(n => idx.push({ type: "Notícia", icon: "news", title: n.title, url: `noticia.html?id=${n.id}`, desc: `${formatDate(n.date, "short")} · ${labelize(n.category, NEWS_CATS)}`, text: n.summary }));
    (DATA.projects || []).forEach(p => idx.push({ type: "Projeto", icon: "lightbulb", title: p.title, url: `projeto.html?id=${p.id}`, desc: labelize(p.category, PROJECT_CATS), text: p.summary }));
    (DATA.events || []).forEach(e => idx.push({ type: "Evento", icon: "calendar", title: e.title, url: `eventos.html?evento=${e.id}`, desc: `${formatDate(e.date, "short")} · ${e.location || ""}`, text: e.description }));
    (DATA.documents || []).forEach(d => idx.push({ type: "Documento", icon: "file", title: d.title, url: `documentos.html?categoria=${d.category}`, desc: labelize(d.category, DOC_CATS), text: d.description }));
    (DATA.teachers || []).forEach(t => idx.push({ type: "Equipe", icon: "users", title: t.name, url: "equipe.html", desc: t.subject }));
    (DATA.infrastructure || []).forEach(i => idx.push({ type: "Infraestrutura", icon: i.icon, title: i.title, url: "infraestrutura.html", desc: i.description }));
    return idx;
  }
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function initSearch() {
    const modal = document.createElement("div");
    modal.className = "search-modal"; modal.id = "searchModal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-label", "Buscar no site");
    modal.innerHTML = `
      <div class="search-modal__box">
        <div class="search-modal__input">${ICONS.search}<label class="sr-only" for="searchInput">Buscar no site</label><input id="searchInput" type="search" placeholder="Buscar notícias, projetos, eventos, documentos, páginas…" autocomplete="off"><kbd>Esc</kbd></div>
        <div class="search-modal__results" id="searchResults" role="listbox"></div>
        <div class="search-modal__hint"><span>Atalho: <kbd>Ctrl</kbd> + <kbd>K</kbd></span><span>Use ↑ ↓ para navegar e Enter para abrir</span></div>
      </div>`;
    document.body.appendChild(modal);
    const input = $("#searchInput", modal), results = $("#searchResults", modal);
    const index = buildSearchIndex();
    let lastFocus = null;
    const open = () => { lastFocus = document.activeElement; modal.classList.add("is-open"); document.body.classList.add("modal-open"); render(""); setTimeout(() => input.focus(), 50); };
    const close = () => { modal.classList.remove("is-open"); document.body.classList.remove("modal-open"); input.value = ""; lastFocus && lastFocus.focus(); };
    const highlight = (text, q) => { if (!q) return escapeHtml(text); const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"); return escapeHtml(text).replace(re, "<mark>$1</mark>"); };
    function render(q) {
      const nq = norm(q.trim());
      let list;
      if (!nq) list = index.filter(i => i.type === "Página").slice(0, 8);
      else list = index.map(i => { const h = norm(i.title), t = norm(i.text) + " " + norm(i.desc); let score = 0; if (h.includes(nq)) score += 10; if (h.startsWith(nq)) score += 5; if (t.includes(nq)) score += 3; nq.split(/\s+/).forEach(w => { if (w && (h.includes(w) || t.includes(w))) score += 1; }); return { i, score }; }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 12).map(x => x.i);
      results.innerHTML = list.length ? list.map(i => `<a class="search-result" href="${i.url}" role="option"><span class="search-result__icon">${ICONS[i.icon] || ICONS.file}</span><span><strong>${highlight(i.title, q.trim())}</strong><span>${escapeHtml(i.type)} · ${escapeHtml(i.desc)}</span></span></a>`).join("")
        : `<div class="empty-state">Nenhum resultado para “${escapeHtml(q)}”.</div>`;
    }
    input.addEventListener("input", () => render(input.value));
    modal.addEventListener("click", e => { if (e.target === modal) close(); });
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); modal.classList.contains("is-open") ? close() : open(); }
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      const items = $$(".search-result", results);
      const pos = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); (items[pos + 1] || items[0])?.focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); (pos <= 0 ? input : items[pos - 1]).focus(); }
      if (e.key === "Enter" && document.activeElement === input && items[0]) { items[0].click(); }
    });
    $$("[data-search-open]").forEach(b => b.addEventListener("click", open));
  }

  /* ------------------------------------------------------------------
     Ticker de avisos (home)
     ------------------------------------------------------------------ */
  function initTicker() {
    const list = $("#tickerList");
    if (!list) return;
    const today = todayMidnight();
    const items = [
      ...(DATA.notices || []).sort(sortByDateDesc).slice(0, 4).map(n => ({ text: n.title, url: "area-do-aluno.html" })),
      ...(DATA.events || []).filter(e => parseDate(e.date) >= today).sort(sortByDateAsc).slice(0, 3).map(e => ({ text: `${formatDate(e.date, "short")} — ${e.title}`, url: `eventos.html?evento=${e.id}` })),
    ];
    if (!items.length) { list.closest(".ticker")?.remove(); return; }
    const html = items.map(i => `<li><a href="${i.url}">${escapeHtml(i.text)}</a></li>`).join("");
    list.innerHTML = html + html; // duplicado para o loop contínuo
    list.style.animationDuration = Math.max(25, items.length * 9) + "s";
  }

  /* ------------------------------------------------------------------
     Exportar evento: Google Agenda e arquivo .ics
     ------------------------------------------------------------------ */
  function eventActions(ev) {
    const d = parseDate(ev.date); const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), dd = String(d.getDate()).padStart(2, "0");
    const next = new Date(d); next.setDate(next.getDate() + 1);
    const y2 = next.getFullYear(), m2 = String(next.getMonth() + 1).padStart(2, "0"), dd2 = String(next.getDate()).padStart(2, "0");
    const details = `${ev.description || ""}\n${ev.time ? "Horário: " + ev.time : ""}`;
    const g = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${y}${m}${dd}/${y2}${m2}${dd2}&details=${encodeURIComponent(details)}&location=${encodeURIComponent((ev.location || "") + " — CEIAS, Colônia Marcelino, São José dos Pinhais - PR")}`;
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//CEIAS//Site//PT", "BEGIN:VEVENT", `UID:${ev.id}@ceias`, `DTSTART;VALUE=DATE:${y}${m}${dd}`, `DTEND;VALUE=DATE:${y2}${m2}${dd2}`, `SUMMARY:${ev.title}`, `DESCRIPTION:${details.replace(/\n/g, "\\n")}`, `LOCATION:${ev.location || "CEIAS"}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const icsHref = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    return `<div class="event-actions"><a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="${g}">${ICONS.calendar} Google Agenda</a><a class="btn btn--outline btn--sm" href="${icsHref}" download="${ev.id}.ics">${ICONS.download} Salvar (.ics)</a><a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(ev.title + " — " + formatDate(ev.date) + " · " + location.origin + location.pathname.replace(/[^/]*$/, "") + "eventos.html?evento=" + ev.id)}">${ICONS.whatsapp} Compartilhar</a></div>`;
  }

  /* ------------------------------------------------------------------
     Aviso LGPD e ações de copiar
     ------------------------------------------------------------------ */
  function initLgpd() {
    let ok = null; try { ok = localStorage.getItem("ceias-lgpd"); } catch (e) {}
    if (ok) return;
    const bar = document.createElement("div"); bar.className = "lgpd is-visible"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Aviso de privacidade");
    bar.innerHTML = `<p>Este site não utiliza cookies de rastreamento. Guardamos apenas suas preferências de acessibilidade no seu navegador. O mapa e os vídeos são carregados de serviços externos (Google e YouTube).</p><button type="button" class="btn btn--primary btn--sm" id="lgpdOk">Entendi</button>`;
    document.body.appendChild(bar);
    $("#lgpdOk").addEventListener("click", () => { bar.remove(); try { localStorage.setItem("ceias-lgpd", "1"); } catch (e) {} });
  }
  function initCopy() {
    document.addEventListener("click", e => {
      const b = e.target.closest("[data-copy]"); if (!b) return;
      const txt = b.dataset.copy === "address" ? `${CONFIG.address.street}, ${CONFIG.address.district}, ${CONFIG.address.city} - ${CONFIG.address.state}, ${CONFIG.address.zip}` : b.dataset.copy === "url" ? location.href : b.dataset.copy;
      navigator.clipboard?.writeText(txt).then(() => toast("Copiado para a área de transferência")).catch(() => toast("Não foi possível copiar"));
    });
  }

  /* ------------------------------------------------------------------
     Inicialização
     ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initAccessibility();
    initHeader();
    initSearch();
    initTicker();
    initLgpd();
    initCopy();
    initProgress();
    initHeroSlider();
    initLightbox();
    initNewsHome();
    initNewsPage();
    initNewsDetail();
    initEvents();
    initProjects();
    initTeam();
    initInfra();
    initGallery();
    initVideos();
    initDocuments();
    initNotices();
    initStudentLinks();
    initTabs();
    initCharts();
    initRating();
    initContactInfo();
    initContactForm();
    initMisc();
    // Executa depois da renderização dinâmica
    initReveal();
    initCounters();
    initParallax();
  });
})();
