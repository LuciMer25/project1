import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
//import VueSession from 'vue-session'
import store from "./store"; //Vuex 저장소 추가
// var sessionOptions = {
//   persist: true
// }
import VueDaumPostcode from 'vue-daum-postcode'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
})


createApp(App)
.use(router)
.use(vuetify)
.use(store)
.use(VueDaumPostcode)
.mount('#app')
// .use(VueSession, sessionOptions)
