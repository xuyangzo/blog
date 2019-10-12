import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueObserveVisibility from 'vue-observe-visibility';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(Vuetify);
  Vue.use(VueObserveVisibility);
  options.vuetify = new Vuetify({});

  // set color to be palevioletred
  Vue.directive('red', {
    bind(el) {
      el.style.color = 'palevioletred';
    }
  });

  // set line through
  Vue.directive('line', {
    bind(el) {
      el.style.textDecoration = 'line-through';
    }
  })
}