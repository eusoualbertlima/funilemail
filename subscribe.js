// Simple accessible modal and localStorage-based lead capture
document.addEventListener('DOMContentLoaded', function(){
  var openBtn = document.querySelector('[data-open-subscribe]');
  var modal = document.getElementById('subscribe-modal');
  var closeBtn = modal && modal.querySelector('[data-close]');
  var form = modal && modal.querySelector('form');
  var message = modal && modal.querySelector('.subscribe-message');

  function open(){ modal.style.display = 'block'; modal.querySelector('input').focus(); document.body.style.overflow='hidden'; }
  function close(){ modal.style.display = 'none'; document.body.style.overflow='auto'; }

  if(openBtn) openBtn.addEventListener('click', function(e){ e.preventDefault(); open(); });
  if(closeBtn) closeBtn.addEventListener('click', function(e){ e.preventDefault(); close(); });

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var email = form.querySelector('input[type="email"]').value.trim();
      if(!email) return;
      var list = JSON.parse(localStorage.getItem('fe_subscribers')||'[]');
      list.push({email: email, created_at: new Date().toISOString()});
      localStorage.setItem('fe_subscribers', JSON.stringify(list));
      message.textContent = 'Obrigado! Seu email foi salvo. Em breve enviaremos instruções.';
      message.setAttribute('aria-live','polite');
      form.reset();

      // optional GA event
      if(window.dataLayer) window.dataLayer.push({event:'lead_submitted', method:'modal'});
      if(window.gtag) gtag('event','lead_submitted',{method:'modal'});

      setTimeout(close, 1600);
    });
  }
});