(function () {
  'use strict';

  var removableParameters = [
    'cid',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];

  function cleanAddressBar() {
    try {
      var url = new URL(window.location.href);
      var changed = false;

      removableParameters.forEach(function (parameter) {
        if (url.searchParams.has(parameter)) {
          url.searchParams.delete(parameter);
          changed = true;
        }
      });

      if (changed) {
        window.history.replaceState(window.history.state, document.title,
          url.pathname + (url.search ? url.search : '') + url.hash);
      }
    } catch (error) {
      // Browsers sem suporte a URL continuam funcionando normalmente.
    }
  }

  // Dá tempo para as ferramentas de atribuição registrarem os parâmetros e
  // limpa somente o endereço mostrado ao cliente.
  window.addEventListener('load', function () {
    window.setTimeout(cleanAddressBar, 800);
  });
  window.addEventListener('pageshow', function () {
    window.setTimeout(cleanAddressBar, 800);
  });
}());
