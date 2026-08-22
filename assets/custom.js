function handleScroll() {
    var e = document.getElementsByClassName("support-floating")[0],
        t = document.getElementsByClassName("botaoflutuante")[0], n = document.getElementById("evolution-price-list"),
        o = null;
    t && (o = window.getComputedStyle(t)), e && n && (e.style.bottom = null != o && "block" === o.display ? "65px" : "15px")
}

function increaseValue() {
    var e = parseInt(document.getElementById("number").value, 10);
    e = isNaN(e) ? 0 : e, e++, document.getElementById("number").value = e
}

function decreaseValue() {
    var e = parseInt(document.getElementById("number").value, 10);
    1 !== (e = isNaN(e) ? 0 : e) && e--, document.getElementById("number").value = e
}

function serialize(e) {
    function t(e, n) {
        var o = e.lastIndexOf("[");
        if (-1 === o) {
            var a = {};
            return a[e] = n, a
        }
        var i = e.substr(0, o), r = {};
        return r[e.substring(o + 1, e.length - 1)] = n, t(i, r)
    }

    for (var n = {}, o = 0, a = e.elements.length; o < a; o++) {
        var i = e.elements[o];
        if ("" !== i.name && !i.disabled) if (i.name && !i.disabled && (i.checked || /select|textarea/i.test(i.nodeName) || /hidden|text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color/i.test(i.type))) n = extend(n, t(i.name, i.value))
    }
    return n
}

function extend() {
    for (var e = {}, t = 0, n = function (t) {
        for (var n in t) t.hasOwnProperty(n) && ("[object Object]" === Object.prototype.toString.call(t[n]) ? e[n] = Form.extend(e[n], t[n]) : e[n] = t[n])
    }; t < arguments.length; t++) n(arguments[t]);
    return e
}

window.onload = function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
        handleScroll(), window.onscroll = handleScroll;
        var e = document.getElementsByClassName("support-floating")[0],
            t = document.getElementsByClassName("botaoflutuante")[0], n = null;
        t && (n = window.getComputedStyle(t)), e && null != n && "block" === n.display && (e.style.bottom = "65px")
    }
}, $(".block-swatch__radio, .variant-swatch__radio, .product-form__single-selector").change((function () {
    setTimeout((function () {
        parcelamento()
    }), 150)
})), $(".options:first-child").addClass("active"), $(".options").each((function () {
    $(this).on("click", (function () {
        $(".options").removeClass("active"), $(this).addClass("active"), $("#evolution-price-list .price-promotional-wrap strong").html($(this).find(".valortot").text()), $("#evolution-price-list .price-promotional-wrap span").html($(this).find(".valorcomp").text()), $("#evolution-price-list .price-promotional-wrap .selector-desconto").remove(), $("#evolution-price-list .price-promotional-wrap").append('<p class="selector-desconto">CUPOM ' + $(this).find(".saving").text() + " APLICADO</p>"), parcelamento()
    }))
})), $(".product-form").each((function () {
    $(this).on("click", ".botaocmprar, .botaoaddcarrinho-qtd", (function (e) {
        e.stopImmediatePropagation();
        const t = "botaoaddcarrinho" === $(this).attr("id") || !window.theme.botaoaddcarrinho, n = [],
            o = parseInt($(".options.active .iddavariante").attr("val")),
            a = parseInt($(".options.active .iddavariante").attr("qtd"));
        n.push({id: o, quantity: a}), $(".buy-together-list input").each((function () {
            !0 === $(this).prop("checked") && n.push({id: $(this).attr("data-id"), quantity: 1})
        }));
        let i = {items: n};
        fetch("".concat(window.routes.cartAddUrl, ".js"), {
            body: JSON.stringify(i),
            credentials: "same-origin",
            method: "POST",
            headers: {"Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest"}
        }).then((function (e) {
            if (e.ok) if ("drawer" === window.theme.cartType && t) {
                document.dispatchEvent(new CustomEvent("theme:loading:end"));
                const e = document.querySelector('[data-section-id="product-template"]');
                e && e.dispatchEvent(new CustomEvent("product:added", {
                    bubbles: !0,
                    detail: {variant: n[1], quantity: 1}
                }))
            } else setTimeout((function () {
                window.location.href = "/cart"
            }), 500)
        }))
    }))
}));
const youtubeVideos = [...document.querySelectorAll("[data-youtube]")];
youtubeVideos.forEach((function (e) {
    e.querySelector("[data-youtube-button]").addEventListener("click", (function () {
        const e = event.target.dataset.youtubeButton, t = event.target.parentNode,
            n = '<iframe width="100%" src="' + e + '?autoplay=1&showinfo=0&controls=1&rel=0&modestbranding=1" allow="autoplay;" frameborder="0" allowfullscreen></iframe>';
        t.style.display = "none", t.insertAdjacentHTML("beforebegin", n), t.parentNode.removeChild(t)
    }))
})), $(document).ready((function () {
    (function (e, t) {
        t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
        var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    })("customer_posted") && $(".modal--newsletter").attr("aria-hidden", "false");
    const e = document.getElementById("copiar-cupom");
    e && e.addEventListener("click", (function () {
        var e = document.getElementById("texto-cupom");
        navigator.clipboard && navigator.clipboard.writeText(e.innerText).then((function () {
        })).catch((function (e) {
        }))
    }))
}));
const miniCart = document.querySelector(".mini-cart");
let observer = null;

