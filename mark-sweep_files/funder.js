(function() {
  function embed () {
    var evt = new Event('codefund');
    var uplift = {};

    function trackUplift() {
      try {
        var url = 'https://codefund.io/impressions/8a49a60c-4ced-4c6b-a9bc-3faad2142b3d/uplift?advertiser_id=697';
        console.log('CodeFund is recording uplift. ' + url);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send();
      } catch (e) {
        console.log('CodeFund was unable to record uplift! ' + e.message);
      }
    };

    function verifyUplift() {
      if (uplift.pixel1 === undefined || uplift.pixel2 === undefined) { return; }
      if (uplift.pixel1 && !uplift.pixel2) { trackUplift(); }
    }

    function detectUplift(count) {
      var url = 'https://cdn2.codefund.app/assets/px.js';
      if (url.length === 0) { return; }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (count === 1) { detectUplift(2); }
            uplift['pixel' + count] = true;
          } else {
            uplift['pixel' + count] = false;
          }
          verifyUplift();
        }
      };
      xhr.open('GET', url + '?ch=' + count + '&rnd=' + Math.random() * 11);
      xhr.send();
    }

    function elementVisible(element) {
      if (!element) { return false; }

      while (element) {
        var style = getComputedStyle(element);
        if (style.visibility === 'hidden' || style.display === 'none') { return false; }
        element = element.parentElement;
      }

      return true;
    }

    function closeCodeFund() {
      var codeFundElement = document.getElementById('codefund') || document.getElementById('codefund_ad');
      codeFundElement.remove();
      sessionStorage.setItem('codefund', 'closed');
    }

    try {
      if (sessionStorage.getItem('codefund') === 'closed') { return; }

      var codeFundElement = document.getElementById('codefund') || document.getElementById('codefund_ad');
      if (!elementVisible(codeFundElement)) {
        console.log('CodeFund element not visible! Please verify an element exists with id="codefund" and that it is visible.');
        return;
      }

      codeFundElement.innerHTML = '<div id="cf"> <div class="cf-wrapper"> <div class="cf-header">Proudly sponsored by</div> <a data-href="campaign_url" class="cf-text" target="_blank" rel="nofollow noopener"> <strong>Flatfile.io </strong> <span>Create a delightful csv import experience without weeks of development.</span> </a> <a href="https://codefund.app" data-target="powered_by_url" class="cf-powered-by" target="_blank" rel="nofollow noopener"> <em>ethical</em> ad by CodeFund <img data-src="impression_url"> </a> </div> </div>';
      codeFundElement.querySelector('img[data-src="impression_url"]').src = 'https://codefund.io/display/8a49a60c-4ced-4c6b-a9bc-3faad2142b3d.gif';
      codeFundElement.querySelectorAll('a[data-href="campaign_url"]').forEach(function (a) { a.href = 'https://codefund.io/impressions/8a49a60c-4ced-4c6b-a9bc-3faad2142b3d/click?campaign_id=403&creative_id=402&property_id=339&template=centered&theme=unstyled'; });

      var poweredByElement = codeFundElement.querySelector('a[data-target="powered_by_url"]');
      if (poweredByElement) { poweredByElement.href = 'https://codefund.io/invite/tNZ9pYRffRU'; }

      var closeElement = codeFundElement.querySelector('button[data-behavior="close"]');
      if (closeElement) { closeElement.addEventListener('click', closeCodeFund); }

      evt.detail = { status: 'ok', house: false };
      detectUplift(1);
    } catch (e) {
      console.log('CodeFund detected an error! Please verify an element exists with id="codefund". ' + e.message);
      evt.detail = { status: 'error', message: e.message };
    }
    document.removeEventListener('DOMContentLoaded', embed);
    window.dispatchEvent(evt);
  };
  (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', embed) : embed();
})();
