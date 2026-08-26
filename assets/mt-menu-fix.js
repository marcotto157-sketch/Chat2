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

function menuHtml(clsItem,clsLink){
  return items.map(function(i){return '<li class="'+clsItem+'"><a href="'+i[1]+'" class="'+clsLink+'">'+i[0]+'</a></li>';}).join('');
}

function installStyles(){
  if(document.getElementById('mt-menu-hard-fix-v3'))return;
  var s=document.createElement('style');
  s.id='mt-menu-hard-fix-v3';
  s.textContent='\
@media screen and (min-width:1000px){#mt-desktop-nav-fallback{display:block!important;background:var(--fundomenu,#000)!important;border-top:1px solid rgba(255,255,255,.08)!important;border-bottom:1px solid rgba(255,255,255,.08)!important}#mt-desktop-nav-fallback ul{display:flex!important;align-items:center!important;justify-content:center!important;gap:4px!important;flex-wrap:wrap!important;margin:0!important;padding:0 18px!important;list-style:none!important}#mt-desktop-nav-fallback li{display:inline-flex!important;margin:0!important;padding:0!important}#mt-desktop-nav-fallback a{display:inline-flex!important;align-items:center!important;min-height:46px!important;padding:0 12px!important;color:#fff!important;text-decoration:none!important;font-size:14px!important;white-space:nowrap!important}.nav-bar{display:block!important;visibility:visible!important;opacity:1!important}.nav-bar__linklist[data-type="menu"]{display:flex!important;justify-content:center!important;align-items:center!important;flex-wrap:wrap!important}.nav-bar__linklist[data-type="menu"]>.nav-bar__item{display:inline-flex!important}.nav-bar__linklist[data-type="menu"]>.nav-bar__item>.nav-bar__link{display:inline-flex!important;color:#fff!important;opacity:1!important;visibility:visible!important}}\
@media screen and (max-width:999px){#mt-mobile-menu-drawer{position:fixed!important;top:0!important;left:0!important;width:min(86vw,390px)!important;height:100vh!important;z-index:99999!important;background:#0b0d11!important;color:#fff!important;transform:translateX(-105%)!important;transition:transform .28s ease!important;box-shadow:12px 0 35px rgba(0,0,0,.35)!important;overflow-y:auto!important;padding:82px 20px 30px!important;display:block!important}#mt-mobile-menu-drawer.is-open{transform:translateX(0)!important}#mt-mobile-menu-drawer ul{list-style:none!important;margin:0!important;padding:0!important}#mt-mobile-menu-drawer li{border-bottom:1px solid #2c3139!important}#mt-mobile-menu-drawer a{display:block!important;padding:16px 4px!important;color:#fff!important;text-decoration:none!important;font-size:17px!important}#mt-mobile-menu-close{position:absolute!important;top:20px!important;right:18px!important;width:42px!important;height:42px!important;border:1px solid #444!important;background:#11141a!important;color:#fff!important;border-radius:6px!important;font-size:25px!important;line-height:1!important}#mt-mobile-menu-overlay{position:fixed!important;inset:0!important;z-index:99998!important;background:rgba(0,0,0,.55)!important;display:none!important}#mt-mobile-menu-overlay.is-open{display:block!important}.header__mobile-nav{display:block!important;visibility:visible!important;opacity:1!important}.header__mobile-nav-toggle{display:inline-flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}}';
  document.head.appendChild(s);
}

function ensureDesktop(){
  var existing=document.querySelector('.nav-bar');
  if(existing){
    var ul=existing.querySelector('.nav-bar__linklist[data-type="menu"]');
    if(ul)ul.innerHTML=menuHtml('nav-bar__item','nav-bar__link link');
    return;
  }
  if(document.getElementById('mt-desktop-nav-fallback'))return;
  var headerSection=document.querySelector('[data-section-type="header"]');
  if(!headerSection)return;
  var nav=document.createElement('nav');
  nav.id='mt-desktop-nav-fallback';
  nav.innerHTML='<ul>'+menuHtml('nav-bar__item','nav-bar__link link')+'</ul>';
  headerSection.appendChild(nav);
}

function ensureMobileButton(){
  var btn=document.querySelector('.header__mobile-nav-toggle');
  if(btn)return btn;
  var inner=document.querySelector('.header__inner');
  if(!inner)return null;
  var wrap=document.createElement('nav');
  wrap.className='header__mobile-nav hidden-lap-and-up';
  wrap.innerHTML='<button type="button" class="header__mobile-nav-toggle icon-state touch-area" aria-expanded="false" aria-label="Abrir menu" style="display:inline-flex;align-items:center;justify-content:center"><span aria-hidden="true" style="font-size:27px;line-height:1">☰</span></button>';
  inner.insertBefore(wrap,inner.firstChild);
  return wrap.querySelector('.header__mobile-nav-toggle');
}

function ensureDrawer(){
  var drawer=document.getElementById('mt-mobile-menu-drawer');
  if(!drawer){
    drawer=document.createElement('aside');
    drawer.id='mt-mobile-menu-drawer';
    drawer.setAttribute('aria-hidden','true');
    drawer.innerHTML='<button id="mt-mobile-menu-close" type="button" aria-label="Fechar menu">×</button><ul>'+menuHtml('mobile-menu__nav-item','mobile-menu__nav-link')+'</ul>';
    document.body.appendChild(drawer);
  }
  var overlay=document.getElementById('mt-mobile-menu-overlay');
  if(!overlay){overlay=document.createElement('div');overlay.id='mt-mobile-menu-overlay';document.body.appendChild(overlay);}
  return {drawer:drawer,overlay:overlay};
}

function openMenu(btn,state){
  var d=ensureDrawer();
  d.drawer.classList.toggle('is-open',state);
  d.overlay.classList.toggle('is-open',state);
  d.drawer.setAttribute('aria-hidden',state?'false':'true');
  if(btn)btn.setAttribute('aria-expanded',state?'true':'false');
  document.documentElement.style.overflow=state?'hidden':'';
}

function bindMobile(){
  var btn=ensureMobileButton();
  if(!btn||btn.getAttribute('data-mt-bound')==='1')return;
  btn.setAttribute('data-mt-bound','1');
  btn.addEventListener('click',function(e){
    if(!window.matchMedia('(max-width:999px)').matches)return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    openMenu(btn,btn.getAttribute('aria-expanded')!=='true');
  },true);
  var d=ensureDrawer();
  d.overlay.addEventListener('click',function(){openMenu(btn,false)});
  var close=d.drawer.querySelector('#mt-mobile-menu-close');
  if(close)close.addEventListener('click',function(){openMenu(btn,false)});
  d.drawer.addEventListener('click',function(e){if(e.target.closest('a'))openMenu(btn,false)});
}

function removeLegacyMobileMenu(){
  var legacy=document.getElementById('mobile-menu');
  if(legacy)legacy.remove();
}

function run(){removeLegacyMobileMenu();installStyles();ensureDesktop();ensureMobileButton();ensureDrawer();bindMobile();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
setTimeout(run,200);setTimeout(run,700);setTimeout(run,1500);
document.addEventListener('shopify:section:load',run);
})();