function handleMutation(e, t) {
    for (const t of e) if ("aria-hidden" === t.attributeName) {
        const e = "true" === t.target.getAttribute("aria-hidden");
        document.documentElement.style.overflow = e ? "auto" : "hidden"
    }
}

function startObserver() {
    if (!miniCart) return;
    (observer = new MutationObserver(handleMutation), observer.observe(miniCart, {
        attributes: !0,
        attributeFilter: ["aria-hidden"]
    }))
}

function stopObserver() {
    observer && (observer.disconnect(), observer = null)
}

window.addEventListener("load", startObserver), window.addEventListener("resize", (function () {
    startObserver()
}));

(function(){
  function moneyBRL(value){
    var n=Number(value||0);
    return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  }
  function escapeHtml(value){
    return String(value||'').replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]});
  }
  function card(product){
    var variant=product.variants&&product.variants[0]?product.variants[0]:{};
    var price=Number(variant.price||0);
    var pix=price*0.95;
    var image=(product.images&&product.images[0]&&product.images[0].src)||'';
    var url='/products/'+product.handle;
    return '<article class="mt-card"><a class="mt-card__image" href="'+url+'">'+(image?'<img src="'+escapeHtml(image)+'" alt="'+escapeHtml(product.title)+'" loading="lazy">':'')+'</a><div class="mt-card__body"><h3><a href="'+url+'">'+escapeHtml(product.title)+'</a></h3><div class="mt-card__price">'+moneyBRL(pix)+' <small>no Pix</small></div><div class="mt-card__installment">ou '+moneyBRL(price)+' nos demais pagamentos</div><div class="mt-card__promo"><span>MT</span><strong>LEVE 3 • PAGUE 2</strong><small>Combine seus produtos</small></div></div></article>';
  }
  function hasHeading(text){
    return Array.prototype.some.call(document.querySelectorAll('.mt-heading h2'),function(h){return h.textContent.trim().toUpperCase()===text.toUpperCase()});
  }
  function makeSection(cfg,products){
    var section=document.createElement('section');
    section.className='mt-section mt-section--dark mt-auto-collection';
    section.setAttribute('data-mt-auto-collection',cfg.handle);
    section.innerHTML='<div class="mt-shell"><div class="mt-heading"><div><span>'+cfg.eyebrow+'</span><h2>'+cfg.title+'</h2></div><a href="/collections/'+cfg.handle+'">VER TODOS</a></div><div class="mt-products">'+products.slice(0,6).map(card).join('')+'</div></div>';
    return section;
  }
  function loadCollection(cfg,anchor,position){
    if(!anchor||hasHeading(cfg.title)||document.querySelector('[data-mt-auto-collection="'+cfg.handle+'"]')) return;
    fetch('/collections/'+cfg.handle+'/products.json?limit=6',{credentials:'same-origin'})
      .then(function(r){if(!r.ok)throw new Error('collection');return r.json();})
      .then(function(data){
        if(!data.products||!data.products.length)return;
        var section=makeSection(cfg,data.products);
        if(position==='before') anchor.parentNode.insertBefore(section,anchor);
        else anchor.parentNode.insertBefore(section,anchor.nextSibling);
      }).catch(function(){});
  }
  function install(){
    var home=document.querySelector('.mt-home');
    if(!home)return;
    if(!document.getElementById('mt-retro-desktop-fix')){
      var style=document.createElement('style');
      style.id='mt-retro-desktop-fix';
      style.textContent='@media (min-width:701px){.mt-retro-feature__photo--desktop{inset:4% 1% auto auto!important;height:92%!important;width:auto!important;max-width:none!important;object-fit:contain!important;object-position:center top!important}}';
      document.head.appendChild(style);
    }
    var nba=document.querySelector('.mt-hero--nba');
    loadCollection({handle:'kits-infantis',eyebrow:'PEQUENOS CRAQUES',title:'KITS INFANTIS'},nba,'before');
    var retro=document.querySelector('.mt-retro-feature');
    loadCollection({handle:'retro-1',eyebrow:'HISTÓRIA EM CAMPO',title:'CAMISAS RETRÔ'},retro,'after');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
