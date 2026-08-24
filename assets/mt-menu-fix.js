(function(){
'use strict';

var items=[
  ['Início','/'],
  ['Brasileiros','/collections/camisas-nacionais'],
  ['Seleções','/collections/selecoes'],
  ['Kit Infantil','/collections/kits-infantis'],
  ['Sobre Nossos Envios','/pages/prazo-e-funcionamento-das-entregas'],
  ['Sobre Nós','/pages/sobre-nos'],
  ['Privacidade','/pages/politicas-de-privacidade']
];

function installStyles(){
  if(document.getElementById('mt-menu-search-fix-v2'))return;
  var style=document.createElement('style');
  style.id='mt-menu-search-fix-v2';
  style.textContent='\
/* Busca: badges compactos, apenas na página de pesquisa */\
body.template-search .product-list--collection .product-item{position:relative!important;}\
body.template-search .product-list--collection .product-item__label-list{position:absolute!important;top:10px!important;left:10px!important;right:10px!important;z-index:6!important;display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;align-items:center!important;justify-content:flex-start!important;gap:6px!important;width:auto!important;max-width:calc(100% - 20px)!important;margin:0!important;padding:0!important;pointer-events:none!important;}\
body.template-search .product-list--collection .product-item__label-list .product-label{position:static!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;min-width:0!important;max-width:max-content!important;height:auto!important;min-height:0!important;margin:0!important;padding:7px 9px!important;border-radius:3px!important;font-size:9px!important;line-height:1!important;font-weight:900!important;letter-spacing:.08em!important;white-space:nowrap!important;box-shadow:none!important;transform:none!important;}\
body.template-search .product-list--collection .product-item__label-list .product-label--custom1,body.template-search .product-list--collection .product-item__label-list .product-label--custom2{background:#0c0e12!important;color:#fff!important;border:1px solid rgba(255,255,255,.28)!important;}\
body.template-search .product-list--collection .product-item__label-list .product-label--on-sale{background:rgba(255,255,255,.95)!important;color:#111!important;border:1px solid rgba(0,0,0,.14)!important;}\
/* Desktop: garante que a navegação inline permaneça visível */\
@media screen and (min-width:1000px){.nav-bar{display:block!important;visibility:visible!important;opacity:1!important;}.nav-bar .nav-bar__inner,.nav-bar .container{visibility:visible!important;opacity:1!important;}.nav-bar__linklist[data-type="menu"]{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;visibility:visible!important;opacity:1!important;}.nav-bar__linklist[data-type="menu"]>.nav-bar__item{display:inline-flex!important;visibility:visible!important;opacity:1!important;}.nav-bar__linklist[data-type="menu"]>.nav-bar__item>.nav-bar__link{display:inline-flex!important;visibility:visible!important;opacity:1!important;color:#fff!important;}}\
/* Mobile: fallback visual só quando o menu estiver realmente aberto */\
@media screen and (max-width:999px){#mobile-menu[aria-hidden="false"]{display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:scale(1)!important;}#mobile-menu[aria-hidden="true"]{pointer-events:none!important;}}\
@media screen and (max-width:700px){body.template-search .product-list--collection .product-item__label-list{top:8px!important;left:8px!important;right:8px!important;gap:5px!important;max-width:calc(100% - 16px)!important;}body.template-search .product-list--collection .product-item__label-list .product-label{padding:5px 7px!important;font-size:8px!important;letter-spacing:.055em!important;}}';
  document.head.appendChild(style);
}

function desktop(){
  document.querySelectorAll('.nav-bar__linklist[data-type="menu"]').forEach(function(ul){
    ul.innerHTML=items.map(function(i){
      return '<li class="nav-bar__item"><a href="'+i[1]+'" class="nav-bar__link link" data-type="menuitem">'+i[0]+'</a></li>';
    }).join('');
  });
}

function mobile(){
  var ul=document.querySelector('#mobile-menu .mobile-menu__panel:first-child .mobile-menu__section .mobile-menu__nav[data-type="menu"]');
  if(!ul)return;
  ul.innerHTML=items.map(function(i){
    return '<li class="mobile-menu__nav-item"><a href="'+i[1]+'" class="mobile-menu__nav-link" data-type="menuitem">'+i[0]+'</a></li>';
  }).join('');
}

function setMobileMenuState(button,menu,open){
  button.setAttribute('aria-expanded',open?'true':'false');
  menu.setAttribute('aria-hidden',open?'false':'true');
}

function installMobileFallback(){
  if(document.documentElement.getAttribute('data-mt-menu-fallback')==='1')return;
  document.documentElement.setAttribute('data-mt-menu-fallback','1');

  document.addEventListener('click',function(e){
    var button=e.target&&e.target.closest?e.target.closest('.header__mobile-nav-toggle[data-action="toggle-menu"]'):null;
    if(!button||!window.matchMedia('(max-width:999px)').matches)return;
    var id=button.getAttribute('aria-controls')||'mobile-menu';
    var menu=document.getElementById(id);
    if(!menu)return;

    var wasOpen=button.getAttribute('aria-expanded')==='true'||menu.getAttribute('aria-hidden')==='false';
    var expectedOpen=!wasOpen;

    setTimeout(function(){
      var buttonOpen=button.getAttribute('aria-expanded')==='true';
      var menuOpen=menu.getAttribute('aria-hidden')==='false';
      if(buttonOpen===expectedOpen&&menuOpen===expectedOpen)return;
      setMobileMenuState(button,menu,expectedOpen);
    },80);
  },true);
}

function run(){
  installStyles();
  desktop();
  mobile();
  installMobileFallback();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
setTimeout(run,250);
setTimeout(run,900);
document.addEventListener('shopify:section:load',run);
})();