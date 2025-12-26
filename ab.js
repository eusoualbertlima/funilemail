// Simple client-side A/B test for headline
(function(){
  try {
    var key = 'fe_ab_variant';
    var variant = localStorage.getItem(key);
    if (!variant) {
      variant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(key, variant);
    }

    var headline = document.querySelector('.hero-content h1');
    if (!headline) return;

    var original = headline.innerHTML;
    var alt = 'Corretor: <span>Pare de Perder Vendas</span> com Follow-up Automático';

    if (variant === 'B') {
      headline.innerHTML = alt;
    } else {
      headline.innerHTML = original;
    }

    // Push event to GA if available
    if (window.dataLayer) {
      window.dataLayer.push({event: 'ab_test_assigned', experiment: 'hero_headline', variant: variant});
    } else if (window.gtag) {
      gtag('event', 'ab_test_assigned', { 'experiment': 'hero_headline', 'variant': variant });
    }
  } catch (e) {
    console.warn('A/B script error', e);
  }
})();