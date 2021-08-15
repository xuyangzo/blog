<template>
  <div>
    <br />
    <br />
    <br />
    <div id="disqus_thread"></div>
  </div>
</template>
<script>
import 'disqusjs/dist/disqusjs.css';
import DisqusJS from 'disqusjs';

export default {
  mounted() {
    // var disqus_config = function() {
    //   this.page.url = window.location.origin;
    //   this.page.identifier = window.location.pathname;
    // };
    // (function() {
    //   var d = window.document,
    //     s = d.createElement("script");
    //   s.src = "https://lynchsb.disqus.com/embed.js";
    //   s.setAttribute("data-timestamp", +new Date());
    //   (d.head || d.body).appendChild(s);
    // })();

    var dsqjs = new DisqusJS({
      shortname: 'lynchsb',
      siteName: 'Lynchsb',
      identifier: window.location.pathname,
      url: window.location.origin,
      title: '',
      api: 'https://disqus-proxy.azurewebsites.net/disqus/',
      apikey: 'TJkvQRacFFXj9Zc8TDO03KdDAqKVRHr8Soly42nunvt33o6xBuiOlTXw6bMT6imI',
      admin: 'lynchissb',
      adminLabel: ''
    });
  }
};
</script>