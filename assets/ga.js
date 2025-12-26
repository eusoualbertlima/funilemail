// assets/ga.js
// Autoload GA4 if a measurement ID is present in meta[name="ga-measurement-id"]
(function(){
  try {
    var meta = document.querySelector('meta[name="ga-measurement-id"]');
    if (!meta) return;
    var id = (meta.getAttribute('content') || '').trim();
    if (!id) return;

    // Load gtag script
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);

    // init gtag (queues safely before script loads)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    gtag('config', id);

    // Attach click listener for CTA events
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('[data-ga-event]');
      if (!el) return;
      var ev = el.dataset.gaEvent || 'cta_click';
      try { gtag('event', ev, { event_category: 'cta', event_label: (el.getAttribute('href') || location.pathname) }); } catch (err) { /* ignore */ }
    }, false);
  } catch (err) {
    console.warn('ga.js failed to init', err && err.message);
  }
})();
