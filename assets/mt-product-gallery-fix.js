/* MT Sports — galeria segura + limpeza do botão; não altera cores globais */
(function(){'use strict';
function cleanButton(){
 document.querySelectorAll('body.template-product .product-form__add-button,body.template-product .botaoflutuante .button--primary').forEach(function(b){
  b.querySelectorAll('img,[class*="bag"],[class*="sacola"],.icon-sacola').forEach(function(x){if(!x.classList.contains('mt-buy-cart-icon'))x.remove()});
  var walker=document.createTreeWalker(b,NodeFilter.SHOW_TEXT,null,false),nodes=[],n;
  while((n=walker.nextNode()))nodes.push(n);
  nodes.forEach(function(t){
   if(t.parentElement&&t.parentElement.closest('.mt-buy-cart-icon'))return;
   var original=t.nodeValue||'';
   var cleaned=original.replace(/🛍️?/gu,'').replace(/\uFE0F/g,'');
   if(cleaned!==original)t.nodeValue=cleaned;
  });
  b.querySelectorAll('span,i,strong,em').forEach(function(x){
   if(x.closest('.mt-buy-cart-icon'))return;
   var txt=(x.textContent||'').replace(/\s/g,'');
   if(txt==='🛍' || txt==='🛍️')x.remove();
  });
 });
}
function ensureImage(item){
 var img=item&&item.querySelector('img.product-gallery__image');if(!img)return;
 var ds=img.getAttribute('data-src');
 if((!img.getAttribute('src')||img.getAttribute('src').indexOf('1x1')>-1)&&ds){img.setAttribute('src',ds.replace('{width}','1000'));}
 img.style.setProperty('opacity','1','important');img.style.setProperty('visibility','visible','important');
}
function setup(g){
 if(g.dataset.mtSafeGallery==='1')return;
 var items=[].slice.call(g.querySelectorAll('.product-gallery__carousel-item:not(.is-filtered)'));if(items.length<2)return;
 g.dataset.mtSafeGallery='1';
 items.forEach(ensureImage);
 var index=Math.max(0,items.findIndex(function(x){return x.classList.contains('is-selected')}));
 function select(next){
  index=(next+items.length)%items.length;
  items.forEach(function(x,i){ensureImage(x);x.classList.toggle('is-selected',i===index);x.style.setProperty('display',i===index?'block':'none','important');x.style.setProperty('opacity',i===index?'1':'0','important')});
  var id=items[index].getAttribute('data-media-id');
  var gallery=g.closest('.product-gallery');
  if(gallery)gallery.querySelectorAll('.product-gallery__thumbnail').forEach(function(t){t.classList.toggle('is-nav-selected',t.getAttribute('data-media-id')===id)});
 }
 select(index);
 var wrap=g.closest('.product-gallery__carousel-wrapper');if(!wrap)return;
 wrap.querySelectorAll('.mt-gallery-arrow').forEach(function(x){x.remove()});
 function add(cls,delta,path,label){var b=document.createElement('button');b.type='button';b.className='mt-gallery-arrow '+cls;b.setAttribute('aria-label',label);b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="'+path+'"/></svg>';b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();select(index+delta)});wrap.appendChild(b)}
 add('mt-gallery-arrow--prev',-1,'M15 18l-6-6 6-6','Foto anterior');add('mt-gallery-arrow--next',1,'M9 18l6-6-6-6','Próxima foto');
 var sx=0,sy=0;g.addEventListener('touchstart',function(e){if(!e.changedTouches[0])return;sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY},{passive:true});g.addEventListener('touchend',function(e){if(!e.changedTouches[0])return;var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){select(index+(dx<0?1:-1))}},{passive:true});
 var gallery=g.closest('.product-gallery');if(gallery)gallery.querySelectorAll('.product-gallery__thumbnail').forEach(function(t){t.addEventListener('click',function(e){var id=t.getAttribute('data-media-id'),ix=items.findIndex(function(x){return x.getAttribute('data-media-id')===id});if(ix>-1){e.preventDefault();e.stopPropagation();select(ix)}})});
}
function init(){cleanButton();document.querySelectorAll('body.template-product .product-gallery__carousel').forEach(setup)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
setTimeout(init,350);setTimeout(init,1000);
new MutationObserver(function(){cleanButton()}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();
