/* MT Sports - Personalizacao + preco/variante + acabamento dos cards */
(function () {
  'use strict';

  var scriptSrc = (document.currentScript && document.currentScript.src) || '';

  function normalizeText(value) {
    return (value || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }

  function assetUrl(filename) {
    if (!scriptSrc) return '';
    return scriptSrc.replace(/mt-personalizacao-fix\.js(?:\?.*)?$/i, filename);
  }

  function injectVisualFixes() {
    if (document.getElementById('mt-v29-fixes')) return;
    var style = document.createElement('style');
    style.id = 'mt-v29-fixes';
    style.textContent = [
      'body.template-product .product-form__add-button:before, body.template-product .botaoflutuante .button--primary:before{content:""!important;display:inline-block!important;width:20px!important;height:20px!important;margin-right:9px!important;vertical-align:-4px!important;background-repeat:no-repeat!important;background-position:center!important;background-size:20px 20px!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23090a0c\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'9\' cy=\'20\' r=\'1\'/%3E%3Ccircle cx=\'19\' cy=\'20\' r=\'1\'/%3E%3Cpath d=\'M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6\'/%3E%3C/svg%3E")!important}',
      '.product-item__secondary-image{display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}',
      '.product-item__image-wrapper .product-item__primary-image,.product-item__image-wrapper img:first-of-type{display:block!important;opacity:1!important;visibility:visible!important;transform:none!important}',
      '@media screen and (min-width:701px){.mt-retro-feature{aspect-ratio:3/1!important;height:auto!important;min-height:0!important;max-height:none!important}.mt-retro-feature__photo--desktop{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;filter:none!important;transform:none!important}.mt-retro-feature__photo--mobile{display:none!important}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function setRetroDesktopArt() {
    var img = document.querySelector('.mt-retro-feature__photo--desktop');
    var url = assetUrl('mt-boas-lembrancas-desktop-1800x600.jpg');
    if (!img || !url) return;
    img.src = url;
    img.style.setProperty('content', 'normal', 'important');
    img.style.setProperty('object-fit', 'cover', 'important');
    img.style.setProperty('object-position', 'center center', 'important');
    img.style.setProperty('filter', 'none', 'important');
    img.style.setProperty('transform', 'none', 'important');
  }

  function personalizationGroup(root) {
    return Array.from((root || document).querySelectorAll('.product-form__option[data-option-position]')).find(function (group) {
      var label = group.querySelector('.product-form__option-name');
      return normalizeText((label ? label.textContent : '') + ' ' + group.textContent).indexOf('personalizar') !== -1;
    }) || null;
  }

  function isPersonalizeSelected(group) {
    if (!group) return false;
    var selected = group.querySelector('input:checked');
    if (selected) return normalizeText(selected.value).indexOf('personalizar') !== -1;
    var select = group.querySelector('select');
    return !!(select && normalizeText(select.value).indexOf('personalizar') !== -1);
  }

  function setPersonalizationVisible(visible, root) {
    var scope = root || document;
    var box = scope.querySelector('.line-item-property__field') || document.querySelector('.line-item-property__field');
    if (!box) return;
    box.classList.add('mt-personalizacao-box');
    box.classList.toggle('is-visible', !!visible);
    box.setAttribute('aria-hidden', visible ? 'false' : 'true');
    box.querySelectorAll('input, select, textarea').forEach(function (el) { el.disabled = !visible; });
    if (!visible) {
      var nameInput = box.querySelector('[name="properties[Nome]"]');
      var numberInput = box.querySelector('[name="properties[Número]"]');
      if (nameInput) nameInput.value = '';
      if (numberInput) numberInput.value = '';
    }
  }

  function relabel(group) {
    if (!group) return;
    var label = group.querySelector('.product-form__option-name');
    if (label && normalizeText(label.textContent).indexOf('personalizar') === -1) label.textContent = 'Personalizar:';
    group.querySelectorAll('label').forEach(function (labelEl) {
      var input = document.getElementById(labelEl.getAttribute('for'));
      if (!input) return;
      var v = normalizeText(input.value);
      if (v === 'nao') labelEl.textContent = 'Não';
      if (v.indexOf('personalizar') !== -1) labelEl.textContent = 'Personalizar';
    });
  }

  function getProductRoot(node) {
    return (node && node.closest && (node.closest('.product-block-list__item--info') || node.closest('[data-section-type="product"]') || node.closest('.product-form'))) || document;
  }

  function getProductJson(root) {
    var candidates = [];
    if (root && root.querySelectorAll) candidates = Array.from(root.querySelectorAll('script[data-product-json]'));
    if (!candidates.length) candidates = Array.from(document.querySelectorAll('script[data-product-json]'));
    for (var i = 0; i < candidates.length; i++) {
      try {
        var data = JSON.parse(candidates[i].textContent || '{}');
        if (data && data.product && data.product.variants) return data.product;
      } catch (e) {}
    }
    return null;
  }

  function selectedOptions(root) {
    var values = {};
    var groups = Array.from((root || document).querySelectorAll('.product-form__option[data-option-position]'));
    if (!groups.length && root !== document) groups = Array.from(document.querySelectorAll('.product-form__option[data-option-position]'));
    groups.forEach(function (group) {
      var pos = parseInt(group.getAttribute('data-option-position'), 10);
      if (!pos) return;
      var checked = group.querySelector('input:checked');
      var select = group.querySelector('select');
      values[pos] = checked ? checked.value : (select ? select.value : null);
    });
    return values;
  }

  function findVariant(product, options) {
    if (!product || !product.variants) return null;
    return product.variants.find(function (variant) {
      return Object.keys(options).every(function (key) {
        var value = options[key];
        if (value == null || value === '') return true;
        return variant['option' + key] === value;
      });
    }) || null;
  }

  function formatBRL(cents) {
    var value = Number(cents || 0) / 100;
    try { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
    catch (e) { return 'R$ ' + value.toFixed(2).replace('.', ','); }
  }

  function syncVariantAndPrice(origin) {
    var root = getProductRoot(origin);
    var product = getProductJson(root);
    if (!product) return;
    var options = selectedOptions(root);
    var variant = findVariant(product, options);
    if (!variant) return;

    var idControls = Array.from(document.querySelectorAll('select[name="id"], input[name="id"]'));
    idControls.forEach(function (el) {
      if (String(el.value) !== String(variant.id)) el.value = variant.id;
    });

    var priceTargets = document.querySelectorAll('#evolution-price-list .product-price .price-promotional-wrap strong, #evolution-price-list .product-price .price-promotional strong, .product-block-list__item--info .product-price .price-promotional-wrap strong');
    priceTargets.forEach(function (el) { el.textContent = formatBRL(variant.price); });

    var compareTargets = document.querySelectorAll('#evolution-price-list .price--compare, #evolution-price-list .product-price--compare, #evolution-price-list s');
    compareTargets.forEach(function (el) {
      if (variant.compare_at_price && Number(variant.compare_at_price) > Number(variant.price)) {
        el.textContent = formatBRL(variant.compare_at_price);
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    var addButton = document.querySelector('.product-form__add-button');
    if (addButton) {
      addButton.disabled = variant.available === false;
      addButton.setAttribute('data-variant-id', variant.id);
    }

    try { if (typeof window.parcelamento === 'function') window.parcelamento(); } catch (e) {}
  }

  function sync(origin) {
    var root = getProductRoot(origin);
    var group = personalizationGroup(root);
    if (group) {
      relabel(group);
      setPersonalizationVisible(isPersonalizeSelected(group), root);
    } else {
      setPersonalizationVisible(false, root);
    }
    syncVariantAndPrice(origin);
  }

  function runAll(origin) {
    injectVisualFixes();
    setRetroDesktopArt();
    sync(origin || document.body);
  }

  document.addEventListener('change', function (e) {
    if (e.target && e.target.closest && e.target.closest('.product-form__option')) {
      runAll(e.target);
      setTimeout(function () { sync(e.target); }, 60);
      setTimeout(function () { sync(e.target); }, 220);
    }
  });

  document.addEventListener('click', function (e) {
    var label = e.target && e.target.closest ? e.target.closest('.block-swatch__item, .variant-swatch__item, label') : null;
    if (label && label.closest('.product-form__option')) {
      setTimeout(function () { sync(label); }, 0);
      setTimeout(function () { sync(label); }, 80);
      setTimeout(function () { sync(label); }, 240);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    runAll(document.body);
    setTimeout(function () { runAll(document.body); }, 250);
    setTimeout(function () { runAll(document.body); }, 900);
  });

  if (document.readyState !== 'loading') {
    runAll(document.body);
    setTimeout(function () { runAll(document.body); }, 250);
  }
})();