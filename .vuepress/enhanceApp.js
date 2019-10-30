import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
import VueObserveVisibility from 'vue-observe-visibility';
import Vuex from 'vuex';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(Vuetify);
  Vue.use(Vuex);
  Vue.use(VueObserveVisibility);

  // scroll
  Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);

  // material icon
  options.vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi'
    },
  });

  // set color to be palevioletred
  Vue.directive('red', {
    bind(el) {
      el.style.color = 'palevioletred';
    }
  });

  // set line through
  Vue.directive('line', {
    bind(el, binding) {
      el.style.textDecoration = 'line-through';
      if (binding.modifiers['red']) {
        el.style.color = 'palevioletred';
      }
    }
  });

  // simple vuex store
  options.store = new Vuex.Store({
    state: {
      isMobile: false
    },
    getters: {
      isMobile(state) {
        return state.isMobile;
      }
    },
    mutations: {
      setMobile(state) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          state.isMobile = true;
        } else state.isMobile = false;
      }
    }
  })
}