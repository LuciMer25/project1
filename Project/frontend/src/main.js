import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store.js'

// Vuetify
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import { aliases, fa } from 'vuetify/iconsets/fa';
// import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
//import VueSession from 'vue-session'
import store from "./store"; //Vuex 저장소 추가
// var sessionOptions = {
//   persist: true
// }
import VueDaumPostcode from 'vue-daum-postcode';
import Pagination from 'vue-pagination-2';


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
});
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "startbootstrap-sb-admin/dist/css/styles.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .use(VueDaumPostcode)
  .use(VueSweetalert2)
  .use(Pagination)
  .mount('#app')
// .use(VueSession, sessionOptions)

window.Kakao.init("d4e1788ee0f9d7816eee9b5f666826e2");
