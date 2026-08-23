/* MT Sports — gatilho robusto de personalização */
(function(){
  function norm(v){return (v||'').toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function isPersonalValue(v){var x=norm(v);return x==='sim'||x==='personalizar'||x.indexOf('com personal')!==-1||x.indexOf('personalizad')!==-1;}
  function sync(form){
    if(!form) return;
    var radios=form.querySelectorAll('.detect_variant');
    if(!radios.length) return;
    var selected=form.querySelector('.detect_variant:checked');
    var box=form.querySelector('#aparecer')||document.getElementById('aparecer');
    if(!box) return;
    var on=!!selected && isPersonalValue(selected.value);
    box.style.display=on?'block':'none';
    var nome=box.querySelector('[name="properties[Nome]"]');
    var numero=box.querySelector('[name="properties[Número]"]');
    if(nome) nome.required=on;
    if(numero) numero.required=on;
    if(!on){if(nome) nome.value='';if(numero) numero.value='';}
  }
  function syncAll(){document.querySelectorAll('form.product-form').forEach(sync);}
  document.addEventListener('change',function(e){
    if(e.target && e.target.matches('.detect_variant')){
      sync(e.target.closest('form.product-form'));
      /* deixa o gatilho nativo do tema recalcular a variante/preço */
      setTimeout(syncAll,80);
      setTimeout(syncAll,250);
    }
  });
  document.addEventListener('DOMContentLoaded',syncAll);
  window.addEventListener('load',syncAll);
  setTimeout(syncAll,500);
})();

/* MT Sports — acabamento visual da personalização + rota Memphis */
(function(){
  function applyMtPresentationFixes(){
    if(!document.getElementById('mt-personalizacao-theme-v21')){
      var style=document.createElement('style');
      style.id='mt-personalizacao-theme-v21';
      style.textContent=[
        'body.template-product #aparecer{margin:18px 0 0!important;padding:16px!important;border:1px solid rgba(255,255,255,.9)!important;border-radius:10px!important;background:#090b0f!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.04)!important;}',
        'body.template-product #aparecer .line-item-property__field{margin:0 0 12px!important;}',
        'body.template-product #aparecer .line-item-property__field:last-child{margin-bottom:0!important;}',
        'body.template-product #aparecer label{display:block!important;margin-bottom:7px!important;color:#fff!important;font-weight:800!important;letter-spacing:.03em!important;}',
        'body.template-product #aparecer input[type="text"],body.template-product #aparecer input[type="number"],body.template-product #aparecer input:not([type]){width:100%!important;min-height:46px!important;padding:10px 12px!important;background:#f5f5f3!important;color:#090a0c!important;border:1px solid #fff!important;border-radius:7px!important;box-shadow:none!important;outline:none!important;}',
        'body.template-product #aparecer input:focus{border-color:#fff!important;box-shadow:0 0 0 2px rgba(255,255,255,.18)!important;}',
        'body.template-product #aparecer input::placeholder{color:#626771!important;}'
      ].join('');
      document.head.appendChild(style);
    }
    document.querySelectorAll('.mt-main-banner-v21__button').forEach(function(button){
      button.setAttribute('href','/collections/pronta-entrega-%F0%9F%94%A5');
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyMtPresentationFixes);
  }else{
    applyMtPresentationFixes();
  }
  window.addEventListener('load',applyMtPresentationFixes);
})();